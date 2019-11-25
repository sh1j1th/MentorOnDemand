import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss']
})
export class ListCoursesComponent implements OnInit {

  mentorEmail = localStorage.getItem('email');
  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.listCourses();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableData;
  displayedColumns = [];
  dataSource;
  listCourses = function () {
    var mentorEmail = this.mentorEmail;
    console.log(mentorEmail);
    this.http.get("https://localhost:44319/mentorservice/myCourses/"+mentorEmail).subscribe(
      (result: any[]) => {
        this.tableData = result;

      },
      (error) => {
        alert("Error occured, check whether Backend is running!");
        console.log(error)
      }
    )
  }

}
