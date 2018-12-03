import {Component, OnInit} from '@angular/core';
import {CocktailService} from '../shared/services/cocktail.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-cocktail-container',
    templateUrl: './cocktail-container.component.html',
    styleUrls: ['./cocktail-container.component.css']
})
export class CocktailContainerComponent implements OnInit {

    public Titre: string;


    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {


    }


}
