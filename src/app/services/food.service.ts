import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _allFood: any[]= []

  get allfood(){
    return this._allFood
  }
  constructor() { }
}
