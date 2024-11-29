import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../store/admin.actions';
import { ROLE } from '@app/constants';

@Component({
    selector: 'app-register-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.scss'
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
        this.#store.dispatch(AdminActions.register(req));
    }
}
