import { HttpClient, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

    private users: User[] = [];

    constructor(private readonly http: HttpClient) {
    }

    get userList() {
        return [...this.users];
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(map((res: User[]) =>{
            this.users = res;
            return this.users;
        }));
    }

    addUser(user: User): Observable<void>  {
        return this.http.post<User>('https://jsonplaceholder.typicode.com/users', user).pipe(map((res: User) =>{
            this.users = [...this.users, res];
            return;
        }));
    }

    editUser(user: User): Observable<void> {
        return this.http.put<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user).pipe(map((res: User) =>{
            this.users = this.users.map((it) =>
                (it.id == res.id) ? res : it
            );
            return;
        }));
    }

    deleteUser(user: User): Observable<void> {
        return this.http.delete<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`).pipe(map((res: User) =>{
            this.users = this.users.filter((it) => it.id !== user.id);
        }));
    }

}