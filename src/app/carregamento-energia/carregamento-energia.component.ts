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
    // Recupera o valor do campo de input
    const inputValue = event.target.value;
    
    // Verifica se o valor contém apenas números
    if (/[^0-9]/.test(inputValue)) { // Se houver algo que não seja número
      Swal.fire('Erro', 'Digite apenas números', 'error'); // Exibe a mensagem de erro
      // Remove tudo que não for número
      this.carregaEnergia = inputValue.replace(/\D/g, ''); 
    } else {
      // Se for um número válido, apenas atualiza o modelo com o valor atual
      this.carregaEnergia = inputValue;
    }
  }
}
