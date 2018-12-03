import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ActiveDirective} from './shared/directives/active.directive';
import {AppRouting} from './app.routing';
import {PanierService} from './shared/services/panier.service';
// import coctail container module.
import {CocktailModule} from './cocktail-container/cockail.module';
// import PanierModule
import { PanierModule} from './panier/panier.module';
// import header module.
import {SharedModule} from './shared/modules/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        ActiveDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRouting,
        CocktailModule,
        PanierModule,
        SharedModule
    ],
    providers: [PanierService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
