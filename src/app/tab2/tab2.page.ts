//@ts-nocheck
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Food } from '../interfaces/food.model';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{

  allFoodInFreezer: Food[] = [];
  sub: Subscription;
  isLoading = false;

  constructor(
    private foodService: FoodService
  ) {}

  ngOnInit(){

    this.sub = this.foodService.allFood().subscribe(data =>{//AllFood va nous retourner un Observable auquel on s'abonne avec subscribe
        this.allFoodInFreezer = data.map(e =>{//ses données sont un tab qu'on parcours à l'aide de .map
          const foodItem = {// Pour chaque Elemnt de ce tab on va récuperer les objets ci-dessous
            id: e.payload.doc.id,
            ...e.payload.doc.data()
            //récupérer chaque champs
          } as Food;
          console.log('foodItem', foodItem)
          return foodItem;
        })
    }, err => {})

    console.log('ngOnInit', this.allFoodInFreezer)
  }

  ionViewWillEnter(){//Cette methode permet de remettre constament à jours notre allFoodInFreeze
    console.log('ionViewWillEnter', this.allFoodInFreezer)
  }

  edit(id){
    console.log('id', id)  
  }

  delete(id){
    console.log('id', id) ;
    this.isLoading = true;

    this.foodService
    .deleteFood(id)
    .pipe(//pipe permet de passer des instructions sur l'Observable
      take(1)//on veut récuperer 1 seul résultat puis nous désabonner
    )
    .subscribe(data =>{//nos fonctions CallBAck suite à notre abonnement 
      this.isLoading = false;
    }, err =>{
      this.isLoading = false;
      console.log(err)
    })
  }

  ngOnDestroy(){

    this.sub.unsubscribe() //Se désabonner de notre Observable au moment où le composant est détruit (page non active)   
  }
}
