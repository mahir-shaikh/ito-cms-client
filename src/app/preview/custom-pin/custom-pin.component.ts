import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-pin',
  templateUrl: './custom-pin.component.html',
  styleUrls: ['./custom-pin.component.styl']
})
export class CustomPinComponent implements OnInit {
  @Input() data;
  keys;

  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.data)
  }

}
