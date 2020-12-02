import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  getSingleJsonFile(fileName) {
    return this.http.get(environment.hostName + "/getJson?fileName=" + fileName).pipe(map((res) => res)).toPromise();
  }

  setSingleJsonFile(data, fileName) {
    return this.http.post(environment.hostName + '/postJson', {
      data: { scenes: data },
      fileName: fileName
    }).pipe(map((res) => res)).toPromise();
  }

  downloadFile(fileName) {
    return this.http.get(environment.hostName + "/downloadJson?fileName=" + fileName).pipe(map((res) => res)).toPromise().then((file) => {
      var str = JSON.stringify(file);
      var data = this.encode(str);

      var blob = new Blob([data], {
        type: 'application/octet-stream'
      });

      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.dispatchEvent(event);
    });
  }

  encode( s ) {
    var out = [];
    for ( var i = 0; i < s.length; i++ ) {
      out[i] = s.charCodeAt(i);
    }
    return new Uint8Array( out );
  }
}
