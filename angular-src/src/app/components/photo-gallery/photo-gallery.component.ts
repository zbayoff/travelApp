import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PhotosService } from '../../service/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  // chosenPhoto: any;
  // modalOpen: boolean;
  photos = [];
  photosExist: boolean;
  page = 0;

  @Input() searchTerm: '';
  @Input() chosenPhoto: {};
  @Input() modalOpen: boolean;

  @Output() modalOpenChange = new EventEmitter<any>();
  @Output() imgChange = new EventEmitter<any>();

  constructor(private photosService: PhotosService) {
    // this.modalOpen = false;
  }

  isEmptyObject(obj) {
    // console.log(obj);
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  searchPhotos(searchTerm) {


    // console.log(searchTerm);
    this.page += 1;

    this.photosService.searchPhotos(searchTerm, this.page)
      .subscribe(
        data => {
          console.log(data);

          this.photos = [];

          if (data.results.length === 0) {
            this.photos = [];
            this.photosExist = false;
          }

          // if (data.results.length === 0 && this.searchTerm !== '' ) {
          //   this.photosExist = false;
          // }


          console.log(this.photosExist);

          // if returns a results array
          for (const img of Object.values(data.results)) {
            this.photos.push(img);
          }
          // this.photos = [...data.results];
          console.log(this.photos);

          // if (this.photos.length === 0) {
          //   console.log('empty array of photos');
          //   this.photosExist = false;
          // }


          // set first image as the selected image
          this.selectImage(this.photos[0]);
          // console.log(this.photos);


          // this.photosExist = this.ifPhotosFound();
          // console.log(this.photosExist);

        },
        err => {
          console.log(err);
        }
      );
  }

  // ifPhotosFound() {
  //   if (this.photos.length === 0 && this.searchTerm !== '') {
  //     return true;
  //   }
  // }

  selectImage(photo) {
    this.chosenPhoto = photo;
  }

  presaveImage() {
    this.imgChange.emit(this.chosenPhoto);
    this.closeModal();
  }

  // removePresavedImg() {
  //   // console.log(this.chosenPhoto);
  //   this.chosenPhoto = {};
  //   this.imgChange.emit(this.chosenPhoto);
  //   this.rebuildGallery();
  // }

  rebuildGallery() {
    this.photos = null;
    this.searchTerm = '';
  }

  addMoreImages() {
    console.log('added images');
    this.searchPhotos(this.searchTerm);
  }

  // openModal() {
  //   this.modalOpen = true;
  //   document.body.classList.add('modal-open');
  // }

  closeModal() {
    this.modalOpen = false;
    this.modalOpenChange.emit(this.modalOpen);
    // document.body.classList.remove('modal-open');
  }

  ngOnInit() {
    this.chosenPhoto = {};
    this.photos = [];
    this.searchTerm = '';
    // console.log('chosen img is: ');
    // console.log(this.chosenPhoto);
  }

}
