import { filenames, UserService } from './user.service';
import { User } from './user';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-component',
  styleUrls: ['./../css/app-component.css'],
  templateUrl: './../html/app-component.html',
  providers: [UserService]
})

export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['First name', 'Last name', 'Email'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  users: User[] = [];
  exportExcelUsers: Function;
  exportEmail: Function;
  usersSortByEmail: Function;
  createEmailToExport: Function;
  

  constructor(private userService: UserService){
    this.exportExcelUsers = this.userService.exportExcelUsers; 
    this.exportEmail = this.userService.exportEmail;
    this.usersSortByEmail = this.userService.usersSortByEmail;
    this.createEmailToExport = this.userService.createEmailToExport;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.getUsers().subscribe(
      response => {
        this.users = response;  
        this.userService.users = this.users;
        this.dataSource.data = this.users;   
      })  
  }
}