import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyComponent } from './permanency.component';

describe('PermanencyComponent', () => {
  let component: PermanencyComponent;
  let fixture: ComponentFixture<PermanencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
