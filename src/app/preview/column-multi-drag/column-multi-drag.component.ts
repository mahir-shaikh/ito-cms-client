import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DragdropComponent } from '../dragdrop/dragdrop.component';

@Component({
  selector: 'app-column-multi-drag',
  templateUrl: './column-multi-drag.component.html',
  styleUrls: ['./column-multi-drag.component.styl']
})
export class ColumnMultiDragComponent implements OnInit {
  @Input() data: any;
  @ViewChildren('dragdrop') DRAG_DROP_REF: QueryList<DragdropComponent>;

  constructor() { }

  ngOnInit() {
    
  }

}
