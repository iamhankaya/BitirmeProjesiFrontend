import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { NgIf } from '@angular/common';
import { CategoryServiceService } from '../../services/category-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer-navbar.component.html',
  styleUrl: './customer-navbar.component.css'
})
export class CustomerNavbarComponent implements OnInit {
  isAuth: Boolean;
  fileName: string
  selectedFile: File | null = null;
  uploadSuccess: boolean = false;
  
  currentUserName = localStorage.getItem("customerName");
  constructor(private authService: AuthServiceService,
    private categoryService:CategoryServiceService,
    private router:Router
  ) {

  }
  ngOnInit(): void {
    this.authService.isLogin$.subscribe(loginStatus => {
      this.authService.customerNameSubject$.subscribe(customerName => {
        this.currentUserName = customerName;
      })
      this.isAuth = loginStatus;
      console.log(this.isAuth);
    })


  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.uploadSuccess = false; // Yeni dosya seçildiğinde başarı mesajını temizle
      console.log('Seçilen Dosya:', this.fileName);
  }
}
  onFileUpload(event:Event){
    event.preventDefault();
    this.categoryService.searchCategoryWithFile(this.fileName).subscribe(response => {
      this.router.navigate(["/category/"+response])
    });
  }
  logout() {
    this.authService.logout();
  }
}
