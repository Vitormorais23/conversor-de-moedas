import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AwesomeApiService {

  constructor(private http: HttpClient) { }

  getMoedas(): Observable<Moeda[]> {
    return this.http.get('https://economia.awesomeapi.com.br/json/available/uniq')
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
}
