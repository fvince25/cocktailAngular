import {Injectable} from '@angular/core';
import {Cocktail} from '../models/cocktail.model';
import {BehaviorSubject} from 'rxjs';
import {Ingredient} from '../models/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
        this.initCocktails();
        // A effectuer une seule fois : one shot, pour uploader les cocktails qu'on a mis en dur !!!!!!!!
        // this.http.put('https://cocktails-9316f.firebaseio.com/cocktails.json', this.cocktails.value).subscribe(res => console.log(res));
    }

    initCocktails(): void {
        this.http.get<Cocktail[]>(
            'https://cocktails-9316f.firebaseio.com/cocktails.json'
        ).subscribe((cocktails: Cocktail[]) => {
            this.cocktails.next(cocktails);
        });
    }

    getCocktail(index: number): Observable<Cocktail> {
        return this.cocktails.pipe(
            filter((cocktails: Cocktail[]) => cocktails !== null),
            map((cocktails: Cocktail[]) => cocktails[index])
        );
        // return this.cocktails.value[index];
    }

    removeCocktail(index: number): void {
        const cocktails = this.cocktails.value.slice();

        cocktails.splice(index, 1);

        this.cocktails.next(cocktails);
        this.save();
    }

    addCocktail(cocktail: Cocktail): void {
        const cocktails = this.cocktails.value.slice();
        cocktails.push(
            new Cocktail(
                cocktail.name,
                cocktail.img,
                cocktail.desc,
                cocktail.ingredients.map(
                    ingredient => new Ingredient(
                        ingredient.name,
                        ingredient.quantity
                    )
                )
            )
        );
        this.cocktails.next(cocktails);
        this.save();
    }


    updateCocktail(cocktail: Cocktail, index: number): void {

        const cocktails = this.cocktails.value.slice();
        cocktails[index] =
            new Cocktail(
                cocktail.name,
                cocktail.img,
                cocktail.desc,
                cocktail.ingredients.map(
                    ingredient => new Ingredient(
                        ingredient.name,
                        ingredient.quantity
                    )
                )
            );

        this.cocktails.next(cocktails);
        this.save();
    }

    save(): void {
        this.http.put('https://cocktails-9316f.firebaseio.com/cocktails.json', this.cocktails.value).subscribe();
    }


}


// [
//     new Cocktail(
//         'Mojito',
//         'https://www.destinationcocktails.fr/wp-content/uploads/recipes/214_mojito.jpg',
//         'Le mojito1, prononcé [moˈxito] en espagnol, ou mojito, morito, ou mohito en français, est un cocktail traditionnel de la cuisine cubaine et de la culture de Cuba, ' +
//         'à base de rhum, de soda, de citron vert, et de feuilles de menthe fraîche. Inspiré du mint julep, et variante des Ti-punch des Antilles, Daïquiri, et Cuba libre, il est né ' +
//         'à Cuba dans les Caraïbes dans les années 1910 (dont il est à ce jour un des emblèmes exotiques international).',
//         [
//             new Ingredient('Perrier', 1),
//             new Ingredient('citron', 2),
//             new Ingredient('sucre', 3)
//         ]
//     ),
//     new Cocktail(
//         'Margarita',
//         'http://s3-eu-west-1.amazonaws.com/jamieoliverprod/_int/rdb2/upload/1198_1_1403268483_lrg.jpg',
//         'La Margarita est un cocktail à base de tequila, inventé par des Américains au Mexique. ' +
//         'C\'est un before lunch qui serait une version du cocktail daisy (qui signifie « marguerite » en français, ' +
//         '« margarita » en espagnol) dans lequel on remplaça le brandy par de la téquila1 durant la prohibition, période ' +
//         'où les Américains ouvrirent des bars au Mexique et au Canada dans les zones frontalières2,3.',
//         [
//             new Ingredient('Vodka', 1),
//             new Ingredient('Menthe', 3),
//             new Ingredient('Aubergine', 2)
//         ]
//     ),
//     new Cocktail(
//         'Sour',
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/A_whiskey_sour_in_the_hand.jpg/220px-A_whiskey_sour_in_the_hand.jpg',
//         'A sour is a traditional family of mixed drinks. Common examples of sours are the margarita and the sidecar. Sours belong to one' +
//         ' of the old families of original cocktails and are described by Jerry Thomas in his 1862 book How to Mix Drinks.' +
//         'Sours are mixed drinks containing a base liquor, lemon or lime juice, and a sweetener (triple sec, simple syrup, grenadine, or pine' +
//         'apple juice are common).[2] Egg whites are also included in some sours.',
//         [
//             new Ingredient('Rhum', 2),
//             new Ingredient('Malibu', 1),
//             new Ingredient('sucre', 5)
//         ]
//     )
// ]
