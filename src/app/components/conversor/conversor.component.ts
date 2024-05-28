import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})

export class ConversorComponent implements OnInit {

  moedasList: Moeda[] = []

  moedaOrigem?: Moeda
  moedaDestino?: Moeda
  valor?: Moeda

  // Classe para consumir arquivos externos de http - uma API
  constructor(private service: AwesomeApiService) {

  }

  ngOnInit(): void {
   this.service.getMoedas().subscribe((moedas: Moeda[]) => {
    this.moedasList = moedas
   })
  }

  calcular() {
    console.log(`moedaOrigem: ${JSON.stringify(this.moedaOrigem)}`)
    console.log(`moedaDestino: ${JSON.stringify(this.moedaDestino)}`)
    console.log(`valor: ${this.valor}`)
  }

}
