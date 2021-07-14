import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaternalPaternalVersionComponent } from './maternal-paternal-version.component';

describe('MaternalPaternalVersionComponent', () => {
  let component: MaternalPaternalVersionComponent;
  let fixture: ComponentFixture<MaternalPaternalVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaternalPaternalVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaternalPaternalVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
