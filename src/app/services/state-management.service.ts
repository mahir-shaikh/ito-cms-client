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
    localStorage.setItem('Active Key', JSON.stringify(this.activeKey))
  }


  private editableJson;
  get getEditableJson() {
    return this.editableJson;
  }
  set setEditableJson(val) {
    this.editableJson = val;
    localStorage.setItem('Editable Json', JSON.stringify(this.editableJson))
  }

  constructor() { }

}
