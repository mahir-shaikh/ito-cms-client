import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.styl']
})
export class UploadComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  files;
  fileInputLabel;
  existingFileData

  constructor(
    private uploadService: UploadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchExistingFiles()
  }

  fetchExistingFiles(){
    this.uploadService.getAllJsonFiles().then((data: any) => {
      this.existingFileData = data
    }).catch((err)=>{
      console.log(err)
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.files = files;

      this.fileInputLabel = Array.from(files).reduce((total, currentValue, currentIndex, arr) => {
        return total ? total + ', ' + currentValue['name'] : currentValue['name']
      }, '');
    }
  }

  onSubmit() {
    const formData = new FormData();
    for (let img of this.files) {
      formData.append('files', img);
    }

    this.uploadService.uploadJson(formData).then((response: any) => {
      if (response.success) {
        console.info(response.message)
        this.files = undefined
        this.fileInputLabel = ''
      }
    }).catch((err) => {
      if (err.message) {
        console.error(err.message)
      } else {
        console.error(err)
      }
    })
  }

  selectFile(file){
    this.router.navigate(['author', file])
  }
}
