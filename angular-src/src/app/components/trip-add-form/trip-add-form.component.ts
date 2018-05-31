import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { MaterialModule } from '../../material.module';

import { Trip, Cost } from '../../models/trip';
import { TripService } from '../../service/trip.service';

import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();


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
  tripAddForm: FormGroup;
  formState: string;
  @ViewChild(FormGroupDirective) addForm;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {
    this.formState = 'hide';
  }

  offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  toggleAddTripForm() {
    // const viewportOffset = document.querySelector('.addTrip-header').getBoundingClientRect();
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
      image: '',
      costs: this.fb.array([])
    });
    // console.log(this.tripAddForm);
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

  onSubmit() {

    // console.log(this.tripAddForm.value);
    this.tripService.addTrip(this.tripAddForm.value).subscribe(
      res => {
        this.trips.push(res.json());
        this.addCosts();
        this.rebuildForm();
      },
      err => console.log(err)
    );

  }

  rebuildForm() {

    this.addForm.resetForm();

    for (let i = 0; i < this.costsFormArray.length; i += 1) {
      this.costsFormArray.removeAt(i);
    }
    console.log(this.tripAddForm);
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {


  }



}
