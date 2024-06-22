import { Component, OnInit } from '@angular/core';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { Cotacao } from '../../models/cotacao.model';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css'
})
export class CotacoesComponent implements OnInit {

  constructor(private apiService: AwesomeApiService) {

  }

  ngOnInit(): void {
    this.apiService.getCotacoes().subscribe((cotacoes: Cotacao[]) => {
      console.log(cotacoes)
    })
  }
}
