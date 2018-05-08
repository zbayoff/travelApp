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

  show: boolean;

  back() {
    window.history.back();
  }

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private location: Location
  ) {
    this.show = false;




  }

  async ngOnInit() {
    
    const id = this.route.snapshot.params.id;
    const response = await this.tripService.getTrip(id);



    this.trip = response.json();
    // this.trip.cost = 200;
    
  }

}
