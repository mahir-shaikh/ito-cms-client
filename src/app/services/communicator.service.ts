import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Collections from 'typescript-collections';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  private emitters: Collections.Dictionary<string, Subject<any>> = new Collections.Dictionary<string, Subject<any>>();


  constructor() { }

  getEmitter(emitterKey: string): Subject<any> {
    if (!this.emitterExists(emitterKey)) {
      this.createEmitter(emitterKey);
    }
    return this.emitters.getValue(emitterKey);
  }

  trigger(emitterKey: string, data?: any): void {
    // consider if we want to create an emitter and emit if its not created already
    // emit data/event if emitter exists
    if (this.emitterExists(emitterKey)) {
      this.emitters.getValue(emitterKey).next(data);
    }
  }

  createEmitter(emitterKey: string): void {
    if (this.emitterExists(emitterKey)) {
      return;
    }
    this.emitters.setValue(emitterKey, new Subject<any>());
  }

  emitterExists(emitterKey: string): Boolean {
    return this.emitters.containsKey(emitterKey);
  }

}
