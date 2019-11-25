import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingCoursesStudentComponent } from './ongoing-courses-student.component';

describe('OngoingCoursesStudentComponent', () => {
  let component: OngoingCoursesStudentComponent;
  let fixture: ComponentFixture<OngoingCoursesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingCoursesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingCoursesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
