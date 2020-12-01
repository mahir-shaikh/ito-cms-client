import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-select-radio',
  templateUrl: './single-select-radio.component.html',
  styleUrls: ['./single-select-radio.component.styl']
})
export class SingleSelectRadioComponent implements OnInit {

  @Input() data: any;
  assistiveText: string = '';
  isSubmitDisabled = true;
  checkedIndex = 0;
  isViewed: boolean = false;

  constructor() { }

  ngOnInit() {
      this.data = this.getSingleSelectRadioData(this.data);
  }

  selectOption(index: number, event?: KeyboardEvent) {
    if (event) {
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        return;
      }
    }

    for (let i = 0; i < this.data.items.length; i++) {
      if (i === index) {
        this.data.items[i].isChecked = true;
        this.isSubmitDisabled = false;
      } else {
        this.data.items[i].isChecked = false;
      }
    }

    if (this.data.items[index].isChecked) {
      this.assistiveText = `${this.data.items[index].text} ` + 'selected';
      this.checkedIndex = this.data.items[index].id;
    } else {
      this.assistiveText = `${this.data.items[index].text} ` + 'unselected';
    }
  }

  focusGained(item: any) {
    if (!item.isChecked) {
      const notCheckedText = 'Single select: Press space or enter key to select';
      this.assistiveText = notCheckedText + ` ${item.text}`;
    } else {
      const checkedText ='Press space or enter key to unselect';
      this.assistiveText = checkedText + ` ${item.text}.`;
    }
  }
  
  getSingleSelectRadioData(data) {
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
    keyArr.forEach((key: string) => {
        let matchStr = localObj[key].indexOf('>');
        if (key.indexOf('alt' + i) > -1) {
            let element = localObj[key].slice(0, matchStr + 1);
            let extractStr = localObj[key].slice(matchStr + 1);
            const obj = {
                id: i,
                text: element + (i + 9).toString(36).toUpperCase() + '. ' + extractStr
            };
            items.push(obj);
            i++;
        } else {
            returnObj[key] = localObj[key];
        }
    });

    returnObj.items = items;
    return returnObj;
}

}