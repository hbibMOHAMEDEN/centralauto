import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BrandService} from '../../components/services/brand/brand.service';
import {Model} from '../../components/models/model.model';
import {Brand} from '../../components/models/brand.model';
import {ModelService} from '../../components/services/model/model.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-models-creator-view',
  templateUrl: './models-creator-view.component.html',
  styleUrls: ['./models-creator-view.component.css']
})
export class ModelsCreatorViewComponent implements OnInit , OnDestroy{

  errorMsg: string;
  newModelForm: FormGroup;
  model: Model;
  brands : Array<Brand>;

  brandsSub : Subscription;

  constructor(private formBuilder : FormBuilder,
                private router : Router,
                private brandService : BrandService,
                private modelService: ModelService) {
    this.model = new Model('',  '');
  }

  ngOnInit(): void {
    this.brandsSub = this.brandService.brands.subscribe(
        brands => this.brands = brands
    )
    this.brandService.getAll();

    this._intForm()
  }

  private _intForm() {
    this.newModelForm = this.formBuilder.group({
      'name' : ['', Validators.required],
      'brandId' : ['', Validators.required]
    });
  }

  onSubmitNewModelForm(){
    this.errorMsg = null;
    this.modelService.add(this.model)
        .then(()=> this.router.navigate(['/models']))
        .catch(errorMsg => this.errorMsg = errorMsg)
  }

  ngOnDestroy(): void {
    this.brandsSub.unsubscribe();
  }
}
