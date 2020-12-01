import { Component, Input, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
    selector: 'reviewpage',
    templateUrl: './review.html',
    styleUrls: ['./review.styl'],
    exportAs: 'review'
})

export class ReviewPageComponent implements OnInit, AfterViewInit {
    @Input() data = '';
    @Input() isSummary = false;

    localScene;
    localChoices;
    answer: number = -1;
    selectedValue: number;
    showReview: boolean = false;
    hasGenericFeedback = false;
    hasIndividualFeedback = false;
    hasCitations = false;
    hasBranching = false;
    pinType: number = 0;

    constructor(
    private elRef: ElementRef) { }

    ngOnInit() {
            this.localScene = this.data;
            let PageType = this.localScene.PageType;

            switch(PageType) {
                case 'ReadUpdate':
                    this.pinType = 1 // as per pin/dashboard component
                break;

                case 'SingleSelect':
                    this.pinType = 4 // as per pin/dashboard component
                    this.localChoices = this.getSingleSelectRadioData(this.data['ID'])['items'];
                    this.hasIndividualFeedback = (/_feedback/g).test(Object.keys(this.localScene).join(';'));
                    this.hasGenericFeedback = this.localScene['fb_generic'] != null || this.localScene['fb_generic'] != undefined ;
                    this.hasBranching = this.localScene['branching'] === "0";
                    this.hasCitations = this.localScene['fb_citations'] != null || this.localScene['fb_citations'] != undefined;

                    this.selectedValue = "A".charCodeAt(0) - 64;
                    this.answer = this.selectedValue;
                break;

                case 'Ranking':
                    this.pinType = 2 // as per pin/dashboard component
                break;

                case "MultiSelect":
                case "MultiSelectWithReview":
                    this.pinType = 5; // as per pin/dashboard component
                    break;

                case "RankingColumns":
                    this.pinType = 6; // as per pin/dashboard component
                break;

                case "TwoOptionCenter":
                    this.pinType = 7; // as per pin/dashboard component
                break;

                case "OrgChart":
                    this.pinType = 9; // as per pin/dashboard component
                break;

                case "FreeText":
                    this.pinType = 10; // as per pin/dashboard component
                    break;

                case "MultiSelectColumns":
                    this.pinType = 3; // as per pin/dashboard component
                    break;

                case "Matrix":
                    this.pinType = 11; // as per pin/dashboard component
                    break;
                case "RankingMultiColumns":
                    this.pinType = 12; // as per pin/dashboard component
                    break;
                case "Matching":
                    this.pinType = 13; // as per pin/dashboard component
                    break;
            }
    }

    handleKeyboardEvent(event: KeyboardEvent, index: number) {
        // if (event.keyCode === 13 || event.keyCode === 32) {
        //     this.answer = (index + 1) as any;
        // }
        if(event.keyCode === 39 || event.keyCode === 40){
            if(this.answer < this.localChoices.length){
                this.answer++;
                this.setFocus('ReviewTab'+this.answer);
            }else{
                this.answer = 1;
                this.setFocus('ReviewTab'+this.answer);
            }
        }

        if(event.keyCode === 37 || event.keyCode === 38){
            if(this.answer == 1){
                this.answer = this.localChoices.length;
                this.setFocus('ReviewTab'+this.answer);
            }else{
                --this.answer;
                this.setFocus('ReviewTab'+this.answer);
            }
        }

    }

    setFocus(val) {
        if (val && val != '') {
            const element = document.getElementById(val);
            if (element) {
                setTimeout(() => {
                    element.focus();
                }, 1000);
            }
        }
    }

    toggleReview(){
        this.showReview = this.showReview ? false : true;
        if(!this.showReview){
            this.answer = this.selectedValue;
        }
    }

    getChar(index){
        return String.fromCharCode(64 + index);
    }

    ngAfterViewInit(){
        try{
            this.elRef.nativeElement.offsetParent.scrollTop = this.elRef.nativeElement.offsetTop;
        }catch(e){}
    }

    getSingleSelectRadioData(data){

    }
}
