import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAvisoComponent } from './ver-aviso.component';

describe('VerAvisoComponent', () => {
  let component: VerAvisoComponent;
  let fixture: ComponentFixture<VerAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerAvisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
