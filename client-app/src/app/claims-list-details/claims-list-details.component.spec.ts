import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsListDetailsComponent } from './claims-list-details.component';

describe('ClaimsListDetailsComponent', () => {
  let component: ClaimsListDetailsComponent;
  let fixture: ComponentFixture<ClaimsListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimsListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
