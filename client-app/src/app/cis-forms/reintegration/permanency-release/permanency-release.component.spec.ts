import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanencyReleaseComponent } from './permanency-release.component';

describe('PermanencyReleaseComponent', () => {
  let component: PermanencyReleaseComponent;
  let fixture: ComponentFixture<PermanencyReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanencyReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanencyReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
