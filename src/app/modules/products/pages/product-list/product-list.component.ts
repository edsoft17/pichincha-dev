import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ModalService } from '../../services/modal.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  modalStatus!: boolean;
  productDeleted!: IProduct;

  products: IProduct[] = [];
  productsFilter: IProduct[] = [];
  searchObs = new Subject<string>();

  
  constructor(
    private _router: Router,
    private _modalService: ModalService,
    private _productService: ProductService
  ){}

  ngOnInit(): void{
    this._modalService.getModalObs$().subscribe( value => {
      this.modalStatus = value;
    });
    this.getProducts();
    this.searchObs.pipe(debounceTime(500)).subscribe(value => {
      this.filterProducts(value);
    })
  }

  getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.productsFilter = this.products.slice();
      }
    });
  }

  searchProduct(value: string): void {
    this.searchObs.next(value);
  }

  filterProducts(value: string): void {
    if(value.length === 0){
      this.productsFilter = this.products.slice();
      return;
    } 
    
    this.productsFilter = this.products.filter(product => product.name === value);
  }

  editProduct(idProduct: string): void {
    this._productService.emitProducts(this.products);
    this.goToDetail(idProduct);
  }

  deleteProduct(product: IProduct): void {
    this.modalStatus = true;
    this.productDeleted = product;
  }

  goToDetail(idProduct?: string): void {
    if(idProduct)
      this._router.navigate(['/products/detail',idProduct])
    else
      this._router.navigate(['/products/detail'])
  }

}
