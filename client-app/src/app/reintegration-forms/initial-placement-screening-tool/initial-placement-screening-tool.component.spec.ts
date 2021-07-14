import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPlacementScreeningToolComponent } from './initial-placement-screening-tool.component';

describe('InitialPlacementScreeningToolComponent', () => {
  let component: InitialPlacementScreeningToolComponent;
  let fixture: ComponentFixture<InitialPlacementScreeningToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialPlacementScreeningToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPlacementScreeningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
