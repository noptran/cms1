import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessRightsComponentsComponent } from './access-rights-components.component';

describe('AccessRightsComponentsComponent', () => {
  let component: AccessRightsComponentsComponent;
  let fixture: ComponentFixture<AccessRightsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessRightsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessRightsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
