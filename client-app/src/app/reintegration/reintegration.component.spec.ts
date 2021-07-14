import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReintegrationComponent } from './reintegration.component';

describe('ReintegrationComponent', () => {
  let component: ReintegrationComponent;
  let fixture: ComponentFixture<ReintegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReintegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReintegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
