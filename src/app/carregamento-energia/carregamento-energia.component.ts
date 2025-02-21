import { Component, OnInit } from '@angular/core';
import { CarregarEnergiaService } from '../services/carregar-energia.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carregamento-energia',
  templateUrl: './carregamento-energia.component.html',
  styleUrls: ['./carregamento-energia.component.scss']
})
export class CarregamentoEnergiaComponent implements OnInit {
  userData: any;
  carregaEnergia: any ;
  recargas: any;
  CameraAdicionado: boolean = false;
  erroAoAdicionarCamera: boolean = false;

  constructor( private carregarEnergiaService: CarregarEnergiaService) {
    const user = localStorage.getItem('user');
		this.userData = JSON.parse(String(user));
  }

  ngOnInit(): void {
    this.getTotalRecargas();
  }

  carregarEneria(){
    if (isNaN(this.carregaEnergia)) {
      Swal.fire('Erro', 'Digite apenas números', 'error');
      return;  // Evita enviar a requisição caso não seja um número
    }

    const params = {
      id_do_usuario: this.userData.id,
      codigo_da_recarga: this.carregaEnergia,
    }
    this.carregarEnergiaService.carregarEnergia(params).subscribe(
      (response) => {
        Swal.fire('Sucesso', 'Carregado com Sucesso', 'success');
        this.CameraAdicionado = true;
          this.erroAoAdicionarCamera = false;
      },
      (error) => {
        Swal.fire('Erro', 'Digite o apenas números', 'error');
        this.CameraAdicionado = false;
        this.erroAoAdicionarCamera = true;
      }
    );
  }

  getTotalRecargas(){
    this.carregarEnergiaService.totalDeRecargas(this.userData.id).subscribe({
      next:(res:any) =>{
        this.recargas = res;
      }
    })
  }

  validateNumberInput(event: any) {
    // Permite apenas números no input
    this.carregaEnergia = event.target.value.replace(/\D/g, '');
  }
}
