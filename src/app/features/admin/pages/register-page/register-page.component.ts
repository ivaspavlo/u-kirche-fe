import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ROLE } from '@app/constants';
import { AdminActions } from '../../store/admin.actions';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
    readonly #store: Store = inject(Store);

    public firstName: string = '';
    public lastName: string = '';
    public email: string = '';
    public password: string = '';

    public onRegsiter(): void {
        const req = {
            name: `${this.firstName} ${this.lastName}`,
            email: this.email,
            password: this.password,
            role: ROLE.ADMIN
        };
        this.#store.dispatch(AdminActions.registerUser(req));
    }
}
