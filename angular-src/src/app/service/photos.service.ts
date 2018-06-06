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

  searchPhotos(query, page) {

    let url = `${this.endpoint}/search/photos?client_id=${this.appID}`;
    url += `&page=${page}&query=${query}`;

    return this.http.get(url)
      .pipe(
        map((res) => res.json()),
        catchError(this.handleError())
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error._body); // log to console instead


      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  triggerDownload(link) {
    return this.http.get(`${link}?client_id=${this.appID}`).pipe(
      map((res) => res.json()),
      catchError(err => of([]))
    );
  }


  constructor(private http: Http) { }


}
