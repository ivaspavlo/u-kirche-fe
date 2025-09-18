import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import ukLocale from '@fullcalendar/core/locales/uk';

import { IMeetReq } from '@app/interfaces';
import { HomeActions } from './store';
import { MeetDialogComponent } from './components';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [DialogModule, MeetDialogComponent, RecaptchaV3Module, TranslatePipe, FullCalendarModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    readonly #store: Store = inject(Store);
    readonly #translateService: TranslateService = inject(TranslateService);
    readonly #platformId: Object = inject(PLATFORM_ID);

    public visible: boolean = false;
    public calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: [
            { title: 'Event 1', date: '2025-06-20' },
            { title: 'Meeting', start: '2025-06-22T10:00:00', end: '2025-06-22T12:00:00' }
        ],
        locale: ukLocale
    };

    public isBrowser = isPlatformBrowser(this.#platformId);

    ngOnInit(): void {
        this.#store.dispatch(HomeActions.getContent());
    }

    public onShowMeetDialog(): void {
        this.visible = !this.visible;
    }

    public onSubmitMeetForm(value: IMeetReq): void {
        this.#store.dispatch(HomeActions.sendMeetForm(value));
        this.visible = false;
    }

    public useLanguage(value: string): void {
        this.#translateService.use(value);
    }
}
