import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMoradorComponent } from './gerenciar-morador.component';

describe('GerenciarMoradorComponent', () => {
  let component: GerenciarMoradorComponent;
  let fixture: ComponentFixture<GerenciarMoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GerenciarMoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciarMoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
