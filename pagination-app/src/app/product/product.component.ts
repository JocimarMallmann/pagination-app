import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductService } from './product.service';
import { Product, IHeaders } from '../models/models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Product[] = []
  private headers = [];

  headersUseDebounce: Subject<IHeaders> = new Subject<IHeaders>();
  headersUse: IHeaders = {}

  constructor(private service: ProductService) { }

  ngOnInit() {
    this.pageProducts(0, 10);
  }
  ngOnDestroy(): void {
    this.headersUseDebounce.unsubscribe();
  }


  pageProducts(page, size) {
    this.service.getProductPage(page, size).subscribe( (res) => {
      console.log('res: ', res);
      // pegando headers da requisição
      const keys = res.headers.keys();

      this.headers = keys.map(key => `${ key }: ${ res.headers.get(key) }`).
      map( (str) => {
        let [ key, value ] = str.split(': '); // dividindo chave e valor
        key = this.keyFormatting(key);
        return {
          [key] : value
        }
      });

      this.headers.forEach( (obj) => {
        for (let i in obj) {
          // console.log('i/chave: ', i);
          // console.log('value: ', obj[i]);

          this.checkHeader(i, obj[i]);
        }
      });
      this.headersUseDebounce.next(this.headersUse);

      this.products = res.body;
      // console.log(this.headers);
      console.log(this.headersUseDebounce);
      console.log(this.headersUse);
    });
  }

  private checkHeader(key, value) {
    key == 'cachecontrol' ? this.headersUse.cachecontrol = value : '';
    key === 'contenttype' ? this.headersUse.contenttype = value : '';
    key === 'expires' ? this.headersUse.expires = value : '';
    key === 'link' ? this.headersUse.link = value : '';
    key === 'pragma' ? this.headersUse.pragma = value : '';
    key === 'xtotalcount' ? this.headersUse.xtotalcount = parseInt(value) : '';
  }
  private keyFormatting(key) {
    // regex para tirar o caractere '-'
    return key.replace(/\W/g, '');
  }

  changePage(event) {
    console.log(event);
    console.log(event.page, event.size);
    this.pageProducts(event.page, event.size);
  }

}
