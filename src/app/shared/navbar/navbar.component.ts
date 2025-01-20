import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  public isCollapsed = true;
  private lastPoppedUrl: string | undefined;
  private yScrollStack: number[] = [];

  constructor(public location: Location, private router: Router,  private userService: UserServiceService) {
  }

  logout(): void {
    this.userService.logout();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          const scrollPosition = this.yScrollStack.pop() ?? 0;
          window.scrollTo(0, scrollPosition);
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });


     // Verifica o token no localStorage
     const token = localStorage.getItem('token');
     this.isLoggedIn = !!token;
 
     // Atualiza o estado de login com base na navegação
     this.router.events.subscribe(() => {
       this.isLoggedIn = this.router.url === '/carregamento';
     });
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '#/home') {
      return true;
    }
    else {
      return false;
    }
  }
  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === '#/documentation') {
      return true;
    }
    else {
      return false;
    }
  }
}
