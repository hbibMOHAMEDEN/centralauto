import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Model} from '../../components/models/model.model';
import {ModelService} from '../../components/services/model/model.service';
import {Brand} from '../../components/models/brand.model';
import {Subscription} from 'rxjs';
import {BrandService} from '../../components/services/brand/brand.service';

@Component({
  selector: 'app-models-editor-view',
  templateUrl: './models-editor-view.component.html',
  styleUrls: ['./models-editor-view.component.css']
})
export class ModelsEditorViewComponent implements OnInit {
  errorMsg: string;
  editModelForm: FormGroup;
  model: Model;
  brands : Array<Brand>;

  brandsSub : Subscription;


  constructor(private formBuilder : FormBuilder,
              private router : Router,
              private route : ActivatedRoute,
              private brandService : BrandService,
              private modelService: ModelService) {
    this.model = new Model('',  '');
  }

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;

    this.modelService.getById(id).then(
        (model : Model)  => this.model = model
    )

    this.brandsSub = this.brandService.brands.subscribe(
        brands => this.brands = brands
    )
    this.brandService.getAll();

    this._intForm()
  }

  private _intForm() {
    this.editModelForm = this.formBuilder.group({
      'name' : ['', Validators.required],
      'brandId' : ['', Validators.required]
    });
  }

  onSubmitEditedModelForm(){
    this.errorMsg = null;
    this.modelService.edit(this.model)
        .then(()=> this.router.navigate(['/models']))
        .catch(errorMsg => this.errorMsg = errorMsg)
  }

  ngOnDestroy(): void {
    this.brandsSub.unsubscribe();
  }
}
