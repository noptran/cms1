import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentChildInteractionComponent } from './parent-child-interaction.component';

describe('ParentChildInteractionComponent', () => {
  let component: ParentChildInteractionComponent;
  let fixture: ComponentFixture<ParentChildInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentChildInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentChildInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
