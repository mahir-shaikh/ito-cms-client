import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-column-multi-select',
  templateUrl: './column-multi-select.component.html',
  styleUrls: ['./column-multi-select.component.styl']
}) 
export class ColumnMultiSelectComponent implements OnInit {
  @Input() data: any;
  narrative: any;
  selected: Array<any> = [];
  isSubmitDisabled: boolean = true;
  isSelectionDisabled = false;
  showFeedback: boolean = false;
  assistiveText: string = '';
  checkConditionInEachList = false;
  selectionDisabledArray = [];
  selections = [];

  constructor() { }

  ngOnInit() {

    if(this.data){
      this.checkConditionInEachList = this.data.checkConditionInEachList || false;
    }

    if(this.checkConditionInEachList){
      this.selectionDisabledArray = [];
      this.selections = [];
      for(let i=0; i<this.data.columns.length; i++){
        this.selectionDisabledArray.push(false);
        this.selections.push(new Array());
      }
    }
  }

  makeSelection(outerIndex: number, innerIndex: number, event: KeyboardEvent) {
    if (event) {
      if (!(event.keyCode === 13 || event.keyCode === 32)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
    }
    this.data.columns[outerIndex].items[innerIndex].isChecked = !this.data.columns[outerIndex].items[innerIndex].isChecked;

    if (this.data.columns[outerIndex].items[innerIndex].isChecked) {
      if(this.checkConditionInEachList){
        if (this.selections[outerIndex].length < Number(this.data.maximum)) {
          this.selected.push(this.data.columns[outerIndex].items[innerIndex]);
          this.selections[outerIndex].push(this.data.columns[outerIndex].items[innerIndex]);
        }
      }else{
        if (this.selected.length < Number(this.data.maximum)) {
          this.selected.push(this.data.columns[outerIndex].items[innerIndex]);
        }
      }
      this.assistiveText = `${this.data.columns[outerIndex].items[innerIndex].text} selected.`;
    } else {
      if(this.checkConditionInEachList){
        _.remove(this.selections[outerIndex], { id: this.data.columns[outerIndex].items[innerIndex].id });
      }
      _.remove(this.selected, { id: this.data.columns[outerIndex].items[innerIndex].id });
      this.assistiveText = `${this.data.columns[outerIndex].items[innerIndex].text} unselected.`;
    }

    if(this.checkConditionInEachList){
      for(let i=0; i< this.selectionDisabledArray.length; i++){
        if (this.selections[i].length === Number(this.data.maximum)) {
          this.selectionDisabledArray[i] = true;
        } else {
          this.selectionDisabledArray[i] = false;
        }
      }

      if(this.selectionDisabledArray.indexOf(false) == -1){
        this.isSubmitDisabled = false;
      }else{
        this.isSubmitDisabled = true;
      }

    }else{
      if (this.selected.length === Number(this.data.maximum)) {
        this.isSelectionDisabled = true;
      } else {
        this.isSelectionDisabled = false;
      }
  
      if (this.selected.length < Number(this.data.minimum)) {
        this.isSubmitDisabled = true;
      } else {
        this.isSubmitDisabled = false;
      }
    }
  }

  showFeedbackPage() {
    this.showFeedback = true;
  }

  focusGained(item: any) {
    // if (!item.isChecked) {
    //   this.assistiveText = `Multi selection list: Press space or enter key to select ${item.text}.`;
    // } else {
    //   this.assistiveText = `Press space or enter key to unselect ${item.text}.`;
    // }
  }

  processHeaderData(headerDataString: string, index){
    let key = headerDataString.split(',')[0];
    let sceneId = headerDataString.split(',')[1];

    if(key == undefined || sceneId == undefined){
      return null;
    }
    if(index == 1){
      return key.trim();
    }else if(index == 2){
      return sceneId.trim();
    }else{
      return '';
    }
  }

}
