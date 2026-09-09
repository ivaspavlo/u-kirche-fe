import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { HeaderComponent } from '@app/components';

import { HeroComponent } from './components';

@Component({
    selector: 'app-home-page',
    imports: [DialogModule, HeroComponent, HeaderComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
