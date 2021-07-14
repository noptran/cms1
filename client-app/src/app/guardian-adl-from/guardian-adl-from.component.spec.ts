import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianAdlFromComponent } from './guardian-adl-from.component';

describe('GuardianAdlFromComponent', () => {
  let component: GuardianAdlFromComponent;
  let fixture: ComponentFixture<GuardianAdlFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardianAdlFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianAdlFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
