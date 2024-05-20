import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ConversorComponent } from "./conversor/conversor.component"

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, ConversorComponent]
})
export class AppComponent {
  title = 'lo-conversor-de-moedas.app';
}
