import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PButtonComponent } from '../../components/p-button/p-button.component';
import { PTableComponent } from '../../components/p-table/p-table.component';
import { of } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent, PButtonComponent, PTableComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filter product per name', () => {
    component.products = [{
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: 'none',
      name: 'Tarjeta de debito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    }];

    component.filterProducts('Tarjeta de debito');

    expect(component.productsFilter[0].name).toEqual('Tarjeta de debito');
  });
  
  it('filter product without name', () => {
    component.products = [{
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: 'none',
      name: 'Tarjeta de debito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    }];

    component.filterProducts('');

    expect(component.productsFilter.length).toBe(2);
  });

  it('modalStatus is false', () => {
    const product: IProduct = {
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    };

    component.deleteProduct(product);
    
    expect(component.modalStatus).toBe(true);
    expect(component.productDeleted).toBe(product);
  });

  /* getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.productsFilter = this.products.slice();
      }
    });
  } */
  it('get product from subscription', () => {
    const productsMock: IProduct[] = [{
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    },
    {
      id: 'none',
      name: 'Tarjeta de debito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    }];
    const productService = TestBed.inject(ProductService);
    const spy = jest.spyOn(productService,'getProducts').mockReturnValueOnce(of(productsMock))
    
    component.getProducts();

    expect(component.productsFilter.length).toBe(2);
    expect(component.products).toBe(productsMock);
  });
});
