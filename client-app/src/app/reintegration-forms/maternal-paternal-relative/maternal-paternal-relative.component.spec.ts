import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalPaternalRelativeComponent } from './maternal-paternal-relative.component';

describe('MaternalPaternalRelativeComponent', () => {
  let component: MaternalPaternalRelativeComponent;
  let fixture: ComponentFixture<MaternalPaternalRelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternalPaternalRelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternalPaternalRelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
