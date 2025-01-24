import { Component, OnInit } from '@angular/core';
import { CarregarEnergiaService } from '../services/carregar-energia.service';

@Component({
  selector: 'app-carregamento-energia',
  templateUrl: './carregamento-energia.component.html',
  styleUrls: ['./carregamento-energia.component.scss']
})
export class CarregamentoEnergiaComponent implements OnInit {
  userData: any;
  carregaEnergia?: number ;
  recargas: any;

  constructor( private carregarEnergiaService: CarregarEnergiaService) {
    const user = localStorage.getItem('user');
		this.userData = JSON.parse(String(user));
  

  }

  ngOnInit(): void {
    this.getTotalRecargas();
  }

  carregarEneria(){
    const params = {
      id_do_usuario: this.userData.id,
      codigo_da_recarga: this.carregaEnergia,
    }
    this.carregarEnergiaService.carregarEnergia(params).subscribe();
  }

  getTotalRecargas(){
    this.carregarEnergiaService.totalDeRecargas(this.userData.id).subscribe({
      next:(res:any) =>{
        this.recargas = res;
      }
    })
  }

}
