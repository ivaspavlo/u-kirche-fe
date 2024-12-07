import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { ILoginReq, ILoginRes, IRegisterReq, IUser } from '@app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    #http: HttpClient = inject(HttpClient);

    public login({ email, password }: ILoginReq): Observable<any> {
        return this.#http.post<ILoginRes>(`${API_URL}/auth/login`, { email, password });
    }

    public register(req: IRegisterReq): Observable<IUser> {
        return this.#http.post<IUser>(`${API_URL}/account`, req);
    }
}
