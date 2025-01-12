import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { immediateProvider } from 'rxjs/internal/scheduler/immediateProvider';
import { ProductServiceService } from '../../services/product-service.service';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart } from '../../models/cart';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';
import { Product } from '../../models/product';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../services/toast-service.service';
import { CreditCardServiceService } from '../../services/credit-card-service.service';
import { CreditCard } from '../../models/credit-card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderServiceService } from '../../services/order-service.service';
import { Order } from '../../models/order';
import { PaymentServiceService } from '../../services/payment-service.service';
import { Payment } from '../../models/payment';
import { ProductImageServiceService } from '../../services/product-image-service.service';
import { ProductImage } from '../../models/productImage';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit {

  products: Product[] = [];
  productImages:ProductImage[] = [];
  imageApi: string = "https://localhost:7209/images/"
  creditCards: CreditCard[] = [];
  checkedCreditCard: CreditCard
  currentCart: Cart;
  carts: Cart[] = [];
  currentCustomer: User;
  currentCustomerName = localStorage.getItem("customerName") || "";
  isShowPaymentScreen = false;
  totalPrice: number = 0;
  order: Order;
  payment: Payment
  creditCardIdForm: FormGroup
  productCount:number[] = [];
  i:number = 0;


  constructor(private productService: ProductServiceService,
    private cartService: CartServiceService,
    private userService: UserServiceService,
    private toastService: ToastService,
    private creditCardService: CreditCardServiceService,
    private formBuilder: FormBuilder,
    private orderService: OrderServiceService,
    private paymentService: PaymentServiceService,
    private productImageService:ProductImageServiceService
  ) {

  }
  ngOnInit(): void {
    this.setCurrentCustomer();
    this.getProducts();
    this.createCreditCardIdForm();
    console.log(this.isShowPaymentScreen);
  }
  getAllImages() {
    this.productImageService.getAllImages().subscribe(response => {
      this.productImages = response.data;
      console.log(this.productImages);
    })
  }
  getImagePath(product: Product) {
    console.log('Product:', product);
    const productImage = this.productImages?.find(p => product.id === p.productId);
    console.log('Product Image:', productImage);

    if (productImage && productImage.imagePath) {
        return this.imageApi + productImage.imagePath;
    }

    return 'path/to/default/image.png';
}

  addProductToCart(product: Product) {
    this.currentCart.products.forEach(p => {
      if (p === product) {
        this.toastService.showToast("Ürün zaten ekli");
      }
      else {
        this.currentCart.products.push(product);
        console.log(this.currentCart.products);
      }
    })
  }
  calculateProductCounts() {
    this.productCount = this.currentCart.products.map(() => 1);
  }
  increaseProductCount(index:number){
    if(this.productCount[index] <= this.products[index].stockQuantity){
      this.productCount[index] ++;
    }
  }
  decreaseProductCount(productId:Number,index:number){
    if(this.productCount[index] != 1 ){
      this.productCount[index] --;
    }
    else{
      this.deleteProductFromCart(this.currentCart.id,this.currentCart.products[index]);
    }
  }
  deleteProductFromCart(cartId:number,product:Product){
    this.cartService.deleteProductFromCart(cartId,product).subscribe(response => {
      this.toastService.showToast(response.message);
      this.setCurrentCart();
    }, error =>{
      this.toastService.showToast(error.message);
    })

  }
  getProducts() {
    this.productService.getAllProducts().subscribe(response => {
      this.products = response.data;
      this.getAllImages();
    })
  }
  getCreditCards() {
    this.creditCardService.getWhereCreditCard(this.currentCustomer.id).subscribe(response => {
      this.creditCards = response.data;
    })
  }
  createCreditCardIdForm() {
    this.creditCardIdForm = this.formBuilder.group({
      creditCardId: ["", Validators.required]
    })
  }
  setCurrentCart() {
    this.cartService.getWhereCart(this.currentCustomer.id).subscribe(response => {
      this.currentCart = response.data[0];
      console.log(this.currentCart);
      this.calculateProductCounts();
    })
  }

  setCurrentCustomer() {
    this.userService.getWhereUser(this.currentCustomerName).subscribe(response => {
      this.currentCustomer = response.data[0];
      this.setCurrentCart();
      this.getCreditCards();
    })
  }
  showPaymentScreen() {
    this.isShowPaymentScreen = true;
    this.calculateTotalPrice();
  }
  closePaymentScreen() {
    this.isShowPaymentScreen = false;
    this.totalPrice = 0;
  }
  calculateTotalPrice() {
    this.totalPrice = 0; // Toplamı sıfırla
    this.currentCart.products.forEach((product, index) => {
      let newPrice = this.productCount[index] * product.price;
      console.log(this.productCount[index] + " " + product.price);
      console.log(newPrice);
      this.totalPrice += newPrice;
    });
  }
  
  createOrder() {
    if (!this.order) {
      this.order = {} as Order; // Initialize the order object if it's undefined
    }
    if (!this.currentCustomer) {
      console.log("Kullanıcı adresi bulunamadı.");
      return;
    }
    this.order.address = "bam";
    this.order.totalAmount = this.totalPrice;
    this.order.userId = this.currentCustomer.id;
    this.order.products = this.currentCart.products;
    console.log(JSON.stringify(this.order));
  }

  finishPayment() {
    if (this.creditCardIdForm.valid) {
      const creditCardId = Number(this.creditCardIdForm.get("creditCardId")?.value);
      if (isNaN(creditCardId)) {
        console.error("Geçersiz kredi kartı ID'si");
        this.toastService.showToast("Geçersiz kredi kartı ID'si");
        return;
      }

      this.creditCards.forEach(creditCard => {
        if (creditCard.id === creditCardId) {
          this.checkedCreditCard = creditCard;
        }
      })

      if (!this.checkedCreditCard) {
        console.error("Kredi kartı bulunamadı.");
        this.toastService.showToast("Kredi kartı bulunamadı.");
        return;
      }

      if (this.checkedCreditCard.creditAmount < this.totalPrice) {
        console.error("Yetersiz bakiye.");
        this.toastService.showToast("Kredi kartı bakiyesi yetersiz.");
        return;
      }

      this.checkedCreditCard.creditAmount -= this.totalPrice;

      this.createOrder();

      console.log("Sipariş oluşturuldu:", this.order);

      this.orderService.addOrder(this.order).subscribe(
        response => {
          this.toastService.showToast(response.message);

          this.creditCardService.updateCreditCard(this.checkedCreditCard).subscribe(
            updateResponse => {
              this.toastService.showToast(updateResponse.message);
            },
            updateError => {
              console.error("Kredi kartı güncelleme hatası:", updateError);
              this.toastService.showToast(updateError.message);
            }
          );
        },
        error => {
          console.error("Sipariş ekleme hatası:", error);
          this.toastService.showToast(error.message);
        }
      );
    } else {
      console.error("Kredi kartı formu geçersiz.");
      this.toastService.showToast("Kredi kartı formu geçersiz.");
    }
  }
}
