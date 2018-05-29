import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      transition('show => hide', animate('500ms ease-in')),
      transition('hide => show', animate('500ms ease-out')),
    ])
  ]
})
export class TripAddFormComponent implements OnInit, OnChanges {

  @Input() trip: Trip;
  @Input() trips: Trip[];
  @Input() costs: Cost;
  tripAddForm: FormGroup;
  formState: string;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {
    this.formState = 'hide';
  }

  toggleAddTripForm() {
    this.formState = this.formState === 'hide' ? 'show' : 'hide';
    setTimeout(() => {
      window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
    }, 300);
  }

  createForm() {
    this.tripAddForm = this.fb.group({
      destination: ['', Validators.required],
      startdate: ['', Validators.required],
      leavedate: ['', Validators.required],
      image: '',
      costs: this.fb.array([]),
    });
  }

  get costsFormArray(): FormArray {
    return this.tripAddForm.get('costs') as FormArray;
  }

  addCost() {
    this.costsFormArray.push(this.fb.group(new Cost()));
  }

  addCosts() {
    for (const trip of this.trips) {
      let totalCost = 0;
      for (const cost of trip.costs) {
        // console.log(cost.costAmt);
        totalCost += cost.costAmt;
      }
      trip.totalCost = totalCost;
    }
  }

  removeCost(costID) {
    this.costsFormArray.removeAt(costID);
  }

  onSubmit() {
    // console.log('form submitted');
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
    this.tripAddForm.reset();
    for (let i = 1; i < this.costsFormArray.length; i += 1) {
      this.costsFormArray.removeAt(i);
    }
  }

  ngOnInit() {
    this.createForm();
    this.addCost();
    this.rebuildForm();
  }

  ngOnChanges() {

  }

}
