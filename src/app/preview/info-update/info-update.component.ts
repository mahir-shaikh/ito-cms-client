import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-update',
  templateUrl: './info-update.component.html',
  styleUrls: ['./info-update.component.styl']
})
export class InfoUpdateComponent implements OnInit {

  @Input() data: any;
  tableData;

  constructor() { }

  ngOnInit() {
    // this.tableData = this.textEngineService.getTableData(this.pinID);
  }

}
