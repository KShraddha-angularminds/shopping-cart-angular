import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  constructor(private http: HttpClient) {}
  _url = 'http://xapi.ngminds.com/api/getAllProducts';

  post_url = ' http://xapi.ngminds.com/api/placeOrder';
  getAllProducts() {
    return this.http.get<any>(this._url);
  }

  postProduct(data: any) {
    return this.http.post<any>(this.post_url, data);
  }
}
