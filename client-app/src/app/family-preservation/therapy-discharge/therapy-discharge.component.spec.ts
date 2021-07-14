import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyDischargeComponent } from './therapy-discharge.component';

describe('TherapyDischargeComponent', () => {
  let component: TherapyDischargeComponent;
  let fixture: ComponentFixture<TherapyDischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyDischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
