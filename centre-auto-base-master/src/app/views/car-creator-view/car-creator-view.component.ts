import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../../components/models/car.model';
import {Subscription} from 'rxjs';
import {Brand} from '../../components/models/brand.model';
import {Model} from '../../components/models/model.model';
import {ModelService} from '../../components/services/model/model.service';
import {CarService} from '../../components/services/car/car.service';
import {BrandService} from '../../components/services/brand/brand.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-car-creator-view',
  templateUrl: './car-creator-view.component.html',
  styleUrls: ['./car-creator-view.component.css']
})
export class CarCreatorViewComponent implements OnInit, OnDestroy {

  car : Car;
  brands : Array<Brand>;
  models : Array<Model>;
  modelsForBrandId: Array<Model>;

  modelSub :Subscription;
  brandSub : Subscription;

  errorMsg : string;

  newCarForm: FormGroup;

  numbers = [1, 2, 3, 4, 5];
  energyTypes = ['Diesel', 'Essence', 'Hybrid', 'Electric', 'GPL'];
  fileSelected: any;


  constructor(private modelService : ModelService,
              private carService : CarService,
              private brandService : BrandService,
              private formBuilder : FormBuilder,
              private afs : AngularFireStorage,
              private router : Router) {
    this.car = new Car();
    this.modelsForBrandId = [];
  }

  ngOnInit(): void {
    this._initSub();
    this.modelService.getAll();
    this.brandService.getAll();
    this._initForm();
  }



  private _initSub() {

    this.brandSub=this.brandService.brands.subscribe(
        brands => this.brands=brands
    );
    this.modelSub=this.modelService.models.subscribe(
        models => this.models=models
    );
  }

  private _initForm() {
    this.newCarForm = this.formBuilder.group({
      'brandId' : ['', Validators.required],
      'modelId' : ['', Validators.required],
      'dateFirstRelease' : ['', [Validators.pattern(/^(0[1-9]|1[012])\/\d{4}$/)]],
      'mileage' : ['', Validators.required],
      'doorsNb' : ['', Validators.required],
      'placesNb' : ['', Validators.required],
      'energyType' : ['', Validators.required],
      'horsePower' : ['', Validators.required],
      'gearboxType' : ['', Validators.required],
      'color' : ['', Validators.required],

    })
  }
  getModelsForBrandId(brandId){
    this.modelsForBrandId = this.models.filter(model =>  model.brandId === brandId);
  }

  onFileSelected(e) {
    this.fileSelected = null;
    if (e.target.files.length > 0){
      this.fileSelected = e.target.files[0];
    }
  }

      onSubmitNewCarForm(){
    // recuperation unique : 308_timestamp.jpg
       this.errorMsg = null;
       const fileName = this.fileSelected.name.split(".")[0]+"_"+ new Date().getTime().toString()+"."+ this.fileSelected.name.split(".")[1];

       const fileRef = this.afs.ref(fileName);
       const talk = this.afs.upload(fileName, this.fileSelected);

       talk.snapshotChanges()
           .pipe(
           finalize(
               ()=>{
                 fileRef.getDownloadURL().subscribe(
                     url =>{
                       this.car.imgPath = url;
                       // second add the car in DB
                       this.carService.add(this.car)
                           .then(()=> this.router.navigate(['dashboard']))
                           .catch((err) => this.errorMsg = err);

                     }
                 )
               }
           )
           ).subscribe();
      }

        ngOnDestroy(): void {
          this.brandSub.unsubscribe();
          this.modelSub.unsubscribe();
        }



}
