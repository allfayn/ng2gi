import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {AccountOptionsService} from './services/account-options.service';
import { IndexComponent } from './components/index/index.component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {requestOptionsProvider} from './utils/default-request-options.service';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: { readonly: false }
  },
  {
    path: 'readonly',
    component: IndexComponent,
    data: { readonly: true }
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AccountOptionsService, requestOptionsProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
