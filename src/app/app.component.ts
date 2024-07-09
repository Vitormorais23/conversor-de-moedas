import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent implements OnInit{

    rota: string = 'conversor'

    constructor(private router: Router) {
        // Usado para capturar quando se altera a rota - ex: de /coversor para /cotacoes
    }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const pathUrl = event.url.replace('/', '')
                if (pathUrl.length > 0) {
                    this.rota = pathUrl
                }
            }
        })
    }
}
