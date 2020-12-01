import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  activeKey
  get getActiveKey() {
    return this.activeKey;
  }
  set setActiveKey(val) {
    this.activeKey = val
  }


  editableJson;
  get getEditableJson() {
    return this.editableJson;
  }
  set setEditableJson(val) {
    this.editableJson = val;
  }

  constructor() { }

}
