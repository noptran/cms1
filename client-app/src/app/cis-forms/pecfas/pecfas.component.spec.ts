import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PecfasComponent } from './pecfas.component';

describe('PecfasComponent', () => {
  let component: PecfasComponent;
  let fixture: ComponentFixture<PecfasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PecfasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PecfasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
