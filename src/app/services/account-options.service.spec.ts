/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountOptionsService } from './account-options.service';

describe('AccountOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountOptionsService]
    });
  });

  it('should ...', inject([AccountOptionsService], (service: AccountOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
