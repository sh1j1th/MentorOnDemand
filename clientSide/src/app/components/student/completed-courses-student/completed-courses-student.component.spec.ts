import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCoursesStudentComponent } from './completed-courses-student.component';

describe('CompletedCoursesStudentComponent', () => {
  let component: CompletedCoursesStudentComponent;
  let fixture: ComponentFixture<CompletedCoursesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedCoursesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedCoursesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
