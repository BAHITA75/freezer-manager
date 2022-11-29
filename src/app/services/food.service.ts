import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Food } from '../interfaces/food.modele';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // private _allFood: Food[]= []

  // get allfood(){
  //   return this._allFood
  // }
  // constructor() { }

  // addFood(foodItem: any) {
  //   this._allFood = [foodItem, ...this.allfood] //ajouter de la nourriture
  //   console.log(this._allFood)
  // }

  constructor(
    private afs: AngularFirestore
  ){}

  allFood(){
    return this.afs.collection('freezer').snapshotChanges() //récupérer les données dnas la BDD en temps réel
  }

  addFood(foodItem: Food){

  }

}
