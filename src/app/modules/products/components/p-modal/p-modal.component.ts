import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'p-modal',
  templateUrl: './p-modal.component.html',
  styleUrls: ['./p-modal.component.css']
})
export class PModalComponent implements OnInit {
  
  @Input() product!: IProduct;

  constructor(
    private _productService: ProductService,
    private _modalService: ModalService
  ){}

  ngOnInit(): void {
  }

  closeModal(): void {
    this._modalService.emitProducts(false);
  }

  deleteProduct(): void {
    this._productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.closeModal();
      }
    });
  }
}
