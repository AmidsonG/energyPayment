import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editarPerfil();
  }

  editarPerfil(){
    this.router.navigateByUrl('/editar-perfil')
  }

}
