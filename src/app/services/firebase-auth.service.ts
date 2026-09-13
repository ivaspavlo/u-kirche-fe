import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, connectAuthEmulator, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { defer, map, Observable, of } from 'rxjs';

import { FIREBASE_AUTH_EMULATOR_URL, FIREBASE_CONFIG } from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class FirebaseAuthService {
    readonly #platformId = inject(PLATFORM_ID);
    readonly #ngZone = inject(NgZone);
    readonly #auth = this.#ngZone.runOutsideAngular(() => this.#initializeAuth());

    public loginWithGoogle(): Observable<void> {
        if (!this.#auth) {
            return of(undefined);
        }

        return defer(() => signInWithPopup(this.#auth!, new GoogleAuthProvider())).pipe(map(() => undefined));
    }

    public logout(): Observable<void> {
        return this.#auth ? defer(() => signOut(this.#auth!)) : of(undefined);
    }

    public getIdToken(): Observable<string | null> {
        if (!this.#auth) {
            return of(null);
        }

        return defer(async () => {
            await this.#auth!.authStateReady();
            return this.#auth!.currentUser?.getIdToken() ?? null;
        });
    }

    public isAuthenticated(): Observable<boolean> {
        return this.getIdToken().pipe(map((token) => token !== null));
    }

    #initializeAuth(): Auth | null {
        if (!isPlatformBrowser(this.#platformId)) {
            return null;
        }

        const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
        const auth = getAuth(app);

        if (FIREBASE_AUTH_EMULATOR_URL) {
            connectAuthEmulator(auth, FIREBASE_AUTH_EMULATOR_URL, { disableWarnings: true });
        }

        return auth;
    }
}
