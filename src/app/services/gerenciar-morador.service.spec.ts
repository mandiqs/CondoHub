import { TestBed } from '@angular/core/testing';

import { GerenciarMoradorService } from './gerenciar-morador.service';

describe('GerenciarMoradorService', () => {
  let service: GerenciarMoradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciarMoradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
