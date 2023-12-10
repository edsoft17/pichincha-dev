import { TestBed } from '@angular/core/testing';

import { HeadersHttpInterceptor } from './headers-http.interceptor';

describe('HeadersHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeadersHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeadersHttpInterceptor = TestBed.inject(HeadersHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
