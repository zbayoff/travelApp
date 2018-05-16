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
  totalCost: Number;
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

  cancel() {
    this.formEnabled = !this.formEnabled;
    this.trip = this.orginData;
    // console.log(this.trip);
  }

  editTrip() {
    this.formEnabled = !this.formEnabled;
  }

  async ngOnInit() {

    const id = this.route.snapshot.params.id;
    const response = await this.tripService.getTrip(id);

    this.trip = response.json();

  }

  async saveTrip() {
    const response = await this.tripService.putTrip(this.trip);
    this.toggleForm();
  }

}
