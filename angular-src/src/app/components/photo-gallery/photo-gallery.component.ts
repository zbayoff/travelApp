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

  @Input() chosenPhoto: any;
  @Output() imgChange = new EventEmitter<any>();

  constructor(private photosService: PhotosService) {
    this.modalOpen = false;
  }

  searchPhotos(searchTerm) {
    this.photosService.searchPhotos(searchTerm)
      .subscribe(
        data => {
          console.log(data);

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
  }

}
