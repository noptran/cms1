import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanBeHealthyComponent } from './kan-be-healthy.component';

describe('KanBeHealthyComponent', () => {
  let component: KanBeHealthyComponent;
  let fixture: ComponentFixture<KanBeHealthyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanBeHealthyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanBeHealthyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
