import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Trip } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  trip: Trip;
  orginData: any;
  formEnabled: boolean;

  back() {
    window.history.back();
  }

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location
  ) {

  }

  toggleForm() {
    this.formEnabled = !this.formEnabled;
    this.orginData = JSON.parse(JSON.stringify(this.trip));
    // console.log(this.orginData);
  }

  addCosts() {
    let totalCost = 0;
    for (const cost of this.trip.costs) {
      totalCost += cost.costAmt;
    }
    console.log(totalCost);
    this.trip.totalCost = totalCost;

  }






  cancel() {
    this.formEnabled = !this.formEnabled;
    this.trip = this.orginData;
    // console.log(this.trip);
  }

  editTrip() {
    this.formEnabled = !this.formEnabled;
  }

  getTrip() {
    const id = this.route.snapshot.params.id;
    this.tripService.getTrip(id).subscribe(
      data => {
        this.trip = data.json();
        this.addCosts();
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.getTrip();
  }

  async saveTrip() {
    const response = await this.tripService.putTrip(this.trip);
    this.toggleForm();
  }

}
