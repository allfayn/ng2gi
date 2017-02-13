import { Component, OnInit } from '@angular/core';
import {AccountOptionsService} from '../../services/account-options.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

interface FormField {
  type: string;
  label: string;
  name: string;
  rank: number;
  options?: Array<{id: string, label: string}>;
  multiple?: boolean;
  readonly: boolean;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public readonly: Boolean = false;
  public form: FormGroup;
  public formFields: Array<FormField> = [];
  public errorMessage: string;

  constructor(
    private accountOptionsService: AccountOptionsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
    this.route.data.subscribe((params: any) => {
      this.readonly = params['readonly'];
    });
    this.accountOptionsService.getData().subscribe(data => {
      if (data.errorMessage && data.errorCode !== 0) {
         this.errorMessage = data.errorMessage;
      } else {
        this.buildForm(data);
        this.errorMessage = null;
      }
    });
  }

  buildForm(data) {
    const accountOptions = data['accountOptions'];
    const formFields = [];
    const form = this.formBuilder.group({});
    let rank = 0;
    for (const key of Object.keys(accountOptions)){
      rank++;
      const field: FormField = {
        type: 'text',
        label: key,
        name: key,
        rank: rank,
        readonly: this.readonly ? true : null
      };
      const control: FormControl = new FormControl(accountOptions[key]);
      switch (typeof accountOptions[key]) {
        case 'string':
          if (key === 'loginIdentifierConflict') {
            field.type = 'dropdown';
            field.multiple = false;
            field.options = [
              {id: 'ignore', label: 'ignore'},
              {id: 'failOnSiteConflictingIdentity', label: 'failOnSiteConflictingIdentity'},
              {id: 'failOnAnyConflictingIdentity', label: 'failOnAnyConflictingIdentity'}
            ];
          } else if (key === 'loginIdentifiers') {
            field.type = 'dropdown';
            field.multiple = true;
            field.options = [
              {id: 'email', label: 'Email'},
              {id: 'username', label: 'Username'},
              {id: 'providerEmail', label: 'Social Identity'}
            ];
            control.setValue(accountOptions[key].split(', '));
          } else {
            field.type = 'text';
          }
          break;
        case 'boolean':
          field.type = 'checkbox';
          break;
      }
      form.registerControl(key, control);
      formFields.push(field);
    }
    this.form = form;
    this.formFields = formFields;
  }

  onSubmit() {
    const result = Object.assign({}, this.form.value);
    result.loginIdentifiers = this.form.value.loginIdentifiers.join(', ');
    this.accountOptionsService.set(result).subscribe(data => {
        if (data.errorMessage && data.errorCode !== 0) {
          this.errorMessage = data.errorMessage;
        } else {
          this.errorMessage = null;
        }
      }
    );
  }

  onClear(){
    this.accountOptionsService.sync();
  }

}
