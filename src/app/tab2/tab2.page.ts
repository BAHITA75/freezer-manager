//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from '../interfaces/food.modele';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  allFoodInFreezer: any | object [] = [];
  sub: Subscription;
  constructor(
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.sub = this.foodService.allFood().subscribe(data => { //AllFood va nous retpurner un observable lequel on s'abonne avec subscribe
      this.allFoodInFreezer = data.map(e => { //
        const foodItem = { //pour chaque elemen de ce tableau on va recuprer les onjets cj-dessous
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Food
        return foodItem;
      })
    }, err => {})
  }

  ionViewWillEnter(){
    this.allFoodInFreezer = this.foodService.allFood;
    console.log("ionViewWillEner", this.allFoodInFreezer)
  }

}
