import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})

export class ConversorComponent implements OnInit {

  moedasList: Moeda[] = []

  // Classe para consumir arquivos externos de http - uma API
  constructor() {

  }

  ngOnInit(): void {
    
  }

  calcular() {
    alert("Usando o Event Binding")
  }

}
