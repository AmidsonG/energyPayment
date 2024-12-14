import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { User } from '../user/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  test : Date = new Date();
  focus:any;
  focus1:any;
  focus2:any;

  user: User = {
    nome: '',
    sobrenome: '',
    endereco: '',
    telefone: '',
    email: '',
    password: '',
    nif: '',
    tipo_de_usuario:0
  };

  constructor(private userService: UserServiceService, private router: Router,  private snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
  }
     // Método para exibir a Snackbar
    openSnackBar(title: string, message: string, panelClass: string): void {
      this.snackBar.open(message, title, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: [panelClass]
      });
    }

     // Criar usuários
  criarUser(UserForm: NgForm): void {
    // Verificar se email e senha estão preenchidos
    if (!this.user.email || !this.user.password) {
        Swal.fire('Erro', 'Email e senha são campos obrigatórios.', 'error');
        return;
    }

      // Verificar se o telefone tem 9 dígitos
      if (this.user.telefone.length !== 9) {
        Swal.fire('Erro', 'O telefone deve ter exatamente 9 dígitos.', 'error');
        return;
    }

     // Verificar se o NIF tem 14 dígitos
     if (this.user.nif.length !== 14) {
      Swal.fire('Erro', 'O NIF deve ter exatamente 14 dígitos.', 'error');
      return;
  }

    this.userService.create(this.user).subscribe(
        response => {
            Swal.fire('Usuario registrado com sucesso', response.message, 'success');
            // Redirecionar o usuário para a tela de login apenas se o usuário for criado com sucesso
            this.router.navigate(['/login']);
        },
        error => {
            if (error.error && error.error.email && error.error.email[0] === 'usuario with this email already exists.') {
                this.openSnackBar('Erro', 'Já existe um usuário com este e-mail.', 'error');
            } else {
                Swal.fire('Erro', 'Ocorreu um erro ao criar o usuário.', 'error');
            }
        }
    );
  }

}
