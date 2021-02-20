import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/model.user';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import  firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token : BehaviorSubject<string>;

  constructor(private afs : AngularFirestore, private afa : AngularFireAuth) {
    this.token = new BehaviorSubject<string>(null );
  }

  signUp(newUser : User){
    return new Promise((resolve, reject) => {
      firebase.auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((currentUser)=>{
            this.token.next(currentUser.user.refreshToken);

            newUser.id=currentUser.user.uid;

            this.afs
                .collection('users')
                .doc(currentUser.user.uid)
                .set(newUser.toPlainObj())
                .then(()=>resolve());
          })
          .catch((err)=>{
            if(err.code === 'auth/email-already-in-use'){
              reject('L\'adresse email est déjà utilisée.');
            }
            if(err.code === 'auth/invalid-email'){
              console.log('je suis sur error invalide de signup---------------')
              reject('L\'adresse email est invalid.');

            }
            if(err.code === 'auth/operation-not-allowed'){
              reject('Une erreur est survenu.');
            }
            if(err.code === 'auth/weak-password'){
              reject('Le mot de passe n\'est pas securisé.');
            }
            reject('Une erreur est survenu.');
          });
    })
  }

  signIn(email :string, password : string) {

    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((currentUser)=>{
            this.token.next(currentUser.user.refreshToken);
            resolve();
          })
          .catch((err)=>{
            if(err.code === 'auth/invalid-email'){
              reject('L\'adresse email est invalid.');
            }
            else if(err.code === 'auth/user-disabled'){
              reject('l\'utilisateur a été banni.');
            }
            else if (err.code === 'auth/user-not-found'){
              reject('l\'utilisateur n\'existe pas.');
            }
            else if(err.code==='auth/wrong-password'){
              reject('Le mot de passe est incorrect.');
            }
            reject('Une erreur est survenu.');
          })
    })

  }


  logout(){
    return new Promise((resolve, reject) => {
      firebase
          .auth()
          .signOut()
          .then(()=>{
            this.token.next(null);
            resolve()
          })
    })
  }
  getToken() {
    if(!this.token.getValue()){
      this.afa.authState.subscribe((user)=>{
        if(user && user.uid){
          this.token.next(user.refreshToken);
          return this.token;
        }
      })
    }
    return this.token;

  }
}
