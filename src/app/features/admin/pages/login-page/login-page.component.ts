import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { API_URL } from '@env/environment';
import { AdminActions } from '../../store/admin.actions';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    readonly #store: Store = inject(Store);
    readonly #http: HttpClient = inject(HttpClient);

    public email: string = '';
    public password: string = '';

    public onLogin(): void {
        this.#store.dispatch(
            AdminActions.login({
                email: this.email,
                password: this.password
            })
        );
    }

    public onTest(): void {
        this.#http.get(API_URL).subscribe();
    }
}
