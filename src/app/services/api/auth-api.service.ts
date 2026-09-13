import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IRegisterReq, IUser } from '@app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    #http: HttpClient = inject(HttpClient);

    public register(req: IRegisterReq): Observable<IUser> {
        return this.#http.post<{ users: IUser }>(`${API_URL}/user`, req).pipe(map((response) => response.users));
    }
}
