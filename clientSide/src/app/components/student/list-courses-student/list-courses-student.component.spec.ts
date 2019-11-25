import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursesStudentComponent } from './list-courses-student.component';

describe('ListCoursesStudentComponent', () => {
  let component: ListCoursesStudentComponent;
  let fixture: ComponentFixture<ListCoursesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoursesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoursesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
