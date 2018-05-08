import { Component, OnInit } from '@angular/core';

import { Trip } from '../../models/trip';
import { TripService } from '../../service/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  trips: Trip[];

  // getTrips(): void {
  //   console.log(this);
  //   this.tripService.getTrips()
  //     .subscribe(trips => this.trips = trips);
  // }

  constructor(private tripService: TripService) {
  }

  async ngOnInit() {
    const response = await this.tripService.getTrips();
    this.trips = response.json();
  }

}
