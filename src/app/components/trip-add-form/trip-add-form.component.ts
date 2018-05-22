import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trip, Cost } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-add-form',
  templateUrl: './trip-add-form.component.html',
  styleUrls: ['./trip-add-form.component.scss']
})
export class TripAddFormComponent implements OnInit, OnChanges {

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
