import { Injectable } from '@angular/core';
import {Jsonp, URLSearchParams, Headers, ResponseContentType} from '@angular/http';
import * as configurationPolicy from '../configuration/policy';
import {CustomQueryEncoder} from '../utils/custom-query-endoder';
import {BehaviorSubject} from 'rxjs';
import {isBlank} from '@angular/core/src/facade/lang';

@Injectable()
export class AccountOptionsService {
  private times: number;
  private data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private jsonp: Jsonp) {
    this.times = 0;
  }

  getData(){
    return this.data.asObservable().skipWhile(value => isBlank(value));
  }

  getBaseParams(): URLSearchParams {
    const params = new URLSearchParams('', new CustomQueryEncoder());
    for (const api_key of Object.keys(configurationPolicy.auth)){
      params.set(api_key, configurationPolicy.auth[api_key]);
    }
    params.set('format', 'jsonp');
    // bug in @angular/http 2.4.7
    params.set('callback', `__ng_jsonp__.__req${this.times}.finished`);
    this.times = this.times + 1;
    return params;
  }

  sync(){
    this.get().subscribe(data=>this.data.next(data));
  }

  get() {
    return this.jsonp
      .get(`${configurationPolicy.base}${configurationPolicy.methods.get}`, {
        search: this.getBaseParams()})
      .map(response => response.json());
  }

  set(data){
    const params = this.getBaseParams();
    params.set('accountOptions', JSON.stringify(data));
    return this.jsonp
      .get(`${configurationPolicy.base}${configurationPolicy.methods.set}`, {
        search: params})
      .map(response => response.json());
    // return this.jsonp.p
  }

}
