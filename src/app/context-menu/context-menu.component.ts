import { Component, OnInit } from '@angular/core';
import { ContextMenuService } from '../services/context-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.styl'],
  host:{
    '(document:click)':'clickedOutside()'
  },
})
export class ContextMenuComponent implements OnInit {
  link = '';
  isShown = false;
  private mouseLocation :{left:number,top:number} = {left:0,top:0};

  constructor(private _contextMenuService:ContextMenuService, private router: Router){
    _contextMenuService.show.subscribe(e => this.showMenu(e.event,e.key));
  }
  // the css for the container div
  get locationCss(){
    return {
      'position':'fixed',
      'display':this.isShown ? 'block':'none',
      left:this.mouseLocation.left + 'px',
      top:this.mouseLocation.top + 'px',
    };
  }

  ngOnInit(){}

  clickedOutside(){
    this.isShown= false; // hide the menu
  }

  // show the menu and set the location of the mouse
  showMenu(event,link){
    this.isShown = true;
    this.link = link;
    this.mouseLocation = {
      left:event.clientX,
      top:event.clientY
    }
  }

  routeTo(){
    this.router.navigate([{ outlets: { editor: 'editor' } } ])
  }
}