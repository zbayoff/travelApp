import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {

  show: boolean;

  back() {
    window.history.back();
  }

  constructor() {
    this.show = false;
  }

  ngOnInit() {
  }

}
