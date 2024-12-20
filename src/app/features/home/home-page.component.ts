import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { HomeActions } from './store/home.actions';
import { MeetDialogComponent } from './components/meet-dialog/meet-dialog.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [DialogModule, MeetDialogComponent],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {
    readonly #store: Store = inject(Store);

    public visible: boolean = false;

    ngOnInit(): void {
        this.#store.dispatch(HomeActions.getContent());
    }

    public onInvite(): void {
        this.visible = !this.visible;
    }
}
