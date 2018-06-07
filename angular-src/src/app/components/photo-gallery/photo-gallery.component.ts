import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PhotosService } from '../../service/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  photos = [];
  photosExist: boolean;
  page = 0;
  searchEvent: any;
  loading = false;
  query = '';
  errorMessage = '';

  @Input() searchTerm: '';
  @Input() chosenPhoto: {};
  @Input() modalOpen: boolean;

  @Output() modalOpenChange = new EventEmitter<any>();
  @Output() imgChange = new EventEmitter<any>();

  constructor(private photosService: PhotosService) { }

  submitQuery(query) {
    this.photosService.searchPhotos(query, 0);
  }

  searchPhotos() {
    this.errorMessage = '';
    this.searchEvent = this.photosService.getSearchEvent()
      .subscribe(value => {
        if (value.hasOwnProperty('loading') && (value.page === 0)) {
          this.photos = [];
          this.page = 0;
          this.loading = true;
        } else if (value.hasOwnProperty('errorMessage')) {
          this.errorMessage = value.errorMessage;
        } else if (value.hasOwnProperty('results')) {
          if (value.results.length === 0) {
            this.loading = false;
            this.errorMessage = 'No images found. Try another keyword.';
          } else {
            this.errorMessage = '';
            for (const img of Object.values(value.results)) {
              this.photos.push(img);
            }
            this.selectImage(this.photos[0]);
            this.page += 1;
            this.loading = false;
          }
        }
      }, err => {
        console.log('err is ' + err);
      });
  }

  selectImage(photo) {
    this.chosenPhoto = photo;
  }

  presaveImage() {
    this.imgChange.emit(this.chosenPhoto);
    this.closeModal();
  }

  addMoreImages() {
    this.photosService.searchPhotos(this.query, this.page);
  }

  closeModal() {
    this.modalOpen = false;
    this.modalOpenChange.emit(this.modalOpen);
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  ngOnInit() {
    this.chosenPhoto = {};
    this.searchPhotos();

  }

}
