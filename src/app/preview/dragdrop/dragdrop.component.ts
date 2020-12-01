import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
declare const $: any;

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.styl']
})
export class DragdropComponent implements OnInit {
  @Input() pinIndex: number = 0;
  @Input() goals: Array<any> = [];
  @Input() matchList: Array<any> = [];
  @Input() showSubmit: boolean = true;

  @Input() data: any;
  assertiveText: string = '';
  originalIndex: number;
  @Input() noteText: string = 'To change the order of the items, select an item to highlight it, then drag the item higher or lower in the list.<br>Note: To change the order with your keyboard, select the option you would like to change with the space bar or enter key, and use the arrow keys to change its order.';

  constructor() { }

  ngOnInit() {
    if (this.goals.length === 0) {
      this.data = this.getRankingData(this.data);
      this.goals = this.data.items;
      this.matchList = this.data.matchData;
    }
  }

  handleKeyboardEvent(event: KeyboardEvent, index: number) {
    const goals = document.querySelectorAll(`li.goal-${this.pinIndex}`);
    const totalGoals = goals.length - 1;
    switch (event.keyCode) {
      case 40: // down arrow
        let goalIndexUp: number;
        if (index === totalGoals) {
          goalIndexUp = 0;
        } else {
          goalIndexUp = (index + 1);
        }
        if (!this.isAnyGoalSelected()) {
          $(goals[goalIndexUp])[0].focus();
          // this.setTabIndex(goalIndexUp);
        } else {
          this.moveGoal(index, goalIndexUp);
        }
        // event.preventDefault();
        // event.stopPropagation();
        break;
      case 38: // up arrow
        let goalIndexDown: number;
        if (index === 0) {
          goalIndexDown = totalGoals;
        } else {
          goalIndexDown = (index - 1);
        }
        if (!this.isAnyGoalSelected()) {
          $(goals[goalIndexDown])[0].focus();
          // this.setTabIndex(goalIndexDown);
        } else {
          this.moveGoal(index, goalIndexDown);
        }
        // event.preventDefault();
        // event.stopPropagation();
        break;
      case 32: // space
      case 13: // enter
        event.preventDefault();
        event.stopPropagation();
        const isAnySelected = this.isAnyGoalSelected();
        _.each(this.goals, (n) => {
          n.isSelected = false;
        });
        if (!isAnySelected) {
          this.goals[index].isSelected = true;
          this.originalIndex = index;
          this.assertiveText = `${this.goals[index].text}, grabbed. Current position in list ${index + 1} of ${this.goals.length}. Press up and down arrow keys to change position, Spacebar or enter to drop, Escape key to cancel.`;
        } else {
          this.assertiveText = `${this.goals[index].text}, dropped. Final position in list ${index + 1} of ${this.goals.length}`;
        }
        break;
      case 27: // escape key
        this.escapeFunction(index);
        break;
      case 9: // tab key
        this.escapeFunction(index);
        break;
    }
  }

  escapeFunction(index) {
    const isAnySelectedEsc = this.isAnyGoalSelected();
    if (isAnySelectedEsc) {
      _.each(this.goals, (n) => {
        n.isSelected = false;
      });
      this.assertiveText = `${this.goals[index].text} reorder cancelled.`;
      moveItemInArray(this.goals, index, this.originalIndex);
    }
  }

  setTabIndex(index: number) {
    _.each(this.goals, (n) => {
      n.tabindex = -1;
    });
    this.goals[index].tabindex = 0;
  }

  isAnyGoalSelected(): boolean {
    let isSelected = false;
    _.each(this.goals, (n) => {
      if (n.isSelected) {
        isSelected = true;
      }
    });
    return isSelected;
  }

  moveGoal(oldIndex: number, newIndex: number) {
    moveItemInArray(this.goals, oldIndex, newIndex);
    setTimeout(() => {
      const goals = document.querySelectorAll(`li.goal-${this.pinIndex}`);
      $(goals[newIndex])[0].focus();
    }, 10);
    this.assertiveText = `${this.goals[newIndex].text}. Current position in list ${newIndex + 1} of ${this.goals.length}`;
  };

  drop(event: CdkDragDrop<any[]>) {
    this.moveGoal(event.previousIndex, event.currentIndex);
  }

  focusGained(goal: any, index: number) {
    if (!goal.isSelected) {
      this.assertiveText = `Listbox. ${index + 1} of ${this.goals.length}. ${goal.text}. Press up and down arrow keys to change position, Spacebar or enter to reorder.`;
    }
  }
  
  getRankingData(data){

  }
}
