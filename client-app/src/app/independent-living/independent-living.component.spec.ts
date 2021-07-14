import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentLivingComponent } from './independent-living.component';

describe('IndependentLivingComponent', () => {
  let component: IndependentLivingComponent;
  let fixture: ComponentFixture<IndependentLivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentLivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentLivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
