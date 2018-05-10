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

  planeCostCheck: boolean;

  carCostCheck: boolean;

  busCostCheck: boolean;
  buscost: any;
  trainCostCheck: boolean;

  boatCostCheck: boolean;
  boatcost: any;
  otherTravelCostCheck: boolean;
  otherTravelcost: any;
  hotelmotelCostCheck: boolean;
  hotelmotelcost: any;
  airbnbCostCheck: boolean;
  airbnbcost: any;
  otherLodgingCostCheck: boolean;
  otherLodgingcost: any;
  miscCostCheck: boolean;
  misccost: any;

  myVar: any;

  setZero() {

    // console.log(myVar);
    this.trip.travelCosts[0].plane = 0;
    // this.trip.travelCosts[0].bus = 0;
    // this.trip.travelCosts[0].car = 0;

  }

  focusOut() {
    if (this.trip.travelCosts[0].plane === null) {
      this.trip.travelCosts[0].plane = 0;
    }
    if (this.trip.travelCosts[0].car === null) {
      this.trip.travelCosts[0].car = 0;
    }
    if (this.trip.travelCosts[0].bus === null) {
      this.trip.travelCosts[0].bus = 0;
    }
    if (this.trip.travelCosts[0].train === null) {
      this.trip.travelCosts[0].train = 0;
    }
    if (this.trip.travelCosts[0].boat === null) {
      this.trip.travelCosts[0].boat = 0;
    }
    if (this.trip.travelCosts[0].other === null) {
      this.trip.travelCosts[0].other = 0;
    }
    if (this.trip.lodgingCosts[0].hotelMotel === null) {
      this.trip.lodgingCosts[0].hotelMotel = 0;
    }
    if (this.trip.lodgingCosts[0].airBnB === null) {
      this.trip.lodgingCosts[0].airBnB = 0;
    }
    if (this.trip.lodgingCosts[0].other === null) {
      this.trip.lodgingCosts[0].other = 0;
    }
    if (this.trip.miscCosts[0].misc === null) {
      this.trip.miscCosts[0].misc = 0;
    }
  }

  back() {
    window.history.back();
  }

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location
  ) {

    this.formEnabled = false;


    this.planeCostCheck = true;

    this.carCostCheck = true;

    this.busCostCheck = true;

    this.trainCostCheck = true;

    this.boatCostCheck = true;

    this.otherTravelCostCheck = true;

    this.hotelmotelCostCheck = true;

    this.airbnbCostCheck = true;

    this.otherLodgingCostCheck = true;

    this.miscCostCheck = true;


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
