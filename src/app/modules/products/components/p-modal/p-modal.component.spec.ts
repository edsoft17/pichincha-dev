import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PModalComponent } from './p-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { PButtonComponent } from '../p-button/p-button.component';

describe('PModalComponent', () => {
  let component: PModalComponent;
  let fixture: ComponentFixture<PModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PModalComponent, PButtonComponent ],
      imports: [HttpClientTestingModule],
      providers: [ProductService, ModalService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
