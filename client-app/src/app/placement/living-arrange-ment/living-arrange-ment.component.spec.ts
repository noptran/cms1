import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivingArrangeMentComponent } from './living-arrange-ment.component';

describe('LivingArrangeMentComponent', () => {
  let component: LivingArrangeMentComponent;
  let fixture: ComponentFixture<LivingArrangeMentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivingArrangeMentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingArrangeMentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
