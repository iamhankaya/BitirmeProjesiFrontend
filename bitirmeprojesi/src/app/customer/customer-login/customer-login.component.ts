import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;

  ngAfterViewInit() {
    // ViewChild öğesi burada erişilebilir
    if (this.container) {
      // İlk kez erişim sağlandı
    }
  }

  panelActive() {
    console.log(this.container);
    if (this.container) {
      this.container.nativeElement.classList.add("right-panel-active");
    }
  }

  panelDeactive() {
    if (this.container) {
      this.container.nativeElement.classList.remove("right-panel-active");
    }
  }
}
