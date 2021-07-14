import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClientGradeProgressionComponent } from "./client-grade-progression.component";

fdescribe("ClientGradeProgressionComponent", () => {
  let component: ClientGradeProgressionComponent;
  let fixture: ComponentFixture<ClientGradeProgressionComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ClientGradeProgressionComponent],
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientGradeProgressionComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ClientGradeProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit("should render a title in p tag", () => {
    const fixture = TestBed.createComponent(ClientGradeProgressionComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("p").textContent).toContain(
      "client-grade-progression works!"
    );
  });
  afterEach(() => {
    fixture.destroy();
  });
});
