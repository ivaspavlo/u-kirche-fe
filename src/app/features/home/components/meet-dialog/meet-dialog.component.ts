import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-meet-dialog',
  standalone: true,
  imports: [RecaptchaV3Module],
  templateUrl: './meet-dialog.component.html',
  styleUrl: './meet-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetDialogComponent {
  readonly #recaptchaV3Service: ReCaptchaV3Service = inject(ReCaptchaV3Service);

  public onSubmit(): void {
    this.#recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      console.log(`Token [${token}] generated`);
    });
  }
}
