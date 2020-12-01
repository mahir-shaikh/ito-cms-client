import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
	selector: 'app-matrix',
	templateUrl: './matrix.component.html',
	styleUrls: ['./matrix.component.styl']
})
export class MatrixComponent implements OnInit {

	@Input() data: any;
	assistiveText: string = '';

	constructor() { }

	ngOnInit() {
		
	}

	makeSelection(index: number, selectionIndex: number, event?: KeyboardEvent) {
		
		if (event) {
			if (!(event.keyCode === 13 || event.keyCode === 32)) {
				return;
			}
			event.preventDefault();
		}
		this.data.items[index].selectionIndex = selectionIndex;
		this.checkAllHasValues();
		this.assistiveText = `Selected ${this.data.items[index].text} as an answer for ${this.data['option' + selectionIndex]}`;
	}

	checkAllHasValues() {
		let checkedCount = 0;
		_.each(this.data.items, (n) => {
			if (n.selectionIndex !== null && n.selectionIndex !== undefined && n.selectionIndex !== 0) {
				checkedCount++;
			}
		});

	}

	focusGained(item: any, index: boolean) {
		this.assistiveText = `Select this if you think the answer to ${this.data['option' + index]} is ${item.text}`;
	}
}