import { Component, OnInit } from '@angular/core';

import { PhotosService } from '../../service/photos.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  selectedImage: string;
  modalOpen: boolean;
  photos: any;

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
          this.selectImage(this.photos[0].urls.regular);

          console.log(this.photos);
        },
        err => console.log(err)
      );
  }

  selectImage(imgUrl) {
    this.selectedImage = imgUrl;
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
