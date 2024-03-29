import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthorService } from '../services/author.service';
import { CommunicatorService } from '../services/communicator.service';
import { StateManagementService } from '../services/state-management.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.styl']
})
export class AuthorComponent implements OnInit {
  private routeObserver: Subscription;
  fileName;
  serverJSON;
  localJSON;
  activeIndex: number = -1;
  editableJsonString: any;
  editableJson: Object;
  invalidJson: boolean = false;

  ToggleViewText = "Show Raw Editor";
  showRaw = false;

  viewType: ViewType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private communicator: CommunicatorService,
    private stateManagement: StateManagementService
  ) { }

  ngOnInit() {
    this.routeObserver = this.route.params.subscribe(data => {
      this.fileName = data.fileName;
      this.onRouteChange()
    })
    
    
    this.communicator.getEmitter('ADD_NEW_SCENE').subscribe((data)=>{
      this.localJSON.push(data)
      let activeID = data.ID;
      // sort
      this.localJSON.sort((a,b) => {
        if(a.ID != undefined && b.ID != undefined){
          return a.ID.localeCompare(b.ID)
        }else{
          return 1;
        }
      }
      
       )
      //set back active index
      let activeIndex = this.localJSON.findIndex(x => x.ID == activeID );
      this.setActiveIndex(activeIndex)
      this.saveData()
    })

    this.communicator.getEmitter('EDITOR_SAVED').subscribe((data) => {
      var key = this.stateManagement.getActiveKey;
      this.editableJson[key] = data;
      this.saveData();
    })

    this.communicator.getEmitter('DELETE_KEY').subscribe((data) => {
      var key = this.stateManagement.getActiveKey;
      delete this.editableJson[key];
      this.saveData();
    })

    this.communicator.getEmitter('DELETE_SCENE').subscribe((data) => {
      var index = this.activeIndex;
      if(data){
        index = data;
      }
      let newArr = this.copyArray(this.localJSON)
      newArr.splice(index, 1)
      this.localJSON = this.copyArray(newArr) // since array is passed as reference, it does not trigger ngOnChanges. Hence additional steps
      this.syncData()
      this.activeIndex = -1;
    })
  }

  onRouteChange() {
    if (this.fileName) {
      this.authorService.getSingleJsonFile(this.fileName).then((jsondata: any) => {
        this.serverJSON = jsondata.scenes;
        this.localJSON = this.copyArray(this.serverJSON)
      })
    }
  }

  setActiveIndex(index) {
    this.activeIndex = index;
    let newArr = this.copyArray(this.localJSON)
    this.editableJsonString = JSON.stringify(newArr[this.activeIndex], null, "\t");
    this.editableJson = newArr[this.activeIndex];
    this.stateManagement.setEditableJson = this.editableJson;

    this.showRaw = false;
    this.viewType = "Component"
    this.ToggleViewText = "Show Raw Editor"
  }

  saveData() {
    try {
      this.localJSON[this.activeIndex] = this.editableJson;
      this.syncData()

      // Updated the json string as well
      let newArr = this.copyArray(this.localJSON)
      this.editableJsonString = JSON.stringify(newArr[this.activeIndex], null, "\t");

      // Update reference of array to trigger ngOnChanges
      this.editableJson = newArr[this.activeIndex]
    }
    catch (e) {
    };
  }

  saveRawData() {
    try {
      let obj = JSON.parse(this.editableJsonString);
      this.localJSON[this.activeIndex] = obj;
      // this.localJSON[this.activeIndex] = this.editableJson;
      this.invalidJson = false;
      this.activeIndex = -1;


      // localStorage.setItem('sampleJson', JSON.stringify(this.sampleJson));
    }
    catch (e) {
      this.invalidJson = true;
      console.log('error occored while you were typing the JSON');
    };
  }

  syncData() {
    this.authorService.setSingleJsonFile(this.localJSON, this.fileName).then((response: any) => {
      if (response.success) {
        console.log(response.message)
        this.serverJSON = this.copyArray(this.localJSON)//this.localJSON.slice(); // add slice to create a copy instead of copying as a reference
      }
    }).catch((err) => {
      console.error(err)
    })
  }

  changesDetected() {
    return JSON.stringify(this.serverJSON) != JSON.stringify(this.localJSON);
  }

  copyArray(oldArray) {
    var newArray = []; // create empty array to hold copy

    for (var i = 0, len = oldArray.length; i < len; i++) {
      newArray[i] = {}; // empty object to hold properties added below
      for (var prop in oldArray[i]) {
        newArray[i][prop] = oldArray[i][prop]; // copy properties from oldArray to newArray
      }
    }

    return newArray;
  }

  downloadJson() {
    this.authorService.downloadFile(this.fileName)
  }


  toggleView(type) {
    // this.showRaw = !this.showRaw;
    // this.ToggleViewText = this.showRaw ? "Hide Raw Editor" : "Show Raw Editor";
    switch (type) {
      case 1:
        this.viewType = "Component";
        break;
      case 2:
        this.viewType = "Custom";
        break;
      case 3:
        this.viewType = "Raw";
        break;
    }
  }

  addNew() {

  }

  deleteScene(index){
    let confirmResponse = confirm("Are you sure you want to delete this scene? You cannot undo this decision.")

    if(confirmResponse){
      this.communicator.trigger('DELETE_SCENE', index)
    }
  }
}

type ViewType = 'Component' | 'Custom' | 'Raw'