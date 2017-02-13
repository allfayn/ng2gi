import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions } from '@angular/http';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    // Set the default 'Content-Type' header
    this.headers.append('Content-Type', 'application/json');
    // this.headers.set('Accept', 'application/json');
    this.headers.append('X-Requested-By', 'Angular 2');
  }
}

export const requestOptionsProvider = { provide: RequestOptions, useClass: DefaultRequestOptions };
