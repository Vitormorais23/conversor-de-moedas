import { Injectable } from '@angular/core';
import { Moeda } from '../models/moeda.model';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  moedaOrigem?: Moeda
  moedaDestino?: Moeda

  constructor() { }

  setMoedas(moedaOrigem: Moeda, moedaDestino: Moeda) {
    this.moedaOrigem = moedaOrigem
    this.moedaDestino = moedaDestino
  }
}
