import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  focus: any;
  focus1:any;

  user = {
    email: '',
    password: '',
  };
  constructor(private userService: UserServiceService, private router: Router, private snackBar: MatSnackBar) { 
    
  }
  ngOnInit() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.redirectToUserPage(userData);
    }
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

    login(): void {
      // Validar campos obrigatórios
      if (!this.user.email || !this.user.password) {
        Swal.fire('Erro', 'Email e senha são campos obrigatórios.', 'error');
        return;
      }
  
      this.userService.login(this.user).pipe(
        catchError((error) => {
          if (error.status === 400 && error.error.senha) {
            // Senha incorreta
            this.openSnackBar('Erro', 'Senha incorreta. Por favor, verifique sua senha e tente novamente.', 'error');
          } else if (error.error.email) {
            // E-mail incorreto
            this.openSnackBar('Erro', 'E-mail incorreto. Por favor, verifique seu Email e tente novamente.', 'error');
          }
          return error;
        })
      ).subscribe(response => {
        // Armazenar o token no localStorage
        localStorage.setItem('token', response.key);
        // Redirecionar para a página apropriada com base nos dados do usuário
        localStorage.setItem('user', JSON.stringify({ ...response.usuario_data}));
        localStorage.setItem('idUuser', response.usuario_data.tipo_de_entidade_id);
        this.redirectToUserPage(response.usuario_data);
      });
    }
  

  private redirectToUserPage(userData: any): void {
    this.router.navigate([userData.rota]);
  }

}
