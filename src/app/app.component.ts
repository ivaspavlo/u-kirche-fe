import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { PRIME_NG_GLOBAL_MODULES } from './constants/primeng';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [...PRIME_NG_GLOBAL_MODULES, RouterOutlet, TranslatePipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private translate: TranslateService, public primeNGConfig: PrimeNGConfig) {
        this.translate.addLangs(['ua', 'en']);
        this.translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        const lang = browserLang?.match(/en|ua/) ? browserLang : 'en';

        this.translate.use(lang);

        this.translate.stream('primeng').subscribe(data => {
            this.primeNGConfig.setTranslation(data);
        });
    }

    public useLanguage(value: string): void {
        this.translate.use(value);
    }
}
