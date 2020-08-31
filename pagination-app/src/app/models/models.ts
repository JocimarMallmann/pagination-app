export interface IHeaders {
  cachecontrol?: string;
  contenttype?: string;
  expires?: string;
  link?: string;
  pragma?: string;
  xtotalcount?: number;
}

export interface IConfig {
  pages?: number[];
  totalPage?: number;
  totalElements?: number;
  pageNumber?: number;
  first?: boolean;
  last?: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
};
