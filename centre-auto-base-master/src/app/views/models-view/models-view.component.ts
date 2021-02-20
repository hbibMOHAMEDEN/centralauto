import {Component, OnDestroy, OnInit} from '@angular/core';
import {Brand} from '../../components/models/brand.model';
import {Subscription} from 'rxjs';
import {BrandService} from '../../components/services/brand/brand.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfirmDeleteComponent} from '../../components/modal-confirm-delete/modal-confirm-delete.component';
import {Model} from '../../components/models/model.model';
import {ModelService} from '../../components/services/model/model.service';

@Component({
  selector: 'app-models-view',
  templateUrl: './models-view.component.html',
  styleUrls: ['./models-view.component.css']
})
export class ModelsViewComponent implements OnInit , OnDestroy{

  models : Array<Model>;
  modelChewable: Array<Model>;
  brands : Array<Brand>;

  modelSub : Subscription;
  brandSub : Subscription;

  alert: any;

  constructor(private brandService : BrandService,
              private modelService : ModelService,
              private modalService : NgbModal) {
    this.alert = {
      isVisible : false,
      message : '',
      type : ''
    };
  }

  ngOnInit(): void {

    this.modelSub = this.modelService.models.subscribe(
         models  => {
                   this.models = models;
                   this.modelChewable = models;
                        }
         );
    this.brandSub = this.brandService.brands.subscribe(
        brands => this.brands = brands
    )

    this.modelService.getAll();
    this.brandService.getAll();
  }
    getBrandName(brandId: string) {
        if(this.brands){
            return this.brands.find(s => s.id === brandId).name;
        }
    }
    onFilterByBrand(brandId: string) {
      if(brandId === 'all'){
          this.modelChewable = this.models.slice(0);
      }
      else {
          this.modelChewable = this.models.filter( model => model.brandId === brandId)
      }

    }
  onClickDeleteModel(modelId) {
    const confirmModal = this.modalService.open(ModalConfirmDeleteComponent).result;
    confirmModal
        .then(()=>{
          this.modelService.delete(modelId)
              .then(()=>{
                this.alert.isVisible = true;
                this.alert.message ="Model Supprimé avec succès";
                this.alert.type = 'success';
                setTimeout(()=> this.alert.isVisible = false, 3000);
              })
              .catch(()=>{
                this.alert.isVisible = true;
                this.alert.message = "Une erreur est survenue";
                this.alert.type = 'error';
                setTimeout(()=> this.alert.isVisible = false, 3000);

              })
        })
  }
  ngOnDestroy(): void {
    this.modelSub.unsubscribe();
  }


}
