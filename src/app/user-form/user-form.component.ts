import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {UserForm} from '../shared/user-form.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input()
  form!: FormGroup<UserForm>;

  @Output()
  submitted = new EventEmitter<void>();

  onSubmit(): void {
    this.submitted.emit();
  }

}
