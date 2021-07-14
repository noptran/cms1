import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSettingComponentsComponent } from './admin-setting-components.component';

describe('AdminSettingComponentsComponent', () => {
  let component: AdminSettingComponentsComponent;
  let fixture: ComponentFixture<AdminSettingComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSettingComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSettingComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
