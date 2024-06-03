import { TestBed } from '@angular/core/testing';

import { CadastrarAvisoService } from './cadastrar-aviso.service';

describe('CadastrarAvisoService', () => {
  let service: CadastrarAvisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarAvisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
