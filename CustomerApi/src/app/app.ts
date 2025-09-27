import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header-component/header-component';
import { SidebarComponent } from './layout/sidebar-component/sidebar-component';
import { FooterComponent } from './layout/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, SidebarComponent,FooterComponent],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('CustomerApi');
}
