import { Component, OnInit, Input } from '@angular/core';
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

  formEnabled: boolean;

  back() {
    window.history.back();
  }

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location
  ) {

    this.formEnabled = false;

  }

  toggleForm() {
    this.formEnabled = !this.formEnabled;
  }

  cancel() {
    this.formEnabled = false;
  }

  async ngOnInit() {

    const id = this.route.snapshot.params.id;
    const response = await this.tripService.getTrip(id);
    console.log(response);
    this.trip = response.json();

    const travelCosts: any = Object.values(this.trip.travelCosts[0]).reduce((accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    });

    console.log(typeof travelCosts);

    const lodgingCosts: any = Object.values(this.trip.lodgingCosts[0]).reduce((accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    });

    const miscCosts: any = Object.values(this.trip.miscCosts[0]).reduce((accumulator: number, currentValue: number) => {
      return accumulator + currentValue;
    });

    this.totalCost = travelCosts + lodgingCosts + miscCosts;

  }


  async editTrip() {
    const response = await this.tripService.putTrip(this.trip);
    this.toggleForm();
  }





}
