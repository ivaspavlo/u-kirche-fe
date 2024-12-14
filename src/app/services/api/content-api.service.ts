import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@env/environment';
import { IContent } from '@app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ContentApiService {
    readonly #http: HttpClient = inject(HttpClient);

    public getContent(): Observable<IContent> {
        return this.#http.get<IContent>(`${API_URL}/content`);
    }
}
