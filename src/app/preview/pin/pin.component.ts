import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'pin',
    templateUrl: './pin.html',
    styleUrls: ['./pin.styl']
})

export class PinComponent implements OnInit, OnDestroy, OnChanges {
    @Input() sceneData: any;
    pinType;
    loading = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.pinType = this.sceneData.PageType;
    }

    ngOnDestroy() {
    }

    ngOnChanges(simpleChanges: SimpleChanges){
        if(simpleChanges && simpleChanges.sceneData){
            this.pinType = this.sceneData.PageType;
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.cdr.detectChanges()
            });
        }
    }
}