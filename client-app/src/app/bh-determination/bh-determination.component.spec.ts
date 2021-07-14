import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhDeterminationComponent } from './bh-determination.component';

describe('BhDeterminationComponent', () => {
  let component: BhDeterminationComponent;
  let fixture: ComponentFixture<BhDeterminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhDeterminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhDeterminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
