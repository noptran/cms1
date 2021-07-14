import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagecwfComponent } from './homepagecwf.component';

describe('HomepagecwfComponent', () => {
  let component: HomepagecwfComponent;
  let fixture: ComponentFixture<HomepagecwfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagecwfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagecwfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
