import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  activeKey
  get getActiveKey(){
    return this.activeKey;
  }
  set setActiveKey(val){
    this.activeKey = val
  }

  public show: Subject<{ event: MouseEvent, key: string }> = new Subject<{ event: MouseEvent, key: string }>();

  constructor() { }

}
