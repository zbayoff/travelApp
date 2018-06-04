import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, of } from 'rxjs';

import { map, filter, switchMap, catchError } from 'rxjs/operators';

// import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private endpoint = 'https://api.unsplash.com';
  private appID = '85cc7fab200fd57d69193fe7e68f784ad92294d19ac08569c26920cf01d44ae0';

  searchPhotos(query) {
    return this.http.get(`${this.endpoint}/search/photos?client_id=${this.appID}&page=1&query=${query}`)
      .pipe(
        map((res) => res.json()),
      catchError(err => of([]))
    );
  }

  constructor(private http: Http) { }


}
