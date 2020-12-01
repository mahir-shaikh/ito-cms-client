import { Directive, Input } from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';
import { Subject } from 'rxjs';
import { StateManagementService } from '../services/state-management.service';

@Directive({
  selector: '[context-menu]',
  host:{'(contextmenu)':'rightClicked($event)'}
})
export class ContextMenuDirective {
  @Input('context-menu') key = ''

  constructor(private _contextMenuService:ContextMenuService, private stateManagement: StateManagementService){
  }
  rightClicked(event:MouseEvent){
    this.stateManagement.setActiveKey = this.key
    this._contextMenuService.show.next({event:event, key: 'Edit '+ this.key});

    event.preventDefault(); // to prevent the browser contextmenu
  }

}
