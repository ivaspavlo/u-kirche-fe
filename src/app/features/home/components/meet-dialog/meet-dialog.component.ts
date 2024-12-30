import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { ReCaptchaV3Service, RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { TranslateService } from '@ngx-translate/core';
import { IMeetReq } from '@app/interfaces';
import { LANGUAGE } from '@app/constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-meet-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './meet-dialog.component.html',
  styleUrl: './meet-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetDialogComponent {
  @Output() submit: EventEmitter<IMeetReq> = new EventEmitter();
  readonly #recaptchaV3Service: ReCaptchaV3Service = inject(ReCaptchaV3Service);
  readonly #translateService: TranslateService = inject(TranslateService);
  readonly #fb: FormBuilder = inject(FormBuilder);

  public form!: FormGroup;

  ngOnInit() {
    this.form = this.#fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null],
      message: [null, Validators.required],
      lang: this.#translateService.instant(LANGUAGE.DE),
      recaptcha: [null, Validators.required]
    });
  }

  public onSubmitMeetForm(): void {
    this.#recaptchaV3Service.execute('importantAction').subscribe(() => {
      this.submit.emit({
        email: 'ivashchenko.pavel@gmail.com',
        name: 'Pavlo Iv',
        message: 'lorem ipsum',
        phone: '+380632768463',
        lang: this.#translateService.instant(LANGUAGE.DE)
      });
    });
  }

  public resolved(captchaResponse: any) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
