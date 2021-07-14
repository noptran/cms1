import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisMembersFpFormComponent } from './fis-members-fp-form.component';

describe('FisMembersFpFormComponent', () => {
  let component: FisMembersFpFormComponent;
  let fixture: ComponentFixture<FisMembersFpFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisMembersFpFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisMembersFpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
