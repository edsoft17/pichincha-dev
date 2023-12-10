import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/common/custom-validators';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  formProduct!: FormGroup;

    product!: IProduct | null;
    idProduct!: string;

  constructor(
    private _router: Router,
    private _routeActive: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this._routeActive.params.subscribe( params => this.idProduct = params['id']);
    this._productService.getProductObs$().subscribe( products => {
      const data = products?.find( product => product.id === this.idProduct);
      if(data) this.product = data;
    });
    this.initForm();
  }

  initForm() {
    this.formProduct = this._formBuilder.group({
      id: [(this.product) ? this.product.id : '', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [(this.product) ? this.product.name : '', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: [(this.product) ? this.product.description : '', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [(this.product) ? this.product.logo : '', [Validators.required]],
      date_release: [(this.product) ? this.product.date_release : '', [Validators.required, CustomValidators.greatDateCurrent]],
      date_revision: [(this.product) ? this.product.date_revision : '', [Validators.required]]
    },{
      validator: CustomValidators.minDate('date_release','date_revision')
    });
  }

  sendRequest(): void {
    if(this.product) this.editProduct();
    else this.saveProduct();
  }

  async saveProduct(): Promise<void> {
    try{
      const products = await this._productService.saveProductVerification(this.formProduct.value);
      if(products) 
        this._router.navigate(['/products/list']);
    }catch{

    }
  }

  editProduct(): void {
    this._productService.editProduct(this.formProduct.value).subscribe({
      next: (data: IProduct) => {
        this._router.navigate(['/products/list'])
      }
    });
  }

  clearForm(): void {
    this.formProduct.reset();
  }
}
