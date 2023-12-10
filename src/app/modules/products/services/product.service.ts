import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, lastValueFrom, map, of, pipe } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
  private _productObs$ = new BehaviorSubject<IProduct[] | null>(null);

  constructor(private _http: HttpClient) { }

  emitProducts(data: IProduct[] | null): void {
    this._productObs$.next(data);
  }

  getProductObs$(): Observable<IProduct[] | null> {
      return this._productObs$.asObservable();
  }

  async verificationProduct(idProduct: string): Promise<boolean> {
    const url = `${this._urlBase}/verification`;
    const params = new HttpParams().append("id", idProduct);

    return await lastValueFrom(this._http.get<boolean>(url, { params }));
  }

  getProducts(): Observable<IProduct[]>{
    return this._http.get<IProduct[]>(this._urlBase);
  }

  async saveProductVerification(product: IProduct): Promise<IProduct | null> {
    const existProduct = await this.verificationProduct(product.id);
    
    if(existProduct) return null; 

    return await lastValueFrom(this.saveProduct(product));
  }

  saveProduct(product: IProduct): Observable<IProduct>{
    return this._http.post<IProduct>(this._urlBase,product);
  }

  editProduct(product: IProduct): Observable<IProduct>{
    return this._http.put<IProduct>(this._urlBase, product);
  }

  deleteProduct(idProduct: string): Observable<any>{
    const params = new HttpParams().append("id", idProduct);

    return this._http.delete<any>(this._urlBase,{ params });
  }
}
