import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { debounceTime } from 'rxjs/operators';
import { CommunicatorService } from '../services/communicator.service';
import { StateManagementService } from '../services/state-management.service';

@Component({
  selector: 'app-new-scene',
  templateUrl: './new-scene.component.html',
  styleUrls: ['./new-scene.component.styl']
})
export class NewSceneComponent implements OnInit {
  @Input() data;
  keys;

  newID = '';
  copyId = '';
  @ViewChild('addNewSceneModal', {static: false}) addNewSceneModal: ModalDirective

  constructor(
    private communicator: CommunicatorService,
    private stateManagement: StateManagementService
  ) { }

  ngOnInit() {
    this.processExistingContent();
    this.communicator.getEmitter('DELETE_KEY').pipe(debounceTime(1000)).subscribe((data) => {
      this.keys = Object.keys(this.data)
    })
  }

  ngOnChanges(){
    this.processExistingContent()
  }

  processExistingContent(){
    if(this.data.length){
      this.keys =[]
      this.data.map(obj=>{
        if(obj.ID){
          this.keys.push(obj.ID)
        }
      })
    }
  }

  addNewSceneSetup(){
    // this.stateManagement.setActiveKey(this.keys.length)
    this.addNewSceneModal.show()
  }

  hidePopup(){
    this.newID = '';
    this.copyId = '';
    this.addNewSceneModal.hide();
  }

  addNew(){
    if(this.keys.includes(this.newID) || this.keys.indexOf(this.newID) != -1){
      //error key already exists
      alert("Scene with this ID already exists")
    }else{
      let obj;
      if(this.copyId){
        // Create a copy if selected
        obj = Object.assign({},this.data.filter(obj=>{
          return obj.ID == this.copyId
        })[0]) 

        obj.ID = this.newID;
      }else{

        // Create a blank new if it does not exists
        obj = {
          ID: this.newID
        }
      }
      this.addNewSceneModal.hide()
      this.keys.push(this.newID)
      //Save Data
      this.stateManagement.setActiveKey = this.newID
      this.communicator.trigger('ADD_NEW_SCENE', obj)

      // //Reset Key and value for next new add      
      this.newID = ''
      this.copyId = ''
    }

  }

}
