import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { RecaptchaV3Module } from 'ng-recaptcha';

import { IMeetReq } from '@app/interfaces';
import { HomeActions } from './store';
import { MeetDialogComponent } from './components';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [DialogModule, MeetDialogComponent, RecaptchaV3Module, TranslatePipe],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    readonly #store: Store = inject(Store);
    readonly #translateService: TranslateService = inject(TranslateService);

    public visible: boolean = false;

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
