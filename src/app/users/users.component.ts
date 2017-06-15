import {
  Component,
  OnInit
} from '@angular/core'
import { MdDialog, MdDialogRef } from '@angular/material'
import { Http } from '@angular/http'
import config from '../../config'
import { IUser } from './user.interface'
import { UserEditComponent } from './user-edit.component'
const template = require('./users.html')

@Component({
  selector: 'users',
  template
})
export class UsersComponent implements OnInit {
  dialogRef: MdDialogRef<UserEditComponent> = null
  users: Array<IUser> = null
  filteredUsers: Array<IUser> = []
  // VehSchPOC : BrokenFunc2 : Filter not working : SC00367807 : 13Jun17
  filter = {
    firstName: '',lastName: ''
  }

  constructor(
    private dialog: MdDialog,
    private http: Http
  ) {

  }

  /**
   * Initializes collection
   */
  ngOnInit() {
    this.http
      .get(`${config.apiUrl}/users`)
      .subscribe(response => {
        this.users = response.json()
        this.filteredUsers = this.users
      })
  }

  /**
   * Filters the users collection
   */
  filterUsers() {
    const fieldNames = Object.keys(this.filter)
    // VehSchPOC : BrokenFunc2 : Filter not working : SC00367807 : 13Jun17
    if (this.filter.firstName != null && this.filter.firstName != ''){
    	this.filteredUsers = this.users.filter(user => user.firstName.toLowerCase().match(this.filter.firstName.toLowerCase()))
    } else if (this.filter.lastName != null && this.filter.lastName != null){
    	this.filteredUsers = this.users.filter(user => user.lastName.toLowerCase().match(this.filter.lastName.toLowerCase()))
    } else {
    	alert('TBD')
    }
  }
  
  /**
   * Opens an edit dialog
   * @param user The user object which has been selected to edit
   */
  editUser(user: IUser) {
    this.dialogRef = this.dialog.open(UserEditComponent)
    // VehSchPOC : BrokenFunc4 : Edit User not working : SC00367807 : 13Jun17
    this.dialogRef.componentInstance.user = user
    // VehSchPOC : NewFunc3 : Update User : SC00367807 : 15Jun17 
    this.dialogRef.afterClosed().subscribe((result: string) => {this.ngOnInit();});
  }
  
  /**
   * Opens a delete confirm page and upon confirmation deletes user 
   * @param user The user object which has been selected to edit
   * VehSchPOC : NewFunc6 : Delete User : SC00367807 : 14Jun17
   */
  deleteUser(user: IUser) {
   let val = confirm('Are you sure to delete this user?')   
   if (val) {
   	this.http.delete(`${config.apiUrl}/users/` + user.id) .subscribe(response => {this.ngOnInit()});
   }   
  }
  
}