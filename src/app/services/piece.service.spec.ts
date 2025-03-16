import { TestBed } from '@angular/core/testing';

import { PieceService } from './piece.service';

describe('PieceService', () => {
  let piece: PieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    piece = TestBed.inject(PieceService);
  });

  it('should be created', () => {
    expect(piece).toBeTruthy();
  });
});
