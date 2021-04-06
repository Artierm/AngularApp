import { Email } from './email';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import * as XLSX from 'xlsx';

export const  filenames = {
  fileName :'ExcelSheet.xlsx',
  fileName2:'ExcelEmailSheet.xlsx'
  };

@Injectable()
export class UserService
{
  user:User;
  users: User[] = [];
  constructor(private http: HttpClient){}
  getUsers(page = 1, limit = 50)  {
    const requestUrl = `https://localhost:44366/api/User?Page=${page}&Limit=${limit}`;
    //const requestUrl = `https://localhost:5001/api/User?Page=${page}&Limit=${limit}`; for cmd
    //const requestUrl = `http://localhost:5000/api/User?Page=${page}&Limit=${limit}`; for cmd
    return  this.http.get <User[]>(requestUrl);
  }     
    
  //this method download excel file with three columns:"First name", "Last name" "Email".
  exportExcelUsers(): void {
  const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(this.users);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filenames.fileName);
  }

  usersSortByEmail(): void { 
  this.users.sort((t1, t2) => {
  const name1 = t1.firstName.toLowerCase();
  const name2 = t2.firstName.toLowerCase();
  if (name1 > name2) { return 1; }
  if (name1 < name2) { return -1; }
  return 0;
});
}

  createEmailToExport() : Email[] {
    let emails: Email[] = this.users;
    let emailsToExport: Email[] = [];
    emails.forEach(element => { 
      let email = new  Email(element.email);
      emailsToExport.push(email);     
    });
    return emailsToExport;
  }


 // this method download excel file with one column "Email"
  exportEmail():void{
    this.usersSortByEmail();
    let emails = this.createEmailToExport();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(emails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filenames.fileName2);
  }
}