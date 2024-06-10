import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { FormsModule } from '@angular/forms';
import { style } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';

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
  valor: number = 0
  resultado?: number
  valorCotacao: number = 0
  dataCotacao: string = ''

  // variavel de controle para quando o loading deve ou não aparecer
  loading: boolean = false

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

  currencyFormat(value: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.moedaDestino?.codigo,
      maximumFractionDigits: 4
    }).format(value)
  }

  calcular() {
    if (this.moedaOrigem && this.moedaDestino && this.valor > 0) {
      this.loading = true
      this.service.getCotacao(this.moedaOrigem, this.moedaDestino).subscribe(cotacao => {
        // Realizar o calculo da cotação
        this.resultado = this.valor * cotacao.getValor()
        this.valorCotacao = cotacao.getValor()
        this.dataCotacao = Intl.DateTimeFormat('pt-BR').format(cotacao.createDate!)
        this.loading = false
      })
    }
  }

}
