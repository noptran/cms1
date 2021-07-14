import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveAndPermanencyComponent } from './move-and-permanency.component';

describe('MoveAndPermanencyComponent', () => {
  let component: MoveAndPermanencyComponent;
  let fixture: ComponentFixture<MoveAndPermanencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveAndPermanencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveAndPermanencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
