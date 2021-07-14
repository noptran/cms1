import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EPDSComponent } from './epds.component';

describe('EPDSComponent', () => {
  let component: EPDSComponent;
  let fixture: ComponentFixture<EPDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EPDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EPDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
