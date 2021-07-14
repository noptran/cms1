import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsnActivityLogComponent } from './ssn-activity-log.component';

describe('SsnActivityLogComponent', () => {
  let component: SsnActivityLogComponent;
  let fixture: ComponentFixture<SsnActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsnActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsnActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
