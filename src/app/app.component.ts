import { Component } from '@angular/core';
import {AccountOptionsService} from './services/account-options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Account Options Manage';
  constructor(
    private accountOptionsService: AccountOptionsService
  ) {
    this.accountOptionsService.sync();
  }
}
