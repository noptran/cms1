import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReintegretionFosterCareAdoptionComponent } from './reintegretion-foster-care-adoption.component';

describe('ReintegretionFosterCareAdoptionComponent', () => {
  let component: ReintegretionFosterCareAdoptionComponent;
  let fixture: ComponentFixture<ReintegretionFosterCareAdoptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReintegretionFosterCareAdoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReintegretionFosterCareAdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
