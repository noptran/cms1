import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderMemberComponent } from './provider-member.component';

describe('ProviderMemberComponent', () => {
  let component: ProviderMemberComponent;
  let fixture: ComponentFixture<ProviderMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
