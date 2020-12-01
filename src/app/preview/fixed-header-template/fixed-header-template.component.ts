import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fixed-header-template',
  templateUrl: './fixed-header-template.component.html',
  styleUrls: ['./fixed-header-template.component.styl']
})
export class FixedHeaderTemplateComponent implements OnInit {
  @Input() header: any;

  constructor() { }

  ngOnInit() {
  }

}
