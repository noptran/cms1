import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanTraffickingChildWelfareComponent } from './human-trafficking-child-welfare.component';

describe('HumanTraffickingChildWelfareComponent', () => {
  let component: HumanTraffickingChildWelfareComponent;
  let fixture: ComponentFixture<HumanTraffickingChildWelfareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanTraffickingChildWelfareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanTraffickingChildWelfareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
