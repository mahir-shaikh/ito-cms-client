import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer){}

  transform(value: any, args?: any): any {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

}
