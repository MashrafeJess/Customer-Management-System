import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './layout/header-component/header-component';
import { SidebarComponent } from './layout/sidebar-component/sidebar-component';
import { FooterComponent } from './layout/footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,               // ✅ fixed here
    HeaderComponent,
    SidebarComponent,    // ✅ only once
    FooterComponent
  ],
  templateUrl: './app.html',
  styles: []
})
export class App {
  protected readonly title = signal('CustomerApi');
  isPrintPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide sidebar/footer on print page
        this.isPrintPage = event.urlAfterRedirects.includes('/print');
      }
    });
  }
}
