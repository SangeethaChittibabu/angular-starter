import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input
} from '@angular/core'
import { IUser } from './user.interface'


@Component({
  selector: 'user-info',
  template: require('./user.html'),
  styleUrls: ['./user.scss']
})
export class UserComponent {
  @Input() user: IUser
  // VehSchPOC : BrokenFunc4 : Edit User not working : SC00367807 : 13Jun17
  @Output() onEdit  = new EventEmitter();
  //VehSchPOC : NewFunc6 : Delete User : SC00367807 : 14Jun17
  @Output() onDelete = new EventEmitter();

  //VehSchPOC : NewFunc2 : Display Age : SC00367807 : 14Jun17    
  public computeUserAge() {
     let dob = new Date(this.user.dob);
         if(dob){         
            var timeDiff = Math.abs(Date.now() - dob);
            return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        }
    }
}