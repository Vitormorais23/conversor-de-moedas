import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ConversorComponent } from "./components/conversor/conversor.component"
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent]
})
export class AppComponent implements OnInit{

    pathUrl: string = 'conversor'

    constructor(private router: Router) {

    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.pathUrl = event.url.replace('/', '')
            }
        })
    }
}
