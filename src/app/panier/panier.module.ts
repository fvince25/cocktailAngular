import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IngredientsListComponent} from './ingredients-list/ingredients-list.component';
import {PanierComponent} from './panier.component';
import {panierRouting} from './panier.routing';

@NgModule({
    imports: [
        CommonModule,
        panierRouting
    ],
    declarations: [PanierComponent, IngredientsListComponent
    ]
})

export class PanierModule {
}