import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogCreateTechComponent } from './admin-dialog-create-tech.component';

describe('AdminDialogCreateTechComponent', () => {
  let component: AdminDialogCreateTechComponent;
  let fixture: ComponentFixture<AdminDialogCreateTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDialogCreateTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDialogCreateTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
