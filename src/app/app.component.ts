import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';

import { LANGUAGE, PRIME_NG_GLOBAL_MODULES } from './constants';

@Component({
    selector: 'app-root',
    imports: [...PRIME_NG_GLOBAL_MODULES, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    readonly #translateService: TranslateService = inject(TranslateService);
    readonly #primeNgConfig = inject(PrimeNG);

    constructor() {
        afterNextRender(() => this.#initLanguage());
    }

    #initLanguage(): void {
        this.#translateService.addLangs(Object.values(LANGUAGE));
        this.#translateService.setDefaultLang(LANGUAGE.UA);

        const browserLang = this.#translateService.getBrowserLang();
        const lang = browserLang?.match(/de|ua|ru/) ? browserLang : LANGUAGE.DE;

        this.#translateService.use(lang);

        this.#translateService.stream('primeng').subscribe((res) => this.#primeNgConfig.setTranslation(res));
    }
}
