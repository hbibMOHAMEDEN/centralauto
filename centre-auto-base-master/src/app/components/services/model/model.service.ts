import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Model} from '../../models/model.model';
import {CarService} from '../car/car.service';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  models: ReplaySubject<Array<Model>>;

  constructor(private afs: AngularFirestore,
              private carService : CarService) {
    this.models = new ReplaySubject<Array<Model>>();
  }

  getAll() {
    this.afs
        .collection('models')
        .snapshotChanges()
        .pipe(
            map(actions => {
              return actions.map(a => {
                const model = a.payload.doc.data() as Model;
                model.id = a.payload.doc.id;
                return model;
              })
            })
        )
        .subscribe(
            (models: Array<Model>) => this.models.next(models)
        )
  }

  add(model: Model) {
    return new Promise((resolve, reject) => {
      this.afs.collection('models')
          .add(model.toPlainObj())
          .then(() => resolve())
          .catch(err => reject(err));

    })
  }

  delete(modelId) {
    return new Promise(
        (resolve, reject) => {

            //Avant d supprimer un model supprime toute les voitures qui on
            // modelId egale au modelId que j'ai passé en paramete

            this.carService.deleteWhere("modelId","==", modelId)
                .then(() => {
                    this.afs
                        .collection('models')
                        .doc(modelId)
                        .delete()
                        .then(resolve)
                        .catch((err) => reject(err))
                })

        });

  }

  getById(modelId: any) {

    return new Promise(((resolve, reject) => {
      this.afs
          .collection('models')
          .doc(modelId)
          .get()
          .pipe(
              map((data) => {
                const model = data.data() as Model;
                model.id = data.id;
                return model;
              })
          )
          .subscribe((model: Model) => resolve(model));
    }))
  }

  edit(model: Model) {
    return new Promise((resolve, reject) => {
      this.afs
          .collection('models')
          .doc(model.id)
          .update({
            name: model.name,
            brandId : model.brandId
          })
          .then(resolve)
          .catch((err) => reject(err))
    })
  }

    /**
     * Methode for delete all the models by the whre clause
     * @param fieldPath
     * @param opStr
     * @param value
     */
    deleteWhere(fieldPath, opStr, value){
        return new Promise(
            (resolve, reject) => {
                this.afs.collection('models', ref => ref.where(fieldPath, opStr, value))
                    .get()
                    .subscribe(models => {
                        models.forEach(model => model.ref.delete())
                        });
                        resolve();
                    })
            }
}
