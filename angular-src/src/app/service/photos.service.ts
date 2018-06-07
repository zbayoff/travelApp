import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private endpoint = 'https://api.unsplash.com';
  private appID = '85cc7fab200fd57d69193fe7e68f784ad92294d19ac08569c26920cf01d44ae0';

  searchEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  // Search for image from users query
  searchPhotos(query: string, page: number) {
    if (query.length === 0) {
      this.searchEvent.emit('clear');
    }

    this.searchEvent.emit({ loading: true, page: page, query: query });
    let url = `${this.endpoint}/search/photos?client_id=${this.appID}`;
    url += `&page=${page}&query=${query}`;

    this.http.get(url)
      .pipe(
        map((res) => {
          this.searchEvent.emit(res.json());
        })
      )
      .subscribe(resp => resp, this.handleError());
  }

  getSearchEvent() {
    return this.searchEvent;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      let errorMessage = '';

      if (error.status && error._body === 'Rate Limit Exceeded') {
        errorMessage = 'Sorry, you have exceeded our free hourly limit. Please try again later.';
      }
      this.searchEvent.emit({ errorMessage: errorMessage });
      return of(result as T);
    };
  }

  triggerDownload(link) {
    return this.http.get(`${link}?client_id=${this.appID}`).pipe(
      map((res) => res.json()),
      catchError(err => of([]))
    );
  }
}
