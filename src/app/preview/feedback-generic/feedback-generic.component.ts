import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-feedback-generic',
  templateUrl: './feedback-generic.component.html',
  styleUrls: ['./feedback-generic.component.styl']
})
export class FeedbackGenericComponent implements OnInit {
  @Input() scene: any;

  constructor( private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const rows = this.el.nativeElement.querySelectorAll('.matchquiztable tbody tr');
    if (rows) {
      rows.forEach((row) => {
        const cells = row.getElementsByTagName('td');
        if (cells.length) {
          const sample = cells[1].innerText;
          const answer = cells[2].innerText;
          const div = document.createElement('div');
          let text = '<div class="main-div-one"><div class="ms-Icon--CheckMark ms-fontSize-14 ms-fontWeight-bold"></div><div>' + cells[1].innerHTML + '</div></div>';
          let parent = cells[2].firstChild;
          let parentOne = cells[1];
          let outerDiv = cells[2].firstChild.firstChild.parentNode;
          let innerDiv = cells[2].firstChild.firstChild;
          this.renderer.addClass(parent, 'main-div');
          this.renderer.setProperty(parentOne, 'innerHTML', text);

          if (sample === answer) {
            this.renderer.insertBefore(outerDiv, div, innerDiv);
            this.renderer.addClass(div, 'ms-Icon--CheckMark');
            this.renderer.addClass(div, 'ms-fontSize-14');
            this.renderer.addClass(div, 'ms-fontWeight-bold');
          } else {
            this.renderer.insertBefore(outerDiv, div, innerDiv);
            this.renderer.addClass(div, 'ms-Icon--CalculatorMultiply');
            this.renderer.addClass(div, 'ms-fontSize-14');
            this.renderer.addClass(div, 'ms-fontWeight-bold');
          }

        }
      });
    }
  }
}
