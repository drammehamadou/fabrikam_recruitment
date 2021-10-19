import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-library-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses = [
    {
      id:1,
      name: 'course-1',
      icon: 'icon-1'
    },
    {
      id:1,
      name: 'course-2',
      icon: 'icon-2'
    },
    {
      id:1,
      name: 'course-3',
      icon: 'icon-3'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
