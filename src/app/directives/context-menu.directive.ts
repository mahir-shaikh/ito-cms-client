import { Directive, Input } from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';
import { Subject } from 'rxjs';

@Directive({
  selector: '[context-menu]',
  host:{'(contextmenu)':'rightClicked($event)'}
})
export class ContextMenuDirective {
  @Input('context-menu') key = ''

  constructor(private _contextMenuService:ContextMenuService){
  }
  rightClicked(event:MouseEvent){
    this._contextMenuService.setActiveKey = this.key
    this._contextMenuService.show.next({event:event, key: 'Edit '+ this.key});

    event.preventDefault(); // to prevent the browser contextmenu
  }

}
