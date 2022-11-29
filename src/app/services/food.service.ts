import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food.modele';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentChangeAction } from '@angular/fire/compat/firestore'
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // private _allFood: Food[] = [];

  // get allfood(){//un getter sur allfood
  //   return this._allFood;
  // }

  // constructor() { }

  //   addFood(foodItem: Food){
  //   this._allFood = [foodItem,...this._allFood]//ajouter de la nourriture
  //   console.log(this._allFood)
    
  // }

         //VI----3----
        constructor(private afs: AngularFirestore){}

          allFood(){
            return this.afs.collection('freezer').snapshotChanges()
          }

          addFood(foodItem: Food){//Ajouter des aliments à la BDD
            return this.afs.collection('freezer').add(foodItem)
          }

          deleteFood(id: string): Observable<any>{//On va placer un Observable
            return from(this.afs.doc(`freezer/${id}`).delete())
          }
}
