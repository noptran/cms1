import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyReleaseChangeStatusComponent } from './permanency-release-change-status.component';

describe('PermanencyReleaseChangeStatusComponent', () => {
  let component: PermanencyReleaseChangeStatusComponent;
  let fixture: ComponentFixture<PermanencyReleaseChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyReleaseChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyReleaseChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
