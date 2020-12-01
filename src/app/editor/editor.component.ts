import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.contentChange.emit(this.content)
  }

  onCancel(){
    this.router.navigate([{ outlets: { editor: null } } ])
  }

}
