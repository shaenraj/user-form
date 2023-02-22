import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UserAddFormComponent } from '../user-add-form/user-add-form.component';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../shared/user';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  imports: [MatTableModule, ReactiveFormsModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  displayedColumns: string[] = ['name', 'username', 'website', 'email', 'actions'];
  dataSource: User[] = [];
  constructor(private readonly userService: UserService,
    private readonly dialog: MatDialog) {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource = users;
    });
  }

  setUserList() {
    this.dataSource = this.userService.userList;
  }

  onDelete(user: User): void {
    this.userService.deleteUser(user).subscribe(this.setUserList.bind(this));
  }

  onAdd(): void {
    this.dialog.open<UserAddFormComponent>(UserAddFormComponent)
    .afterClosed()
    .subscribe((user: User) => this.userService.addUser(user).subscribe(this.setUserList.bind(this)));
  }

  onEdit(user: User): void {
    this.dialog.open<UserEditFormComponent>(UserEditFormComponent, {
      data: user
    })
    .afterClosed()
    .subscribe((user: User) => this.userService.editUser(user).subscribe(this.setUserList.bind(this)));
  }

}
