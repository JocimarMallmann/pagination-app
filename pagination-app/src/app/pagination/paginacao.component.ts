import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { IHeaders, IConfig } from '../models/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'pagination',
  templateUrl: `./pagination.component.html`,
  styleUrls: ['./pagination.component.css'],
  host: {
    '[attr.aria-label]': 'ariaLabel'
  }
})
export class PaginationComponent implements OnInit, OnDestroy {

  ariaLabel: string = 'Paginação';
  pageNumber: number = 1;

  private size: number = 10;
  headersUse: IHeaders;
  config: IConfig;
  @Input("headerSubject") _headersSubject: Subject<IHeaders>;

  @Output() public paginationEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this._headersSubject.subscribe((headersUse: IHeaders) => {
      console.log('subscribe header paginacao', headersUse);
      this.headersUse = headersUse;
      this.config = this.createConfig(this.pageNumber);
      this.setPagetion();
    });
  }
  ngOnDestroy(): void {
    this._headersSubject.unsubscribe();
  }

  changePage(page?) {
    this.paginationEvent.emit({ page: page ? page : 1, size: this.size });
    this.pageNumber = page;
  }


  private setPagetion() {
    let pages: number[] = [];
    console.log('totalPage setPagetion() ', this.config.totalPage);

    for (let i = 0; i < this.config.totalPage; i++) {
      pages.push(i+1);
    }
    this.config.pages = this.config.pages.concat(...pages);
    console.log('array config.pages ',this.config.pages);
  }
  private createConfig(pageNumber: number): IConfig {
    return {
      pages: [],
      totalPage: Math.ceil(this.headersUse.xtotalcount / this.size),
      totalElements: this.headersUse.xtotalcount,
      pageNumber: pageNumber,
      first: pageNumber == 1,
      last: pageNumber == Math.ceil(this.headersUse.xtotalcount / this.size)
    }
  }
  // private _isEmptyObject(obj) {
  //   return Object.keys(obj).length === 0;
  // }
}
