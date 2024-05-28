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
  valor?: number

  // Classe para consumir arquivos externos de http - uma API
  constructor(private service: AwesomeApiService) {

  }

  ngOnInit(): void {
   this.service.getMoedas().subscribe((moedas: Moeda[]) => {
    this.moedasList = moedas
   })

   this.setDefaultValues()
  }

  setDefaultValues() {
    this.moedaOrigem = {
      codigo: 'USD',
      descricao: 'Dólar Americano'
    }
    
    this.moedaDestino = {
      codigo: 'BRL',
      descricao: 'Real Brasileiro'
    }

    this.valor = 1
  }

  compareMoedaFn(m1: Moeda, m2: Moeda): boolean {
    return m1 && m2 && m1.codigo === m2.codigo
  }

  calcular() {
    console.log(`moedaOrigem: ${JSON.stringify(this.moedaOrigem)}`)
    console.log(`moedaDestino: ${JSON.stringify(this.moedaDestino)}`)
    console.log(`valor: ${this.valor}`)

    if (this.moedaOrigem && this.moedaDestino) {
      this.service.getCotacao(this.moedaOrigem, this.moedaDestino).subscribe(value => {
        console.log(value)
      })
    }
  }

}
