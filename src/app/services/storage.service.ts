import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    #platformId: object = inject(PLATFORM_ID);

    public getItem(key: string): string | null {
        return isPlatformBrowser(this.#platformId) ? localStorage.getItem(key) : null;
    }

    public setItem(key: string, value: string): void {
        if (isPlatformBrowser(this.#platformId)) {
            localStorage.setItem(key, value);
        }
    }

    public removeItem(key: string): void {
        if (isPlatformBrowser(this.#platformId)) {
            localStorage.removeItem(key);
        }
    }
}
