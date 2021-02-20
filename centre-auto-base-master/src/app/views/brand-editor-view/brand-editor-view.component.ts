import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Brand} from '../../components/models/brand.model';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from '../../components/services/brand/brand.service';

@Component({
  selector: 'app-brand-editor-view',
  templateUrl: './brand-editor-view.component.html',
  styleUrls: ['./brand-editor-view.component.css']
})
export class BrandEditorViewComponent implements OnInit {
  editBrandForm: FormGroup;
  brand: Brand;
  errorMsg: string;


  constructor(private formbuilder : FormBuilder,
              private router : Router,
              private route : ActivatedRoute,
              private brandService: BrandService) {
    this.brand = new Brand('');
  }

  ngOnInit(): void {
    const  id = this.route.snapshot.params.id;
    this.brandService.getById(id).then((brand : Brand) => {
      this.brand = brand;
    })
    this._intForm()
  }

  private _intForm() {
    this.editBrandForm = this.formbuilder.group({
      'name' : ['', Validators.required]
    });
  }

  onSubmitBrandEditorForm(){
    this.errorMsg = null;
     this.brandService.edit(this.brand)
        .then(()=> this.router.navigate(['/brands']))
        .catch(errorMsg => this.errorMsg = errorMsg)
  }

}
