import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {User} from '../shared/user';
import {UserFormService} from '../shared/user-form.service';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, CommonModule, UserFormComponent],
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.css']
})
export class UserAddFormComponent {

  form: FormGroup = this.formService.formGroup;

  constructor(public dialogRef: MatDialogRef<void, User>,
              private readonly formService: UserFormService) {
  }

  onSubmit(): void {
    const value = this.form.value;
    this.dialogRef.close({
      id: undefined,
      name: value.name,
      website: value.website,
      email: value.email,
      username: value.username,
    } as User);
    this.formService.formGroup.reset();
  }

}
