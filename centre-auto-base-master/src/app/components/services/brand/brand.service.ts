import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Brand} from '../../models/brand.model';
import {map} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {CarService} from '../car/car.service';
import {ModelService} from '../model/model.service';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  brands : ReplaySubject<Array<Brand>>;

  constructor(private afs: AngularFirestore,
              private carService :CarService,
              private modelService : ModelService
              ) {
    this.brands = new ReplaySubject<Array<Brand>>();
  }

  getAll(){
    this.afs
        .collection('brands')
        .snapshotChanges()
        .pipe(
            map(actions=>{
              return actions.map(a=>{
                const brand = a.payload.doc.data() as Brand;
                brand.id = a.payload.doc.id;
                return brand;
              })
            })
        )
        .subscribe(
            (brands : Array<Brand>) => this.brands.next(brands)
        )
  }

  add(brand: Brand) {
    return new Promise((resolve, reject) => {
      this.afs.collection('brands')
          .add(brand.toPlainObj())
          .then(() => resolve())
          .catch(err => reject(err));

    })
  }

    delete(brandId) {
      return new Promise(
          (resolve, reject) => {
              /**
               * Before delete the brand , we have to delete all the cars associated
               * ----cascade---
               */
              this.carService.deleteWhere('brandId', '==', brandId)
                  .then(()=>{
                      //then delete all the models associated to the brand
                      this.modelService.deleteWhere('brandId', '==', brandId)
                          .then(()=>{
                              //Finally delete the brand for the brandId passed in parameters
                              this.afs
                                  .collection('brands')
                                  .doc(brandId)
                                  .delete()
                                  .then(resolve)
                                  .catch((err)=> reject(err))
                          })
                  })
      })
  }

    getById(brandId: any) {

        return new Promise(((resolve, reject) => {
            this.afs
                .collection('brands')
                .doc(brandId)
                .get()
                .pipe(
                    map((data)=>{
                            const brand = data.data() as Brand;
                            brand.id = data.id;
                            return brand;
                    })
                )
                .subscribe((brand:Brand) => resolve(brand));
        }))
    }
   edit(brand : Brand){
      return new Promise((resolve, reject) => {
          this.afs
              .collection('brands')
              .doc(brand.id)
              .update({
                  name : brand.name
              })
              .then( resolve )
              .catch((err)=> reject(err))
      })
   }
}

