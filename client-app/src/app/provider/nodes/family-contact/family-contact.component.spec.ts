import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyContactComponent } from './family-contact.component';

describe('FamilyContactComponent', () => {
  let component: FamilyContactComponent;
  let fixture: ComponentFixture<FamilyContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
