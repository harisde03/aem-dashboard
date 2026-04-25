import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users = [
    { firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { firstName: 'Jacob', lastName: 'Throton', username: '@fat' },
    { firstName: 'Larry', lastName: 'theBird', username: '@twitter' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
