import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ProductService } from './product.service';
import { IProduct } from 'src/app/shared/interfaces/IProduct';

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  const urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); //verifica
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get products from mock service', () => {
    const products: IProduct[] = [{
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

    service.getProducts().subscribe( (data: IProduct[]) => {
      expect(data.length).toBe(2);
    });

    const req = httpController.expectOne(urlBase); //creamos una variable y obtenemos un request
    req.flush(products); //reemplazamos la información por el mockData
    expect(req.request.method).toBe("GET");
  });

  it('save product from observable', () => {
    const productMock: IProduct = {
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.saveProduct(productMock).subscribe( (data: IProduct) => {
      expect(data).toBe(2);
    });

    const req = httpController.expectOne(urlBase);
    req.flush(productMock);
    expect(req.request.method).toBe("POST");
  });

  it('update product from observable', () => {
    const productMock: IProduct = {
      id: 'none',
      name: 'Tarjeta de credito',
      logo: 'none',
      description: 'none',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.editProduct(productMock).subscribe( (data: IProduct) => {
      expect(data).toBe(2);
    });

    const req = httpController.expectOne(urlBase);
    req.flush(productMock);
    expect(req.request.method).toBe("PUT");
  });
});
