import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMoradorComponent } from './menu-morador.component';

describe('MenuMoradorComponent', () => {
  let component: MenuMoradorComponent;
  let fixture: ComponentFixture<MenuMoradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuMoradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMoradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
