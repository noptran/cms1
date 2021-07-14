import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcfFormComponent } from './dcf-form.component';

describe('DcfFormComponent', () => {
  let component: DcfFormComponent;
  let fixture: ComponentFixture<DcfFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcfFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
