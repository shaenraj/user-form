import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UserFormService {

    formGroup: FormGroup<UserForm> = new FormGroup<UserForm>({
        name: new FormControl('shaenraj',
            { nonNullable: true, validators: [ Validators.required ] }
        ),
        website: new FormControl('', { nonNullable: true }),
        username: new FormControl('yeerekar', { nonNullable: true, validators: [ Validators.required ] }),
        email: new FormControl('', Validators.email),
    });

}

export interface UserForm {
    name: FormControl<string>,
    website: FormControl<string>,
    username: FormControl<string | null>,
    email: FormControl<string | null>,
}

