import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {


  modalOpen: boolean;

  constructor() {
    this.modalOpen = false;
  }


  openModal() {
    this.modalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeModal () {
    this.modalOpen = false;
  }




  ngOnInit() {
  }

}
