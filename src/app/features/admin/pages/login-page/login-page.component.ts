import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../store/admin.actions';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  readonly #store: Store = inject(Store);

  public email: string = '';
  public password: string = '';

  public onRegsiter(): void {
    const req = {
      email: this.email,
      password: this.password
    }
    this.#store.dispatch(AdminActions.login(req));
  }
}
