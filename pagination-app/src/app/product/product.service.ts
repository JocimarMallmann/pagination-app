import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/models';

const API = `http://localhost:3000`;

@Injectable()
export class ProductService {


  constructor(private http: HttpClient) {}

  getProductList(): Observable<any> {
    return this.http.get(`${API}/content`);
  }
                                        // para retornar o Response, e pegar os Headers da requisição se precisar
  getProductPage(page, limit): Observable<HttpResponse<Product[]>> {

    const paramsPage = new HttpParams().append('_page', page.toString());
    const paramsLimit = new HttpParams().append('_limit', limit.toString());

    // console.log(`${API}/content?${paramsPage}&${paramsLimit}`);
    return this.http.get<Product[]>(
      `${API}/content?${paramsPage}&${paramsLimit}`, { observe: 'response' });
  }

}
