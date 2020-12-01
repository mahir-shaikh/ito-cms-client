import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-itext-count',
	templateUrl: './itc.component.html',
	styleUrls: ['./itc.component.styl']
})
export class InputTextCount implements OnInit, AfterViewInit {
	@Input() rows;
	@Input() maxChar;
	@Input() placeHolder;

	totalChar: number = 0;
	remainingChar: number = 0;
	xtraChar: number = 0;
	@Input() data: any;

	textValue: string = '';
	@ViewChild('textArea', { static: false }) textAreaRef: ElementRef;

	constructor(private elRef: ElementRef) { }

	ngOnInit() {
		this.placeHolder = this.data.alt1;


		if (!this.rows) this.rows = 3;
		if (!this.maxChar) this.maxChar = 250;

		this.remainingChar = this.maxChar;
	}

	ngAfterViewInit() {
		const self = this;
		const editbox = this.textAreaRef.nativeElement//document.getElementById("myEditable");
		editbox.addEventListener('keyup', function (e) {
			self.countChar(e);
		});
		editbox.addEventListener('paste', function (e) {
			e.preventDefault();
			const text = e.clipboardData.getData("text/plain");
			document.execCommand("insertText", false, text);
		});
	}

	countChar(event: any) {
		let myText: string = event.target.value || event.target.innerText;
		// myText = myText.trim();
		this.totalChar = myText.length;
		this.remainingChar = this.maxChar - this.totalChar;
		this.xtraChar = this.remainingChar <= 0 ? (this.totalChar - this.maxChar) : 0;
	}

	xtraCharRed(event: any) {
		let myText: string = event.target.innerText;
		let idx = event.target.innerHTML.indexOf("<span");

		if (event.target.innerText && this.xtraChar > 0) {
			let txt = event.target.innerText;
			const s1 = txt.substring(0, this.maxChar);
			const s2 = txt.substring(this.maxChar);
			const s3 = '<span style="color:#f20033">' + s2 + '</span>';

			event.target.innerHTML = s1 + s3;
		}
	}

}
