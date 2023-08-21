/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/Model/Photo';
import { property } from 'src/app/Model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-PhotoEditor',
  templateUrl: './PhotoEditor.component.html',
  styleUrls: ['./PhotoEditor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() property : property ;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  maxAllowedFileSize=1*1024*1024;

  response: string;

  constructor(private housingService: HousingService, private alertify: AlertifyService) {

  }

  public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
  }

  initializeFileUploader() {
      this.uploader = new FileUploader({
          url: this.baseUrl +'/property/add/photo/'+ String(this.property.id),
          authToken: 'Bearer '+ localStorage.getItem('token'),
          isHTML5: true,
          allowedFileType: ['image'],
          removeAfterUpload: true,
          autoUpload: true,
          maxFileSize:this.maxAllowedFileSize
      });

      this.uploader.onAfterAddingFile = (file) => {
          file.withCredentials = false;
      };

      this.uploader.onSuccessItem = (item, response, status, headers) => {
          if (response) {
              const photo = JSON.parse(response);
              this.property.photos.push(photo);
          }
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
          let errorMessage = 'Some unknown error occured';
          if (status===401) {
              errorMessage ='Your session has expired, login again';
          }

          if (response) {
              errorMessage = response;
          }

          this.alertify.error(errorMessage);
      };
  }

  mainPhotoChanged(url: string){
      this.mainPhotoChangedEvent.emit(url);
  }

  ngOnInit(): void {
      this.initializeFileUploader();
  }

  setPrimaryPhoto(propertyId: number, photo: Photo) {
      this.housingService.setPrimaryPhoto(propertyId,photo.publicId).subscribe(()=>{
          this.mainPhotoChanged(photo.imageUrl);
          this.property.photos.forEach(p => {
              if (p.isPrimary) {p.isPrimary = false;}
              if (p.publicId === photo.publicId) {p.isPrimary = true;}
          });
      });
  }

  deletePhoto(propertyId: number, photo: Photo) {
      this.housingService.deletePhoto(propertyId,photo.publicId).subscribe(()=>{
          this.property.photos = this.property.photos.filter(p =>
              p.publicId !== photo.publicId);
      });
  }


}
