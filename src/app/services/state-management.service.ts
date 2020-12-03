import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  private activeKey
  get getActiveKey() {
    return this.activeKey;
  }
  set setActiveKey(val) {
    this.activeKey = val
  }


  private editableJson;
  get getEditableJson() {
    return this.editableJson;
  }
  set setEditableJson(val) {
    this.editableJson = val;
  }

  constructor() { }

}
