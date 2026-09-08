import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';

import { TranslatePipe } from '@ngx-translate/core';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';

import { DateTranslationService } from '@app/services';
import { LocationOptions } from './hero.constant';

@Component({
    selector: 'app-hero',
    imports: [FormsModule, TitleCasePipe, TranslatePipe, Select, Button, DividerModule],
    templateUrl: './hero.component.html',
    styleUrls: ['./styles/hero.base.scss', './styles/hero.desktop.scss', './styles/hero.mobile.scss']
})
export class HeroComponent {
    protected dateTranslate = inject(DateTranslationService);

    protected locations = LocationOptions;
    protected selectedLocation = this.locations[0];
    protected currentDate = new Date();

    protected onLocationSelect(option: any): void {
        console.log(`Selected location: ${option.address}`);
    }

    protected onVisitUsClick(): void {
        console.log('Visit Us button clicked');
    }
}
