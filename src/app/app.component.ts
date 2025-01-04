import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { LANGUAGE, PRIME_NG_GLOBAL_MODULES } from './constants';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [...PRIME_NG_GLOBAL_MODULES, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    readonly #translateService: TranslateService = inject(TranslateService);
    readonly #primeNGConfig: PrimeNGConfig = inject(PrimeNGConfig);

    constructor()
    {
        afterNextRender(() => this.#initLanguage());
    }

    #initLanguage(): void {
        this.#translateService.addLangs(Object.values(LANGUAGE));
        this.#translateService.setDefaultLang(LANGUAGE.UA);

        const browserLang = this.#translateService.getBrowserLang();
        const lang = browserLang?.match(/de|ua|ru/) ? browserLang : LANGUAGE.DE;

        this.#translateService.use(lang);

        this.#translateService.stream('primeng').subscribe(data => this.#primeNGConfig.setTranslation(data));
    }
}
