import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  constructor(private http: HttpClient) {}
  _url = 'http://xapi.ngminds.com/api/getAllProducts';
  getAllProducts() {
    return this.http.get<any>(this._url);
  }
}
