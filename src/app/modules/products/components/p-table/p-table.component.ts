import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

@Component({
  selector: 'p-table',
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css']
})
export class PTableComponent {

  @Output() eventEdit: EventEmitter<string> = new EventEmitter<string>();
  @Output() eventDelete: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Input() products!: IProduct[];

  editProduct(id: string): void {
    this.eventEdit.emit(id);
  }

  deleteProduct(product: IProduct): void {
    this.eventDelete.emit(product);
  }

}
