import { TestBed } from '@angular/core/testing';

import { CadastrarPorteiroService } from './cadastrar-porteiro.service';

describe('CadastrarPorteiroService', () => {
  let service: CadastrarPorteiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarPorteiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
