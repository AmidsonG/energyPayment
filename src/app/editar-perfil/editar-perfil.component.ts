import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {
  focus: any;
  focus1: any;
  focus5: any;

  userData: any;

  nome?: string;
  sobrenome?: string;
  nif?: string;
  telefone?: number;
  endereco?: string;
  password?: string;
  email?: string;
  numeroDeConta?: number | null; // Permitir que seja null
  numeroDeContador?: number | null; // Permitir que seja null
  CameraAdicionado?: boolean;
  erroAoAdicionarCamera?: boolean;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const user = localStorage.getItem('user');
    this.userData = JSON.parse(String(user));
  }

  ngOnInit(): void {
    this.preencherCampos();
  }

  preencherCampos() {
    // Preenche os campos com os dados do usuário existentes
    if (this.userData) {
      this.nome = this.userData.nome || '';
      this.sobrenome = this.userData.sobrenome || '';
      this.nif = this.userData.nif || '';
      this.telefone = this.userData.telefone || null;
      this.endereco = this.userData.endereco || '';
      this.email = this.userData.email || '';
      this.numeroDeConta = this.userData.numero_de_conta
        ? Number(this.userData.numero_de_conta)
        : null;
      this.numeroDeContador = this.userData.numero_do_contador
        ? Number(this.userData.numero_do_contador)
        : null;
      this.password = this.userData.password || ''; // Senha será incluída no payload, mas não exibida no formulário
    }
  }

  actualizarPerfil() {
    const params = {
      nome: this.nome,
      sobrenome: this.sobrenome,
      nif: this.nif,
      telefone: this.telefone,
      endereco: this.endereco,
      email: this.email,
      numero_de_conta: this.numeroDeConta,
      numero_do_contador: this.numeroDeContador,
      password: this.password
    };

    this.userService.updateUser(this.userData.id, params).subscribe(
      (response) => {
        Swal.fire('Sucesso', 'Carregado com Sucesso', 'success');
        this.CameraAdicionado = true;
        this.erroAoAdicionarCamera = false;
      },
      (error) => {
        Swal.fire('Erro', 'Digite apenas números', 'error');
        this.CameraAdicionado = false;
        this.erroAoAdicionarCamera = true;
      }
    );
  }
}
