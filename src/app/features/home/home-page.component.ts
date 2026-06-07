import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { TranslatePipe } from '@ngx-translate/core';

import { IMeetReq } from '@app/interfaces';
import { HeaderComponent } from '@app/components';

import { HomeActions } from './store';
import { MeetDialogComponent, HeroComponent } from './components';

@Component({
    selector: 'app-home-page',
    imports: [DialogModule, MeetDialogComponent, TranslatePipe, HeroComponent, HeaderComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    readonly #store: Store = inject(Store);
    readonly #platformId: Object = inject(PLATFORM_ID);

    public visible: boolean = false;

    public isBrowser = isPlatformBrowser(this.#platformId);

    ngOnInit(): void {
        // this.#store.dispatch(HomeActions.getContent());
    }

    public onShowMeetDialog(): void {
        this.visible = !this.visible;
    }

    public onSubmitMeetForm(value: IMeetReq): void {
        this.#store.dispatch(HomeActions.sendMeetForm(value));
        this.visible = false;
    }
}
