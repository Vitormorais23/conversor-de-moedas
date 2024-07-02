import { Component, OnInit } from '@angular/core';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { Cotacao } from '../../models/cotacao.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css'
})
export class CotacoesComponent implements OnInit {

  cotacoes: Cotacao[] = []

  constructor(private apiService: AwesomeApiService) {

  }

  ngOnInit(): void {
    this.apiService.getCotacoes().subscribe((cotacoe$: Cotacao[]) => {
      this.cotacoes = cotacoe$
    })
  }


}
