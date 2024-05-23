import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})

export class ConversorComponent implements OnInit {

  moedasList: {codigo: string, descricao: string}[] = [] 
  
  // Classe para consumir arquivos externos de http - uma API
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('https://economia.awesomeapi.com.br/json/available/uniq').subscribe((_moedas: any) => {
      console.log(_moedas)
      Object.keys(_moedas).forEach(key => {
        this.moedasList.push({
          codigo: key,
          descricao: _moedas[key]
        })
      })
      console.log(this.moedasList)
    })
  }

  calcular() {
    alert("Usando o Event Binding")
  }

}
