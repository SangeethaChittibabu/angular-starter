import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from '@angular/core'
import { IUser } from './user.interface'
//VehSchPOC : BrokenFunc4 : Edit User not working : SC00367807 : 13Jun17
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import config from '../../config'
//VehSchPOC : NewFunc3 : Update User : SC00367807 : 15Jun17
import { MdDialog, MdDialogRef } from '@angular/material'

@Component({
  selector: 'user-edit',
  template: require('./user-edit.html')
})

// VehSchPOC : BrokenFunc4 : Edit User not working : SC00367807 : 13Jun17
export class UserEditComponent {
  @Input() user: IUser
 
  constructor (public dialogRef: MdDialogRef<UserEditComponent> ,private http: Http) {}
    
  //VehSchPOC : NewFunc3 : Update User : SC00367807 : 15Jun17
  update() {
	this.http.put(`${config.apiUrl}/users/`+this.user.id,this.user).subscribe(response => {this.dialogRef.close()});
  }
  
}
 
  