import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Trip, Cost } from '../../models/trip';
import { TripService } from '../../service/trip.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trip-edit-form',
  templateUrl: './trip-edit-form.component.html',
  styleUrls: ['./trip-edit-form.component.scss']
})
export class TripEditFormComponent implements OnInit, OnChanges {

  @Input() trip: Trip;
  @Input() costs: Cost;
  tripEditForm: FormGroup;

  @Output() tripSaveSubmit = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {

  }

  createForm() {
    this.tripEditForm = this.fb.group({
      destination: ['', Validators.required],
      startdate: '',
      leavedate: '',
      image: '',
      costs: this.fb.array([]),
    });
  }

  get costsFormArray(): FormArray {
    return this.tripEditForm.get('costs') as FormArray;
  }

  addCost() {
    this.costsFormArray.push(this.fb.group(new Cost()));
  }

  removeCost(costID) {
    this.costsFormArray.removeAt(costID);
  }

  convertDates(date) {
    return date.substring(0, 10);
  }

  rebuildForm() {

    this.tripEditForm.reset({
      destination: this.trip.destination,
      startdate: this.convertDates(this.trip.startdate),
      leavedate: this.convertDates(this.trip.leavedate),
      image: this.trip.image
    });

    this.setCosts(this.trip.costs);
  }

  setCosts(costs: Cost[]) {
    const costFormGroup = costs.map((cost) => {
      return this.fb.group(cost);
    });
    const costsFormArray = this.fb.array(costFormGroup);
    this.tripEditForm.setControl('costs', costsFormArray);
  }

  saveTrip() {

    this.trip = this.prepareSaveTrip();

    this.tripService.putTrip(this.trip).subscribe(
      data => {
        this.tripSaveSubmit.emit(this.trip);
      },
      err => console.log(err)
    );
    this.rebuildForm();
  }

  prepareSaveTrip() {
    const formModel = this.tripEditForm.value;
    const costsDeepCopy: Cost[] = formModel.costs.map((cost: Cost) => {
      return Object.assign({}, cost);
    });

    const saveTrip: Trip = {
      _id: this.trip._id,
      destination: formModel.destination,
      startdate: formModel.startdate,
      leavedate: formModel.leavedate,
      image: formModel.image,
      totalCost: formModel.totalCost,
      costs: costsDeepCopy
    };
    return saveTrip;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.createForm();
    this.addCost();
    this.rebuildForm();
  }


}
