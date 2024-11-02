import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { from, Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { ILoginReq, IRegisterReq } from '@app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  #http: HttpClient = inject(HttpClient);

  constructor() { }

  public login({ email, password }: ILoginReq): Observable<any> {
    return from(signInWithEmailAndPassword(getAuth(), email, password));
  }

  public register(req: IRegisterReq): Observable<any> {
    return this.#http.post<unknown>(`${API_URL}/account`, req);
  }
}
