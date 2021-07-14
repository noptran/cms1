import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeFormComponent } from './judge-form.component';

describe('JudgeFormComponent', () => {
  let component: JudgeFormComponent;
  let fixture: ComponentFixture<JudgeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
