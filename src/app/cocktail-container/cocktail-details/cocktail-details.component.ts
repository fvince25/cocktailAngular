import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {Cocktail} from '../../shared/models/cocktail.model';
import {Ingredient} from '../../shared/models/ingredient.model';
import {CocktailService} from '../../shared/services/cocktail.service';
import {PanierService} from '../../shared/services/panier.service';
import {FormArray} from '@angular/forms';


@Component({
    selector: 'app-cocktail-details',
    templateUrl: './cocktail-details.component.html',
    styleUrls: ['./cocktail-details.component.css']
})
export class CocktailDetailsComponent implements OnInit {

    public cocktail: Cocktail;
    public index: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private cocktailService: CocktailService,
        private panierService: PanierService
    ) {
    }


    ngOnInit() {


        this.activatedRoute.params.subscribe((params: Params) => {
            if (params.index) {
                console.log(params.index);
                this.index = params.index;
            } else {
                this.index = 0;
            }
            this.cocktailService.getCocktail(this.index).subscribe((cocktail: Cocktail) => {
                this.cocktail = cocktail;
            });
        });

    }

    addPanier(ingredients: Ingredient[]): void {
        this.panierService.addIngredients(ingredients);

    }


    getUrl(): string[] {
        return ['/cocktails', this.index + '', 'edit'];
    }

    removeCocktail() {
        this.cocktailService.removeCocktail(this.index);
    }

}
