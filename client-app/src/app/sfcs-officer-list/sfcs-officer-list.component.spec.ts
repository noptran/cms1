import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcsOfficerListComponent } from './sfcs-officer-list.component';

describe('SfcsOfficerListComponent', () => {
  let component: SfcsOfficerListComponent;
  let fixture: ComponentFixture<SfcsOfficerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcsOfficerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcsOfficerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
