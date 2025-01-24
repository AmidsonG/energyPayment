import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarregarEnergiaService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) { }

  carregarEnergia(numeroRecarcaga: any){
    return this.http.post(`${environment.API_URL}carregar-recarga/`, numeroRecarcaga)
  }

  totalDeRecargas(idUser: number){
    return this.http.get(`${environment.API_URL}total-de-carregamentos-usuario/?usuario=${idUser}`)
  }

  
}
