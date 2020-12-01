import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CommunicatorService } from '../services/communicator.service';
import { StateManagementService } from '../services/state-management.service';

declare var $ : any

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.styl']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() options?: any;
  @ViewChild('staticModal', {static: false}) staticModalRef: ModalDirective;

  private _content: any;
  get content(): any {
    return this._content;
  }

  @Input() set content(value: any) {
    this._content = value;
    // this.contentChange.emit(value);
  }

  @Output() contentChange = new EventEmitter<any>();

  constructor(
    private router: Router,
    private communicator: CommunicatorService,
    private stateManagement: StateManagementService
  ) {}

  ngOnInit() {
    if (!this.options) {
      this.options = {
        toolbarSticky: true,
        toolbarButtons: ['bold', 'italic', 'underline','insertTable', 'fontSize', 'textColor', 'undo', 'redo', 'align'],
        events: {
          // 'initialized': (editor: any) => {
          //   if ($('#froala-toolbar').children().length > 1) {
          //     $('#froala-toolbar')
          //       .children()[1]
          //       .remove();
          //   }
          // },
        }
      };
    }

    var key = this.stateManagement.getActiveKey;
    var jsonObj = this.stateManagement.getEditableJson;
    this.content = jsonObj[key]

  }
  
  ngOnDestroy(){
    this.staticModalRef.hide()
  }
  
  ngAfterViewInit(){
    this.staticModalRef.show()
  }

  initialize(event) {
    event.initialize();
  }

  onSave(){
    this.stateManagement.setEditableJson = this.content
    this.communicator.trigger('EDITOR_SAVED', this.content)
    this.onCancel();
  }

  onCancel(){
    this.router.navigate([{ outlets: { editor: null } } ])
  }

}
