import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MaterialModule } from '../../material.module';

import { Trip, Cost, Image } from '../../models/trip';
import { TripService } from '../../service/trip.service';
import { PhotosService } from '../../service/photos.service';

import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-trip-add-form',
  templateUrl: './trip-add-form.component.html',
  styleUrls: ['./trip-add-form.component.scss'],
  animations: [
    trigger('slideShowHide', [
      state('hide', style({
        'display': 'none',
        'height': '0',
        'opacity': 0,
        'overflow': 'hidden'
      })),
      state('show', style({
        'display': 'block',
        'height': '*',
        'opacity': 1,
        'overflow': 'hidden'
      })),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class TripAddFormComponent implements OnInit, OnChanges {

  @Input() trip: Trip;
  @Input() trips: Trip[];
  @Input() costs: Cost;
  @Input() image: Image;
  tripAddForm: FormGroup;
  formState = 'hide';
  photo: any;
  modalOpen: boolean;
  @ViewChild(FormGroupDirective) addForm;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private photosService: PhotosService
  ) {
    smoothscroll.polyfill();
  }

  offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  toggleAddTripForm() {
    const documentOffset = this.offset(document.querySelector('.addTrip-header'));
    const top = documentOffset.top;
    const topScrollPos = window.scrollY;
    this.formState = this.formState === 'hide' ? 'show' : 'hide';
    if (this.formState === 'show') {
      setTimeout(() => {
        window.scroll({ top: top, left: 0, behavior: 'smooth' });
      }, 700);
    } else {
      setTimeout(() => {
        window.scroll({ top: 5000, left: 0, behavior: 'smooth' });
      }, 300);
    }
  }

  createForm() {
    this.tripAddForm = this.fb.group({
      destination: ['', Validators.required],
      startdate: ['', Validators.required],
      leavedate: ['', Validators.required],
      image: this.fb.group({
        url: [''],
        user: [''],
        userUrl: ['']
      }),
      costs: this.fb.array([])
    });
  }

  get costsFormArray(): FormArray {
    return this.tripAddForm.get('costs') as FormArray;
  }

  addCost() {
    this.costsFormArray.push(this.fb.group({
      costLabel: ['', Validators.required],
      costAmt: [0, Validators.required]
    }));
  }

  addCosts() {
    for (const trip of this.trips) {
      let totalCost = 0;
      for (const cost of trip.costs) {
        totalCost += cost.costAmt;
      }
      trip.totalCost = totalCost;
    }
  }

  removeCost(costID) {
    this.costsFormArray.removeAt(costID);
  }

  displayImg(photo) {
    if (Object.keys(photo).length === 0 && photo.constructor === Object) {
      this.tripAddForm.patchValue({
        image: {
          url: '',
          user: '',
          userUrl: ''
        }
      });
    } else {
      this.photo = photo;
      this.tripAddForm.patchValue({
        image: {
          url: photo.urls.regular,
          user: photo.user.name,
          userUrl: photo.user.links.html
        }
      });
    }
  }

  removePresavedImg() {
    this.photo = {};
    this.tripAddForm.patchValue({
      image: {
        url: '',
        user: '',
        userUrl: ''
      }
    });
  }

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  onSubmit() {
    if (this.tripAddForm.value.image.url !== '') {
      this.photosService.triggerDownload(this.photo.links.download_location).subscribe(
        res => { }
      );
    }

    this.tripService.addTrip(this.tripAddForm.value).subscribe(
      res => {
        this.trips.push(res.json());
        this.addCosts();
        this.rebuildForm();
        this.formState = 'hide';
      },
      err => console.log(err)
    );
  }

  rebuildForm() {
    this.addForm.resetForm();
    for (let i = 0; i < this.costsFormArray.length; i += 1) {
      this.costsFormArray.removeAt(i);
    }
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  ngOnInit() {
    this.createForm();
    this.modalOpen = false;
    this.photo = {};
  }

  ngOnChanges() {

  }

}
