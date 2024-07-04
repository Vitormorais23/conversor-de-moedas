import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';

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
  constructor(private service: AwesomeApiService, private sharedDataService: SharedDataService) {

  }

  ngOnInit(): void {
    // Carregar usando o pipe async
   this.service.getMoedas().subscribe((moedas: Moeda[]) => {
    this.moedasList = moedas
   })

  //  this.activatedRoute.queryParams.subscribe(params => {
  //   console.log(params)
  //  }) Posso fazer por QueryParameters porem fica mais complexo

   console.log(this.sharedDataService.moedaOrigem)
   console.log(this.sharedDataService.moedaDestino)

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

  private resetarResultado() {
    this.resultado = undefined
  }

  onMoedaChange() {
    this.resetarResultado()
  }

  switchMoedas() {
    let moedaAuxiliar = this.moedaOrigem
    this.moedaOrigem = this.moedaDestino
    this.moedaDestino = moedaAuxiliar
    this.resetarResultado()
  }

  calcular() {
    if (this.moedaOrigem && this.moedaDestino && this.valor > 0) {
      this.loading = true
      this.resetarResultado()
      this.service.getCotacao(this.moedaOrigem, this.moedaDestino).subscribe({
        next: cotacao => {
          // Realizar o calculo da cotação
          this.resultado = this.valor * cotacao.getValor()
          this.valorCotacao = cotacao.getValor()
          this.dataCotacao = Intl.DateTimeFormat('pt-BR').format(cotacao.createDate!)
          this.loading = false
        },
        error: (err) => {
          console.log(JSON.stringify(err))
          alert("Não foi possivel realizar a conversão!")
          this.loading = false
        }
      })
    }
  }

}
