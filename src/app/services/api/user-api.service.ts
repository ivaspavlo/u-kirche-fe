import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IUser } from '@app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    #http: HttpClient = inject(HttpClient);

    public getUser(): Observable<IUser> {
        return this.#http.get<IUser>(`${API_URL}/user`);
    }
}
