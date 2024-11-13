import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  constructor(private authService:AuthServiceService){

  }
 
  
}
