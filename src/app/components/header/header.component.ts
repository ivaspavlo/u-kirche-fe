import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { SOCIAL_ITEMS } from '@app/constants';

import { DropdownOptions, NavButtons } from './header.constant';
import { ILangDropdownOption } from './header.interfaces';
import { HamburgerComponent } from '../hamburger/hamburger.component';

@Component({
    selector: 'app-header',
    imports: [FormsModule, Button, Select, DialogModule, TranslatePipe, HamburgerComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    readonly #translateService: TranslateService = inject(TranslateService);

    protected selectedLanguage = DropdownOptions[0];
    protected navButtons = NavButtons;
    protected dropdownOptions = DropdownOptions;
    protected isHamburgerMenuVisible = false;
    protected socialItems = SOCIAL_ITEMS;

    ngOnInit(): void {
        this.#initSelectedLanguage(this.#translateService.currentLang);
    }

    protected onNavButtonClick(index: number): void {
        console.log(`Nav button clicked: ${this.navButtons[index].label}`);
    }

    protected onDonate(): void {
        console.log('Donate button clicked');
    }

    protected onUseLanguage(option: ILangDropdownOption): void {
        document.cookie = `lang=${option.value};path=/;max-age=31536000`;
        this.#translateService.use(option.value);
    }

    protected onHamburgerToggle(isVisible: boolean): void {
        this.isHamburgerMenuVisible = isVisible;
    }

    #initSelectedLanguage(lang: string): void {
        this.selectedLanguage = DropdownOptions.find((option) => option.value === lang) || DropdownOptions[0];
    }
}
