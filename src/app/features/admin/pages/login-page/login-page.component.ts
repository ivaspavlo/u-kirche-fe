import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AdminActions } from '../../store/admin.actions';
import { selectIsLoadingState } from '../../store/admin.select';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
    readonly #store: Store = inject(Store);
    readonly isLoading = this.#store.selectSignal(selectIsLoadingState);

    public onLogin(): void {
        this.#store.dispatch(AdminActions.loginUser());
    }
}
