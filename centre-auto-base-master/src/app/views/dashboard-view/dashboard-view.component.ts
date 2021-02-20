import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../../components/models/car.model';
import {Brand} from '../../components/models/brand.model';
import {Model} from '../../components/models/model.model';
import {Subscription} from 'rxjs';
import {CarService} from '../../components/services/car/car.service';
import {BrandService} from '../../components/services/brand/brand.service';
import {ModelService} from '../../components/services/model/model.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit , OnDestroy{
  cars: Array<Car>;
  brands : Array<Brand>;
  models: Array<Model>

  carSubs: Subscription;
  brandSubs: Subscription;
  modelSubs : Subscription;



  constructor(private carsService : CarService,
              private brandService : BrandService,
              private modelService : ModelService) { }

  ngOnInit(): void {
    this._initSubs();

    this.carsService.getAll();
    this.brandService.getAll();
    this.modelService.getAll();
  }

  /**
   * Method for init all the subscription
   */
    _initSubs() {
      this.carSubs = this.carsService.cars.subscribe(
          cars => this.cars = cars
      )
      this.brandSubs = this.brandService.brands.subscribe(
          brands => this.brands = brands
      )
      this.modelSubs = this.modelService.models.subscribe(
          models => this.models = models
      )
    }

  /**
   * retrieve the brand name by the id
   * @param brandId
   */
    getBrandName(brandId) {
      if(this.brands){
        return this.brands.find(brand => brand.id === brandId).name;
      }

    }

  /**
   * retrieve the model name by the id
   * @param modelId
   */
  getModeName(modelId) {
    if( this.models){
      return this.models.find(model => model.id === modelId).name;
    }

    }

    ngOnDestroy(): void {
      this.carSubs.unsubscribe();
      this.brandSubs.unsubscribe();
      this.modelSubs.unsubscribe();
    }


    onClickDeleteCar(carId, imgPath) {
        this.carsService.delete(carId, imgPath);
    }
}
