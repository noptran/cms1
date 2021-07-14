import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FosterCareComponent } from './foster-care.component';

describe('FosterCareComponent', () => {
  let component: FosterCareComponent;
  let fixture: ComponentFixture<FosterCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FosterCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FosterCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
