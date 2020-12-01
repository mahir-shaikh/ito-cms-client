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
  editableJsonString:any;
  editableJson: Object;
  invalidJson: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private communicator: CommunicatorService,
    private stateManagement: StateManagementService
  ) { }

  ngOnInit() {
    this.routeObserver = this.route.params.subscribe(data=>{
      this.fileName = data.fileName;
      this.onRouteChange()
    }) 

    this.communicator.getEmitter('EDITOR_SAVED').subscribe((data)=>{
      var key= this.stateManagement.getActiveKey;
      this.editableJson[key] = data;
      this.saveData();
    })
  }

  onRouteChange(){
    if(this.fileName){
      this.authorService.getSingleJsonFile(this.fileName).then((jsondata: any)=>{
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
  }

  saveData() {
    try {
      this.localJSON[this.activeIndex] = this.editableJson;
      this.syncData()
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

}
