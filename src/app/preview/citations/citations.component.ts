import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.styl']
})
export class CitationsComponent implements OnInit {
  @Input() scene: any;

  constructor() { }

  ngOnInit() {
  }

}
