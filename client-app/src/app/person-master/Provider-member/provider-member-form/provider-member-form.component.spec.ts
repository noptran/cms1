import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMemberFormComponent } from './provider-member-form.component';

describe('ProviderMemberFormComponent', () => {
  let component: ProviderMemberFormComponent;
  let fixture: ComponentFixture<ProviderMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
