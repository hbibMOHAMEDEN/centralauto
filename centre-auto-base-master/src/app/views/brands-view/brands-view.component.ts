import {Component, OnDestroy, OnInit} from '@angular/core';
import {Brand} from '../../components/models/brand.model';
import {Subscription} from 'rxjs';
import {BrandService} from '../../components/services/brand/brand.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalConfirmDeleteComponent} from '../../components/modal-confirm-delete/modal-confirm-delete.component';

@Component({
  selector: 'app-brands-view',
  templateUrl: './brands-view.component.html',
  styleUrls: ['./brands-view.component.css']
})
export class BrandsViewComponent implements OnInit , OnDestroy{

  brands : Array<Brand>;
  brandSub : Subscription;

  alert: any;

  constructor(private brandService : BrandService, private modalService : NgbModal) {
    this.alert = {
      isVisible : false,
      message : '',
      type : ''
    };
  }

  ngOnInit(): void {

    this.brandSub = this.brandService.brands.subscribe(
        brands => this.brands = brands
    );
    this.brandService.getAll();
  }
  onClickDeleteBrand(brandId) {
  const confirmModal = this.modalService.open(ModalConfirmDeleteComponent).result;
  confirmModal
      .then(()=>{
        this.brandService.delete(brandId)
            .then(()=>{
            this.alert.isVisible = true;
            this.alert.message ="Marque Supprimée avec succès";
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
    this.brandSub.unsubscribe();
  }


}
