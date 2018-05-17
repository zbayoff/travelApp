import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Trip, Cost } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-add-form',
  templateUrl: './trip-add-form.component.html',
  styleUrls: ['./trip-add-form.component.scss']
})
export class TripAddFormComponent implements OnInit {

  tripAddForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {
    this.createForm();
  }

  createForm() {
    this.tripAddForm =  this.fb.group({
      destination: '',
      startdate: '',
      leavedate: '',
      costs: this.fb.array([])
    });
  }

  addCostField() {

  }

  onSubmit() {
    console.log('form submitted');
  }

  ngOnInit() {
  }

}
