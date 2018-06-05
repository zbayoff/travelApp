import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Trip } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  animations: [
    trigger('slideOff', [
      state('hide', style({
        'display': 'none',
        'height': '0',
        'opacity': 0,
        'overflow': 'hidden'
      })),
      state('show', style({
        'display': 'block',
        'height': '*',
        'opacity': 1,
        'overflow': 'hidden'
      })),
      transition('show => hide', animate('600ms ease-in')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})
export class TripsComponent implements OnInit {

  trip: Trip;
  trips: Trip[];
  add: boolean;
  orderField: string;
  orderDir: any;
  searchText: string;
  hasCosts: boolean;

  constructor(private tripService: TripService) {
    this.add = true;
    this.orderField = 'totalCost';
    this.orderDir = '1';
  }

  addCosts() {
    let i = 0;

    for (const trip of this.trips) {
      let totalCost = 0;
      this.hasCosts = true;
      for (const cost of trip.costs) {
        i += 1;
        // console.log(i);
        this.hasCosts = true;
        // console.log(cost);
        totalCost += cost.costAmt;
        if (cost.costAmt === null) {
          this.hasCosts = false;
          // console.log('has costs:' + this.hasCosts);
        } else {
          // console.log('has costs:' + this.hasCosts);
        }
      }
      //
      trip.totalCost = totalCost;
    }
  }

  getTrips() {
    this.tripService.getTrips().subscribe(
      data => {
        this.trips = data.json();
        this.addCosts();
        // console.log(this.trips);
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.getTrips();
  }

  deleteTrip(trip: Trip) {
    this.tripService.deleteTrip(trip._id).subscribe(
      res => {
        this.trips.splice(this.trips.indexOf(trip), 1);
      },
      err => console.log(err)
    );

  }
}
