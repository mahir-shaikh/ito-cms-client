import { Component, Input, OnInit, ViewChild, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare const $: any;

@Component({
  selector: 'app-multiselect-accordion',
  templateUrl: './multiselect-accordion.component.html',
  styleUrls: ['./multiselect-accordion.component.styl']
})
export class MultiselectAccordionComponent implements OnInit {

  @Input() data: any;
  @Input() justShowSelection = false;
  @Input() isSummary = false
  @ViewChild('reviewModal', { static: true }) public reviewModalRef: ModalDirective;
  selected: Array<any> = [];
  isSubmitDisabled: boolean = true;
  isSelectionDisabled: boolean = false;
  showFeedback: boolean = false;
  showReviewBtn: boolean = false;
  statusText: string = '';
  assistiveText: string = '';
  triggerFeedback;
  isClassChanged = false;
  pinEpisodeIndex;
  scene;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
  ) { }

  ngOnInit() {
    this.forceResize();
  }

  forceResize() {
    setTimeout(() => {
      if (typeof (Event) === 'function') {
        window.dispatchEvent(new Event('resize'));
        // this.renderer.
      }
    }, 5000);
  }

  ngAfterViewInit() {
    if (!this.isClassChanged) {
      let element = this.element.nativeElement.querySelectorAll('.metricComeIn');
      let timer = 2500;
      let count = element.length;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          this.renderer.addClass(element[i], 'transeffect');
          this.renderer.removeClass(element[i], 'metricComeIn');
        }, timer);
        timer += 200;
      }
    }
  }

  ngOnChanges() {
    if (this.isClassChanged) {
      let element = this.element.nativeElement.querySelectorAll('.metricComeIn');
      let timer = 2500;
      let count = element.length;
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          this.renderer.addClass(element[i], 'transeffect');
          this.renderer.removeClass(element[i], 'metricComeIn');
        }, timer);
        timer += 200;
      }
    }
  }

  checkboxClicked(outerIndex: number, innnerIndex: number, event?: KeyboardEvent) {
    if (event) {
      if (!(event.keyCode === 13 || event.keyCode === 32)) {
        return;
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    this.data.categories[outerIndex].items[innnerIndex].isChecked = !this.data.categories[outerIndex].items[innnerIndex].isChecked;
    this.data.categories[outerIndex].items[innnerIndex].isOpen = this.data.categories[outerIndex].items[innnerIndex].isChecked;

    if (this.data.categories[outerIndex].items[innnerIndex].isChecked) {
      if (this.selected.length < Number(this.data.maximum)) {
        const objToPush = _.cloneDeep(this.data.categories[outerIndex].items[innnerIndex]);
        objToPush.categoryId = this.data.categories[outerIndex].id;
        this.selected.push(objToPush);
      }
      this.assistiveText = '';
      if (this.data.categories[outerIndex].items[innnerIndex].description) {
        this.assistiveText = `${this.data.categories[outerIndex].items[innnerIndex].description}. `;
      }
      this.assistiveText += `${this.data.categories[outerIndex].items[innnerIndex].name} selected.`;
    } else {
      _.remove(this.selected, { id: this.data.categories[outerIndex].items[innnerIndex].id });
      this.assistiveText = `${this.data.categories[outerIndex].items[innnerIndex].name} unselected.`;
    }

    if (this.selected.length === Number(this.data.maximum)) {
      this.isSelectionDisabled = true;
    } else {
      this.isSelectionDisabled = false;
    }

    if (this.selected.length < Number(this.data.minimum)) {
      this.isSubmitDisabled = true;
    } else {
      this.isSubmitDisabled = false;
    }

    if (this.selected.length === 0 && this.reviewModalRef.isShown) {
      this.closeReview();
    }

  }

  toggleAccordian(outerIndex: number, innnerIndex: number, event?: KeyboardEvent) {

    if (event) {
      if (!(event.keyCode === 13 || event.keyCode === 32)) {
        return;
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    this.data.categories[outerIndex].items[innnerIndex].isOpen = !this.data.categories[outerIndex].items[innnerIndex].isOpen;

  }

  openReview() {
    this.reviewModalRef.show();
  }

  closeReview() {
    this.reviewModalRef.hide();
  }

  toggleReview(index: number, event?: KeyboardEvent) {
    if (event && event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      this.selected[index].isReviewOpen = !this.selected[index].isReviewOpen
    }
  }

  removeSelection(index: number) {
    const categoryIndex = _.findIndex(this.data.categories, { id: this.selected[index].categoryId });
    const foundIndex = _.findIndex(this.data.categories[categoryIndex].items, { id: this.selected[index].id });

    this.checkboxClicked(categoryIndex, foundIndex);

    setTimeout(() => {
      const selectedItems = document.querySelectorAll('.selection-item_group');
      if (selectedItems && selectedItems.length > 0) {
        $(selectedItems[0]).focus();
      }
    }, 10);
  }

  focusGained(item: any) {
    if (!item.isChecked) {
      this.assistiveText = `Multi selection list: Press space or enter key to select ${item.name}.`;
    } else {
      this.assistiveText = `Press space or enter key to unselect ${item.name}.`;
    }
  }

  focusGainedIcon(item: any) {
    if (!item.isOpen) {
      this.assistiveText = `Press space or enter to expand ${item.name}`;
    } else {
      this.assistiveText = `Press space or enter to collapse ${item.name}`;
    }
  }
}
