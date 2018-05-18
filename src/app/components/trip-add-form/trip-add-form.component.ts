import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trip, Cost } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-add-form',
  templateUrl: './trip-add-form.component.html',
  styleUrls: ['./trip-add-form.component.scss']
})
export class TripAddFormComponent implements OnInit {

  @Input() trip: Trip;
  @Input() trips: Trip[];
  @Input() costs: Cost;
  tripAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {

  }

  createForm() {
    this.tripAddForm = this.fb.group({
      destination: ['', Validators.required],
      startdate: '',
      leavedate: '',
      costs: this.fb.array([]),
    });
  }

  get costsFormArray(): FormArray {
    // console.log(this.tripAddForm.get('costs') as FormArray);
    return this.tripAddForm.get('costs') as FormArray;
  }

  addCost() {
    this.costsFormArray.push(this.fb.group(new Cost()));
  }

  // createCosts(): FormGroup {
  //   return this.fb.group({
  //     costLabel: '',
  //     costAmt: ''
  //   });
  // }

  // async onSubmit() {
  //   console.log('form submitted');
  //   // console.log(this.tripAddForm.value);
  //   const response = await this.tripService.addTrip(this.tripAddForm.value);
  //   console.log(response);

  // }

  // async onSubmit() {
  //   console.log('form submitted');
  //   // console.log(this.tripAddForm.value);
  //   const response = await this.tripService.addTrip(this.tripAddForm.value);
  //   this.trips = response.json();
  // }

  // async addTrip(form: NgForm) {
  //   // console.log(form.value);

  //   const response = await this.tripService.addTrip(this.tripAddForm.value);
  //   // const responseGet = await this.tripService.getTrips();
  //   this.trips = responseGet.json();
  // }


  ngOnInit() {

    // this.rebuildForm();
    // this.initCosts();
    this.createForm();
    this.addCost();

  }



}
