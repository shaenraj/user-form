import {Component, Inject, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {User} from '../shared/user';
import {UserForm, UserFormService} from '../shared/user-form.service';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, CommonModule, UserFormComponent],
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  form: FormGroup<UserForm> = this.formService.formGroup;

  constructor(private readonly dialogRef: MatDialogRef<UserEditFormComponent, User>,
              private readonly formService: UserFormService,
              @Inject(DIALOG_DATA) private readonly user: User) {
  }

  ngOnInit(): void {
    this.loadInitialValue(this.user);
  }

  onSubmit(): void {
    const value = this.form.value;
    this.dialogRef.close({
      id: this.user.id,
      name: value.name,
      website: value.website,
      email: value.email,
      username: value.username,
    } as User);
    this.formService.formGroup.reset();
  }

  private loadInitialValue(user: User): void {
    this.formService.formGroup.setValue({
      name: user.name,
      website: user.website,
      email: user.email,
      username: user.username,
    });
  }
}
