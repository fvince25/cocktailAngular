import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {CocktailService} from '../../shared/services/cocktail.service';
import {ActivatedRoute, Params, UrlSegment} from '@angular/router';
import {Ingredient} from '../../shared/models/ingredient.model';
import {Cocktail} from '../../shared/models/cocktail.model';

@Component({
    selector: 'app-cocktail-edit',
    templateUrl: './cocktail-edit.component.html',
    styleUrls: ['./cocktail-edit.component.css']
})
export class CocktailEditComponent implements OnInit {

    public cocktailForm: FormGroup;
    public cocktail: Cocktail;
    public title_operation: string;

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private cocktailService: CocktailService) {
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe((params: Params) => {
                if (params.index) {
                    this.cocktailService.getCocktail(params.index).subscribe((cocktail: Cocktail) => {
                        this.cocktail = cocktail;
                        this.initForm(this.cocktail);
                    });
                } else {
                    this.initForm();
                }
            }
        );

        this.activatedRoute.url.subscribe((urlsegment: UrlSegment[]) => {
            console.log('cocktail-edit', urlsegment);
        });

    }

    initForm(cocktail = {name: '', img: '', desc: '', ingredients: []}) {
        this.cocktailForm = this.fb.group({

            name: [cocktail.name, Validators.required],
            img: [cocktail.img, Validators.required],
            desc: [cocktail.desc],
            ingredients: this.fb.array(
                cocktail.ingredients.map(
                    ingredient => this.fb.group(
                        {
                            name: [ingredient.name],
                            quantity: [ingredient.quantity]
                        }
                    )
                )
            )

        });
    }

    addIngredient(): void {
        (<FormArray>this.cocktailForm.get('ingredients')).push(this.fb.group(
            {
                name: [''],
                quantity: ['']
            }
        ));
    }

    removeIngredient(index: number): void {
        (<FormArray>this.cocktailForm.get('ingredients')).removeAt(index);
    }

    // méthode createCocktail renommée en updatecocktail
    // Suivant le rooting, ce sera  une création soit une mise à jour.

    updateCocktail() {

        this.activatedRoute.params.subscribe((params: Params) => {
                if (params.index) {
                    // Si on a un index, c'est qu'on est en mise à jour
                    // On passe le cocktail, et sa position dans le tableau.
                    this.cocktailService.updateCocktail(this.cocktailForm.value, params.index);
                } else {
                    // Si on n'a pas d'index, c'est qu'on est en création
                    this.cocktailService.addCocktail(this.cocktailForm.value);
                }
            }
        );

    }

}
