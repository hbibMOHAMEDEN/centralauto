import { Injectable } from '@angular/core';
import {Car} from '../../models/car.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage

@Injectable({
  providedIn: 'root'
})
export class CarService {
   cars: ReplaySubject<Array<Car>>

  constructor(private afs : AngularFirestore, private afStorage : AngularFireStorage) {
     this.cars = new ReplaySubject<Array<Car>>();
  }

          getAll(){
            this.afs
                .collection('cars')
                .snapshotChanges()
                .pipe(
                    map(actions=>{
                      return actions.map(a=>{
                        const car = a.payload.doc.data() as Car;
                        car.id = a.payload.doc.id;
                        return car;
                      })
                    })
                )
                .subscribe(
                    (cars : Array<Car>) => this.cars.next(cars)
                )
          }

          add(car: Car) {
            return new Promise((resolve, reject) => {
              this.afs.collection('cars')
                  .add(car.toPlainObj())
                  .then(() => resolve())
                  .catch(err => reject(err));

            })
          }

    getById(carId) {

        return new Promise(((resolve, reject) => {
            this.afs
                .collection('cars')
                .doc(carId)
                .get()
                .pipe(
                    map((data)=>{
                        const car = data.data() as Car;
                        car.id = data.id;
                        return car;
                    })
                )
                .subscribe((car:Car) => resolve(car));
        }))
    }

            /**
             * Methode for delete all the car by the whre clause
             * @param fieldPath
             * @param opStr
             * @param value
             */
          deleteWhere(fieldPath, opStr, value){
               return new Promise(
                   (resolve, reject) => {
                       this.afs.collection('cars', ref => ref.where(fieldPath, opStr, value))
                           .get()
                           .subscribe(cars => {
                               cars.forEach(car =>{
                                   //First delete the image
                                   console.log(car.data())
                                  const imgPathSplit = car.data().imgPath.split('/');
                                   const imgName = imgPathSplit[imgPathSplit.length - 1].split('?')[0];
                                    this.afStorage.ref(imgName).delete()
                                       .subscribe(()=>{
                                           //then delete the car in DB
                                           car.ref.delete();
                                       })
                               })
                               resolve();
                           })

                   }
               )
          }

                    /**
                     * deleting a car and his img on the DB
                     * @param carId
                     * @param carImgPath
                     */
                    delete(carId, carImgPath) {
                        const imgPathSplit = carImgPath.split('/');
                        const imgName = imgPathSplit[imgPathSplit.length - 1].split('?')[0];
                        this.afStorage.ref(imgName).delete()
                            .subscribe(()=>{
                                this.afs
                                    .collection('cars')
                                    .doc(carId)
                                    .delete()
                                    .catch((err)=> console.log(err))
                            })

                    }
}
