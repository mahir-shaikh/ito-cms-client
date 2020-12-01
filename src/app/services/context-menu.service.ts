import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  public show: Subject<{ event: MouseEvent, key: string }> = new Subject<{ event: MouseEvent, key: string }>();

  constructor() { }

}
