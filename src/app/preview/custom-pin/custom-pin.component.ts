import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { StateManagementService } from 'src/app/services/state-management.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-custom-pin',
  templateUrl: './custom-pin.component.html',
  styleUrls: ['./custom-pin.component.styl']
})
export class CustomPinComponent implements OnInit {
  @Input() data;
  keys;

  newKey = '';
  newValue = '';
  @ViewChild('addNewKeyModal', {static: false}) addNewKeyModal: ModalDirective

  constructor(
    private communicator: CommunicatorService,
    private stateManagement: StateManagementService
  ) { }

  ngOnInit() {
    this.keys = Object.keys(this.data)

    this.communicator.getEmitter('DELETE_KEY').pipe(debounceTime(1000)).subscribe((data) => {
      this.keys = Object.keys(this.data)
    })
  }

  addNew(){
    if(this.data[this.newKey]){
      //error key already exists
      alert("Key already exists")
    }else{
      this.data[this.newKey] = this.newValue;
      this.addNewKeyModal.hide()
      this.keys = Object.keys(this.data)
      //Save Data
      this.stateManagement.setActiveKey = this.newKey
      this.communicator.trigger('EDITOR_SAVED', this.newValue)

      //Reset Key and value for next new add      
      this.newKey = ''
      this.newValue = ''
    }

  }

}
