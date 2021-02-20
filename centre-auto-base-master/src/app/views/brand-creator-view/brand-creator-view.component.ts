import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../components/models/brand.model';
import {BrandService} from '../../components/services/brand/brand.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-brand-creator-view',
  templateUrl: './brand-creator-view.component.html',
  styleUrls: ['./brand-creator-view.component.css']
})
export class BrandCreatorViewComponent implements OnInit {
    newBrandForm: FormGroup;
    brand: Brand;
    errorMsg: string;


    constructor(private formbuilder : FormBuilder,
                private router : Router,
                private brandService: BrandService) {
      this.brand = new Brand('');
    }

    ngOnInit(): void {
      this._intForm()
    }

    private _intForm() {
      this.newBrandForm = this.formbuilder.group({
        'name' : ['', Validators.required]
      });
    }

    onSubmitBrandCreatorForm(){
      this.errorMsg = null;
      this.brandService.add(this.brand)
          .then(()=> this.router.navigate(['/brands']))
          .catch(errorMsg => this.errorMsg = errorMsg)
    }
}
