import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { PModalComponent } from './components/p-modal/p-modal.component';
import { PTableComponent } from './components/p-table/p-table.component';
import { PButtonComponent } from './components/p-button/p-button.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    PModalComponent,
    PTableComponent,
    PButtonComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
