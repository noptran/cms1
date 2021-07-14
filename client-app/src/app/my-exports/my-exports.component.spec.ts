import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExportsComponent } from './my-exports.component';

describe('MyExportsComponent', () => {
  let component: MyExportsComponent;
  let fixture: ComponentFixture<MyExportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyExportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
