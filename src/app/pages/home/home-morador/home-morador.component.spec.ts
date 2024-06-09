import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMoradorComponent } from './home-morador.component';

describe('HomeMoradorComponent', () => {
  let component: HomeMoradorComponent;
  let fixture: ComponentFixture<HomeMoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeMoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
