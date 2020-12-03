import { Component, OnInit, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';
import { StateManagementService } from 'src/app/services/state-management.service';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.styl'],
  // directives: [ContentEditableDirective]
})
export class NotesComponent implements OnInit {
  notesVisible = false;
  @Input() notes: Array<any> = [];

  constructor(
    private stateManagement: StateManagementService,
    private communicator: CommunicatorService
  ) { }

  ngOnInit() {
    if(this.notes == undefined){
      this.notes = []
    }
  }
  
  toggleNotes(event){
    this.notesVisible = !this.notesVisible
  }
  
  onFocusOut(){
    this.stateManagement.setActiveKey = "notes";
    this.communicator.trigger('EDITOR_SAVED', this.notes)
  }

  addNote(){
    this.notes.push({
      title: 'Title',
      text: 'Text'
    })
  }

  removeNote(i){
    let confirmRespone = confirm('Are you sure?')
    if(confirmRespone){
      this.notes.splice(i, 1)
    }
  }

}
