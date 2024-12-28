import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { IMeetReq } from '@app/interfaces';
import { LANGUAGE } from '@app/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meet-dialog',
  standalone: true,
  imports: [],
  templateUrl: './meet-dialog.component.html',
  styleUrl: './meet-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetDialogComponent {
  @Output() submit: EventEmitter<IMeetReq> = new EventEmitter();
  readonly #recaptchaV3Service: ReCaptchaV3Service = inject(ReCaptchaV3Service);
  readonly #translateService: TranslateService = inject(TranslateService);

  public onSubmitMeetForm(): void {
    this.#recaptchaV3Service.execute('importantAction').subscribe(() => {
      this.submit.emit({
        email: 'ivashchenko.pavel@gmail.com',
        name: 'Pavlo Iv',
        message: 'lorem ipsum',
        phoneNumber: '+380632768463',
        lang: this.#translateService.instant(LANGUAGE.DE)
      });
    });
  }
}
