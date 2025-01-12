import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipePipe } from '../../pipes/product-filter-pipe.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { Cart } from '../../models/cart';
import { ToastService } from '../../services/toast-service.service';
import { ProductImageServiceService } from '../../services/product-image-service.service';
import { ProductImage } from '../../models/productImage';
@Component({
  selector: 'app-customer-product',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ProductFilterPipePipe],
  templateUrl: './customer-product.component.html',
  styleUrl: './customer-product.component.css'
})
export class CustomerProductComponent implements OnInit, OnChanges {
  product1!: Product;
  product2!: Product;
  product3!: Product;
  products: Product[] = [];
  productsPlaceHolder: Product[] = [this.product1, this.product2, this.product3];
  filterText: string = "";
  isLoading = false;
  currentCustomer: User;
  currenCategoryId: number
  currentCart: Cart;
  currentCustomerName = localStorage.getItem("customerName") || "";
  productImages: ProductImage[] = [];
  productImagesWhere:ProductImage | undefined;
  imageApi: string = "https://localhost:7209/images/"

  constructor(private productService: ProductServiceService,
    private router: Router,
    private cartService: CartServiceService,
    private userService: UserServiceService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private productImageService: ProductImageServiceService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.currenCategoryId = Number(params["categoryId"]);
      console.log(this.currenCategoryId);
      if (this.currenCategoryId) {
        this.getWhereProducts(this.currenCategoryId);
      }
      else {
        this.getAllProducts();
      }
    })
    this.setCurrentCustomer();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes[this.activatedRoute.children.length]) {
      console.log("değişti");
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      response => {
        this.products = response.data;
        this.isLoading = true;
        this.getAllImages();
      },
      error => {
        this.toastService.showToast(error.message);
      }
    )
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


  getWhereProducts(categoryId: Number) {
    this.productService.getWhereProduct(categoryId).subscribe(response => {
      this.products = response.data;
      this.isLoading = true;
    })
  }
  showProductDetail(productId: Number) {
    this.router.navigate(['/product-detail', productId]);
  }

  setCurrentCart() {
    this.cartService.getWhereCart(this.currentCustomer.id).subscribe(response => {
      this.currentCart = response.data[0];
      console.log(this.currentCart);
    })
  }

  setCurrentCustomer() {
    this.userService.getWhereUser(this.currentCustomerName).subscribe(response => {
      this.currentCustomer = response.data[0];
      console.log("burada");
      this.setCurrentCart();
    }, error => {
      console.log()
    })
  }
  addProductToCart(product: Product) {
    let productExist = false;
    this.currentCart.products.forEach(p => {
      if (product.id === p.id) {
        productExist = true;
        this.toastService.showToast("Ürün zaten ekli");
        return;
      }
    })
    if (productExist == false) {
      this.currentCart.products.push(product);
      console.log(this.currentCart);
      this.cartService.addProductToCart(this.currentCart.id, product).subscribe(result => {
        this.toastService.showToast(result.message);
        this.setCurrentCart();
      })
    }
  }
  showToast(message: string) {
    this.toastService.showToast(message);
  }
}

