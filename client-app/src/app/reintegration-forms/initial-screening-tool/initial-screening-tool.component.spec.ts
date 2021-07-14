import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialScreeningToolComponent } from './initial-screening-tool.component';

describe('InitialScreeningToolComponent', () => {
  let component: InitialScreeningToolComponent;
  let fixture: ComponentFixture<InitialScreeningToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialScreeningToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialScreeningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
