import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // pour eles interacctions utilisateur
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  form!: FormGroup;

  //logo de chargement de page
  isLoading = false;

  constructor(
    private foodService: FoodService // on instencie notre foodService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      foodName: new FormControl(null, {
        // null à l'initialisation (1er param)
        validators: [Validators.required], // fournir un nom obligatoirement
      }),

      dataPlacedInFreezer: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
  add() {
    // console.log(this.form);
    // this.foodService.addFood(this.form.value); //ajouter els elements

    this.isLoading = true;

    this.foodService.addFood(this.form.value)
      .then(data => { // on attend une promise qui vient depuis notre service addFood et elle sera dans data
        console.log('data', data);
        this.isLoading = false;
      })
      .catch(err =>{ //on lance un catch en cas d'erreur
        console.error(err)
      })
      this.form.reset();
    }
  }