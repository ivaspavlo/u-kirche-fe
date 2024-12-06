import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../store/admin.actions';

@Component({
    selector: 'app-cms-page',
    standalone: true,
    imports: [],
    templateUrl: './cms-page.component.html',
    styleUrl: './cms-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsPageComponent implements OnInit {
    readonly #store: Store = inject(Store);

    ngOnInit(): void {
        this.#store.dispatch(AdminActions.getUser());
    }
}
