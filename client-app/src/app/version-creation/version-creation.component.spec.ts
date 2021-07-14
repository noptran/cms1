import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionCreationComponent } from './version-creation.component';

describe('VersionCreationComponent', () => {
  let component: VersionCreationComponent;
  let fixture: ComponentFixture<VersionCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
