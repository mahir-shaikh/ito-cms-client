import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CommunicatorService } from '../services/communicator.service';
import { StateManagementService } from '../services/state-management.service';

declare var $ : any

import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/word_paste.min.js";

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
        zIndex: 9990,
        toolbarSticky: true,
        toolbarButtons: {
            'moreText': {
              'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
              'buttons': [ 'insertTable', 'insertHR']
            },
            'moreMisc': {
              'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
              'align': 'right',
              'buttonsVisible': 2
            }
        },
        pluginsEnabled: [
          "align", "charCounter", "codeBeautifier", "codeView", "draggable", "file",   "fontSize", 
          "fullscreen", "inlineClass", "lineBreaker", "lists", 
          "paragraphStyle", "quote", "table", "url", "wordPaste", 
          "paragraphFormat"
        ],
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
    if(key && jsonObj){
      this.content = jsonObj[key]
    }else{
      this.onCancel()
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
    // this.stateManagement.setEditableJson = this.content
    this.communicator.trigger('EDITOR_SAVED', this.content)
    this.onCancel();
  }

  onCancel(){
    this.router.navigate([{ outlets: { editor: null } } ])
  }

}
