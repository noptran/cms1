import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataConfigurationComponent } from './metadata-configuration.component';

describe('MetadataConfigurationComponent', () => {
  let component: MetadataConfigurationComponent;
  let fixture: ComponentFixture<MetadataConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
