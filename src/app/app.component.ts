import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  title = 'energyPayment';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoggedIn = this.router.url === '/carregamento';
    });
  }
}
