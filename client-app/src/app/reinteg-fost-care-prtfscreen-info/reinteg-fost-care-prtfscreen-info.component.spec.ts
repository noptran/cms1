import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReintegFostCarePRTFscreenInfoComponent } from './reinteg-fost-care-prtfscreen-info.component';

describe('ReintegFostCarePRTFscreenInfoComponent', () => {
  let component: ReintegFostCarePRTFscreenInfoComponent;
  let fixture: ComponentFixture<ReintegFostCarePRTFscreenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReintegFostCarePRTFscreenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReintegFostCarePRTFscreenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
