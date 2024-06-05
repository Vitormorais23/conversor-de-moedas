import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';
import { Observable, map } from 'rxjs';
import { Cotacao } from '../models/cotacao.model';

@Injectable({
  providedIn: 'root'
})

export class AwesomeApiService {

  private URL_API = 'https://economia.awesomeapi.com.br'

  constructor(private http: HttpClient) { }

  getMoedas(): Observable<Moeda[]> {
    return this.http.get(`${this.URL_API}/json/available/uniq`)
      .pipe(
        map((_moedas: any) => {
          return Object.keys(_moedas).map(key => {
            return {
              codigo: key,
              descricao: _moedas[key]
            }
          })
        })
      );
  }

  getCotacao(moedaOrigem: Moeda, moedaDestino: Moeda): Observable<Cotacao>  {
    return this.http.get(`${this.URL_API}/last/${moedaOrigem.codigo}-${moedaDestino.codigo}`)
    .pipe(
      map((value: any) => {
        let firstKey = Object.keys(value).shift()
        return new Cotacao(value[firstKey!])
      })
    )
  }
}
