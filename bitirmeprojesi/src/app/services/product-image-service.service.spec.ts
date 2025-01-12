import { TestBed } from '@angular/core/testing';

import { ProductImageServiceService } from './product-image-service.service';

describe('ProductImageServiceService', () => {
  let service: ProductImageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductImageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
