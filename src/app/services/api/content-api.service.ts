import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ContentApiService {
    #http: HttpClient = inject(HttpClient);

    public getContent(): Observable<any> {
        return this.#http.get<any>(`${API_URL}/content`);
    }
}
