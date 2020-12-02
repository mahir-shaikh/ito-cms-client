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
    this.scene = this.data
    if (this.data.PageType && this.data.PageType === 'MultiSelectWithReview') {
      this.showReviewBtn = true
      this.data = this.getMultiSelectWithReviewData(this.scene);
      this.statusText = '';
    } else {
      this.data = this.getMultiSelectAccordianData(this.scene);
    }
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

  getMultiSelectAccordianData(data) {
    let localObj = data;
    let keyArr: any[] = Object.keys(localObj);
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base"
    });
    keyArr.sort(collator.compare);

    const items = [];
    const returnObj: any = {};

    let i = 1;
    returnObj.isFeedbackPresent = false;
    keyArr.forEach((key: string) => {
      if (key.indexOf('alt' + i) > -1 && key.length <= 5) {
        let matchStr = localObj[key].indexOf('>');
        let element = localObj[key].slice(0, matchStr + 1);
        let extractStr = localObj[key].slice(matchStr + 1);

        const obj = {
          id: i,
          prefix: (i + 9).toString(36).toUpperCase(),
          name: localObj[key],
          text: element + (i + 9).toString(36).toUpperCase() + '. ' + extractStr,
          description: localObj[key + '_narrative'],
          feedbackText: localObj[key + '_feedback'],
          feedback1: (localObj[key + '_feedback1'] == undefined ? 0 : (localObj[key + '_feedback1'][0] == "+" ? 1 : -1)),
          feedback1Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback1') != -1 ? true : false,
          feedback1Text: localObj[key + '_feedback1'],
          feedback2: (localObj[key + '_feedback2'] == undefined ? 0 : (localObj[key + '_feedback2'][0] == "+" ? 1 : -1)),
          feedback2Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback2') != -1 ? true : false,
          feedback2Text: localObj[key + '_feedback2'],
          feedback3: (localObj[key + '_feedback3'] == undefined ? 0 : (localObj[key + '_feedback3'][0] == "+" ? 1 : -1)),
          feedback3Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback3') != -1 ? true : false,
          feedback3Text: localObj[key + '_feedback3'],
          feedback4: (localObj[key + '_feedback4'] == undefined ? 0 : (localObj[key + '_feedback4'][0] == "+" ? 1 : -1)),
          feedback4Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback4') != -1 ? true : false,
          feedback4Text: localObj[key + '_feedback4'],
          feedback5: (localObj[key + '_feedback5'] == undefined ? 0 : (localObj[key + '_feedback5'][0] == "+" ? 1 : -1)),
          feedback5Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback5') != -1 ? true : false,
          feedback5Text: localObj[key + '_feedback5']
        };
        items.push(obj);
        i++;
      }

      if (key.indexOf('feedback') > -1) {
        returnObj.isFeedbackPresent = true;
      }

      if (key.indexOf('alt') === -1) {
        returnObj[key] = localObj[key];
      }
    });

    returnObj.categories = [{ id: 1, heading: null, items: items }];
    return returnObj;
  }

  getMultiSelectWithReviewData(data) {
    let localObj = data;
    let keyArr: any[] = Object.keys(localObj);
    let collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base"
    });
    keyArr.sort(collator.compare);

    let i = 1, j = 1;
    const categoriesArray = [];
    let categoryItems = [];
    let categoryData: any = {};
    const returnObj: any = {};
    returnObj.isFeedbackPresent = false;

    keyArr.forEach((key: any) => {
      if (key.indexOf("col" + i) !== -1 && key.indexOf("col" + i + "alt") === -1) {
        categoryData = {};
        categoryData.id = i;
        categoryData.heading = localObj[key];
        categoryItems = [];
        j = 1;
        keyArr.forEach((key2: string) => {
          if (key2.indexOf('col' + i + 'alt' + j) > -1) {
            const obj = {
              id: i + '' + j,
              index: j,
              prefix: (j + 9).toString(36).toUpperCase(),
              name: localObj[key2],
              description: localObj[key2 + '_narrative'],
              feedbackText: localObj[key + '_feedback'],
              feedback1: (localObj[key2 + '_feedback1'] == undefined ? 0 : (localObj[key2 + '_feedback1'][0] == "+" ? 1 : -1)),
              feedback1Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback1') != -1 ? true : false,
              feedback1Text: localObj[key2 + '_feedback1'],
              feedback2: (localObj[key2 + '_feedback2'] == undefined ? 0 : (localObj[key2 + '_feedback2'][0] == "+" ? 1 : -1)),
              feedback2Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback2') != -1 ? true : false,
              feedback2Text: localObj[key2 + '_feedback2'],
              feedback3: (localObj[key2 + '_feedback3'] == undefined ? 0 : (localObj[key2 + '_feedback3'][0] == "+" ? 1 : -1)),
              feedback3Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback3') != -1 ? true : false,
              feedback3Text: localObj[key2 + '_feedback3'],
              feedback4: (localObj[key2 + '_feedback4'] == undefined ? 0 : (localObj[key2 + '_feedback4'][0] == "+" ? 1 : -1)),
              feedback4Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback4') != -1 ? true : false,
              feedback4Text: localObj[key2 + '_feedback4'],
              feedback5: (localObj[key2 + '_feedback5'] == undefined ? 0 : (localObj[key2 + '_feedback5'][0] == "+" ? 1 : -1)),
              feedback5Reversed: localObj['reversed'] == undefined ? false : localObj['reversed'].indexOf('feedback5') != -1 ? true : false,
              feedback5Text: localObj[key2 + '_feedback5']
            }
            categoryItems.push(obj);
            j++;
          }
        });
        categoryData.items = categoryItems;
        categoriesArray.push(categoryData);
        i++;
      }

      if (key.indexOf('feedback') > -1) {
        returnObj.isFeedbackPresent = true;
      }

      if (key.indexOf('col') === -1) {
        returnObj[key] = localObj[key];
      }
    });
    returnObj['categories'] = categoriesArray;
    return returnObj;
  }
}
