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


  constructor(private tripService: TripService) {
    this.add = true;

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
