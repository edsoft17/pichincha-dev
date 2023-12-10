import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _modal$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  emitProducts(data: boolean): void {
    this._modal$.next(data);
  }

  getModalObs$(): Observable<boolean> {
    return this._modal$.asObservable();
  }
}
