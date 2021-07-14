import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFactsComponent } from './modify-facts.component';

describe('ModifyFactsComponent', () => {
  let component: ModifyFactsComponent;
  let fixture: ComponentFixture<ModifyFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
