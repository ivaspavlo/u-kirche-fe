import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@app/interfaces';
import { AdminActions } from '../../store/admin.actions';
import { selectUser } from '../../store/admin.select';

@Component({
    selector: 'app-cms-page',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './cms-page.component.html',
    styleUrl: './cms-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmsPageComponent implements OnInit {
    readonly #store: Store = inject(Store);
    public user$: Observable<IUser | null> = this.#store.select(selectUser);

    ngOnInit(): void {
        debugger;
        this.#store.dispatch(AdminActions.getUser());
    }
}
