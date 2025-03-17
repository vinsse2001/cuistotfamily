import { TestBed } from '@angular/core/testing';

import { IngredientsCourantsService } from './ingredients-courants.service';

describe('IngredientsCourantsService', () => {
  let service: IngredientsCourantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsCourantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
