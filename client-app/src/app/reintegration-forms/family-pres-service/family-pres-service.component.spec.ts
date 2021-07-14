import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPresServiceComponent } from './family-pres-service.component';

describe('FamilyPresServiceComponent', () => {
  let component: FamilyPresServiceComponent;
  let fixture: ComponentFixture<FamilyPresServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyPresServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyPresServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
