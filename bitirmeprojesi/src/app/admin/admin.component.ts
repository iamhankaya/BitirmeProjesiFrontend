import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from "./components/admin-footer/footer.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent, AdminFooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
