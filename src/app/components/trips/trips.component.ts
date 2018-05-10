import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Trip } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trip: Trip;
  trips: Trip[];
  add: boolean;
  travelCosts: any;
  totalCost: any;
  planeCostCheck: boolean;
  planecost: any;
  carCostCheck: boolean;
  carcost: any;
  busCostCheck: boolean;
  buscost: any;
  trainCostCheck: boolean;
  traincost: any;
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

  // getTrips(): void {
  //   console.log(this);
  //   this.tripService.getTrips()
  //     .subscribe(trips => this.trips = trips);
  // }

  constructor(private tripService: TripService) {
    this.add = true;
    this.planecost = 0;
    this.planeCostCheck = true;
    this.carcost = 0;
    this.carCostCheck = true;
    this.buscost = 0;
    this.busCostCheck = true;
    this.traincost = 0;
    this.trainCostCheck = true;
    this.boatcost = 0;
    this.boatCostCheck = true;
    this.otherTravelcost = 0;
    this.otherTravelCostCheck = true;
    this.otherTravelcost = 0;
    this.hotelmotelCostCheck = true;
    this.hotelmotelcost = 0;
    this.airbnbCostCheck = true;
    this.airbnbcost = 0;
    this.otherLodgingCostCheck = true;
    this.otherLodgingcost = 0;
    this.miscCostCheck = true;
    this.misccost = 0;
  }

  setZero() {
    // this.planecost = 0;
    // this.carcost = 0;
    // this.buscost = 0;
    // this.traincost = 0;
    // this.boatcost = 0;
    // this.otherTravelcost = 0;
    // this.hotelmotelcost = 0;
    // this.airbnbcost = 0;
    // this.otherLodgingcost = 0;
    // this.misccost = 0;
  }

  focusOut() {
    if (this.planecost === null) {
      this.planecost = 0;
    }
    if (this.carcost === null) {
      this.carcost = 0;
    }
    if (this.buscost === null) {
      this.buscost = 0;
    }
    if (this.traincost === null) {
      this.traincost = 0;
    }
    if (this.boatcost === null) {
      this.boatcost = 0;
    }
    if (this.otherTravelcost === null) {
      this.otherTravelcost = 0;
    }
    if (this.hotelmotelcost === null) {
      this.hotelmotelcost = 0;
    }
    if (this.airbnbcost === null) {
      this.airbnbcost = 0;
    }
    if (this.otherLodgingcost === null) {
      this.otherLodgingcost = 0;
    }
    if (this.misccost === null) {
      this.misccost = 0;
    }
  }


  async addTrip(form: NgForm) {
    // console.log(form.value);

    const formData = {
      'destination': form.value.destination,
      'startdate': form.value.startdate,
      'leavedate': form.value.leavedate,
      'image': form.value.image,
      'url1': form.value.url1,
      'url2': form.value.url2,
      'travelCosts': {
        'plane': form.value.planecost,
        'car': form.value.carcost,
        'bus': form.value.buscost,
        'train': form.value.traincost,
        'boat': form.value.boatcost,
        'other': form.value.otherTravelcost
      },
      'lodgingCosts': {
        'hotelMotel': form.value.hotelmotelcost,
        'airBnB': form.value.airbnbcost,
        'other': form.value.otherLodgingcost,
      },
      'miscCosts': {
        'misc': form.value.misccost,
      }
    };

    console.log(formData);

    const response = await this.tripService.addTrip(formData);
    const responseGet = await this.tripService.getTrips();
    this.trips = responseGet.json();
  }

  async ngOnInit() {
    const response = await this.tripService.getTrips();
    this.trips = response.json();

  }

  async deleteTrip(tripID) {
    const response = await this.tripService.deleteTrip(tripID);
    const responseGet = await this.tripService.getTrips();
    this.trips = responseGet.json();
  }

}
