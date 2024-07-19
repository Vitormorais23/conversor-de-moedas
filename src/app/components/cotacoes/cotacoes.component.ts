import { Component, OnInit } from '@angular/core';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { Cotacao } from '../../models/cotacao.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css'
})
export class CotacoesComponent implements OnInit {

  cotacoes$: Observable<Cotacao[]> | undefined

  constructor(private apiService: AwesomeApiService, 
    private router: Router,
    private sharedDataService: SharedDataService 
  ) { }

  ngOnInit(): void {
    this.cotacoes$ = this.apiService.getCotacoes()
  
  }

  goToConversor(cotacao: Cotacao) {
    // Query Parameters
    // this.router.navigate(['/conversor'], {queryParams: {code: cotacao.code, codein: cotacao.codein}})
    let moedaOrigem$ = this.apiService.getMoeda(cotacao.code)
    let moedaDestino$ = this.apiService.getMoeda(cotacao.codein)

    forkJoin([moedaOrigem$, moedaDestino$]).subscribe((moedas) => {
      let moedaOrigem = moedas.shift()
      let moedaDestino = moedas.shift()
      if (moedaOrigem && moedaDestino) {
        this.sharedDataService.setMoedas(moedaOrigem, moedaDestino)
        this.router.navigate(['/conversor'])
      }
    }) 

  }

  getClassBy(variacao: number): string|null{
    if (variacao > 0) {
      return 'variacao-positiva'
    } else if (variacao < 0) {
      return 'variacao-negativa'
    } else {
      return null
    }
  
  }

}
