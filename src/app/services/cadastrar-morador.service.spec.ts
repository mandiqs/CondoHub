import { TestBed } from '@angular/core/testing';

import { CadastrarMoradorService } from './cadastrar-morador.service';

describe('CadastrarMoradorService', () => {
  let service: CadastrarMoradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarMoradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
