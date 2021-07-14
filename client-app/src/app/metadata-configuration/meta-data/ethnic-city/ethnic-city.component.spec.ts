import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicCityComponent } from './ethnic-city.component';

describe('EthnicCityComponent', () => {
  let component: EthnicCityComponent;
  let fixture: ComponentFixture<EthnicCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthnicCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthnicCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
