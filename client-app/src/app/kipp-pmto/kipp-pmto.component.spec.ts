import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KippPMTOComponent } from './kipp-pmto.component';

describe('KippPMTOComponent', () => {
  let component: KippPMTOComponent;
  let fixture: ComponentFixture<KippPMTOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KippPMTOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KippPMTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
