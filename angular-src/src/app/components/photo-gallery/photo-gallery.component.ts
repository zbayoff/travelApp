import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PhotosService } from '../../service/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  // chosenPhoto: any;
  modalOpen: boolean;
  photos: any;

  @Input() searchTerm: '';
  @Input() chosenPhoto: {};
  @Output() imgChange = new EventEmitter<any>();

  constructor(private photosService: PhotosService) {
    this.modalOpen = false;
  }

  isEmptyObject(obj) {
    // console.log(obj);
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  searchPhotos(searchTerm) {
    this.photosService.searchPhotos(searchTerm)
      .subscribe(
        data => {
          // console.log(data);

          // if returns a results array
          this.photos = data.results;

          // set first image as the selected image
          this.selectImage(this.photos[0]);
          console.log(this.photos);
        },
        err => console.log(err)
      );
  }

  selectImage(photo) {
    this.chosenPhoto = photo;
  }

  presaveImage() {
    this.imgChange.emit(this.chosenPhoto);
    this.closeModal();
  }

  removePresavedImg() {
    // console.log(this.chosenPhoto);
    this.chosenPhoto = {};
    this.imgChange.emit(this.chosenPhoto);
    this.rebuildGallery();
  }

  rebuildGallery () {
    this.photos = null;
    this.searchTerm = '';
  }

  onScroll(event) {
    // console.log(event);
    // event.preventDefault();
  }

  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.modalOpen = false;
  }

  ngOnInit() {
    this.chosenPhoto = {};
    // console.log('chosen img is: ');
    // console.log(this.chosenPhoto);
  }

}
