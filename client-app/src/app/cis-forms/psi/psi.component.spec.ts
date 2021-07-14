import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsiComponent } from './psi.component';

describe('PsiComponent', () => {
  let component: PsiComponent;
  let fixture: ComponentFixture<PsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
