import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private _userSubject = new BehaviorSubject<any>(null);
  user$ = this._userSubject.asObservable();

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {  
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      this._userSubject.next(userData);
    }
  }


  showMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
    });
  }

  private handleLoginResponse(response: any): void {
    this._userSubject.next(response);
    this.storeUserData(response);
  }

  private handleError(error: any, errorMessage: string): Observable<never> {
    Swal.fire('Erro', errorMessage, 'error');
    this.logout();
    return throwError(error);
  }

  private storeUserData(response: any): void {
    localStorage.setItem('token', response.key);
    localStorage.setItem('user', JSON.stringify(response.usuario_data));
    localStorage.setItem('idUser', response.usuario_data.id);
  }

  create(user: User): Observable<any> {
    if (!user.email || !user.password) {
      return throwError('Email e senha são campos obrigatórios.');
    }
    return this.http.post(`${environment.API_URL}usuario/`, user).pipe(
      catchError(error => {
        let errorMessage = 'Erro ao criar usuário.';
        if (error.error && error.error.email) {
          errorMessage = error.error.email[0]; 
        }
        return this.handleError(error, errorMessage);
      })
    );
  }



  // Fazer login com usuário
  login(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.API_URL}login/`, user, { headers }).pipe(
      tap(response => this.handleLoginResponse(response)),
    );
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    this._userSubject.next(null);
    this.router.navigate(['/login']);
  }




  forgotPassword(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.API_URL}/email-redefinir-palavra-passe/`, user, { headers })
    .pipe(
      catchError(error => {
        if (error.error.email && error.error.email[0] === "Este email não está registrado no banco de dados.") {
          Swal.fire('Erro', 'Este email não está registrado.', 'error');
        } else {
          Swal.fire('Erro', 'Ocorreu um erro ao recuperar a senha. Por favor, tente novamente mais tarde.', 'error');
        }
        return throwError(error);
      })
    );
  }

  resetPassword(uidb64: string, token: string, newPassword: string, confirmPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const payload = {
      uidb64: uidb64,
      token: token,
      password1: newPassword,
      password2: confirmPassword
    };

    return this.http.put(`${environment.API_URL}/repor-password/`, payload, { headers })
    .pipe(
      catchError(error => {
        Swal.fire('Erro', 'Ocorreu um erro ao redefinir a senha.', 'error');
        return throwError(error);
      })
    );
}

  Usuario(usuarioId: number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}usuario/${usuarioId}/`).pipe(
      catchError(error => {
        // Tratar o erro conforme necessário, por exemplo:
        console.error('Ocorreu um erro ao obter os dados do usuário:', error);
        return throwError(error);
      })
    );
  }

  updateUser(id: number, user: any){
    return this.http.put(`${environment.API_URL}usuario/${id}/`, user);
  }

}
