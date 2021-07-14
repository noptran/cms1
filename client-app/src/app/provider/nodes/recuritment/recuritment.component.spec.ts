import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuritmentComponent } from './recuritment.component';

describe('RecuritmentComponent', () => {
  let component: RecuritmentComponent;
  let fixture: ComponentFixture<RecuritmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuritmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuritmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
