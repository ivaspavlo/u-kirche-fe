import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PRIME_NG_GLOBAL_MODULES } from './constants/primeng';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ...PRIME_NG_GLOBAL_MODULES],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {}
