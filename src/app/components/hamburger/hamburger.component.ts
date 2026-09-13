import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-hamburger',
    templateUrl: './hamburger.component.html',
    styleUrl: './hamburger.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HamburgerComponent {
    @Input() set isOn(value: boolean) {
        this._isOn = value;
    }
    @Output() toggle: EventEmitter<boolean> = new EventEmitter();

    public _isOn: boolean = false;

    public onBtnClick(event: MouseEvent): void {
        this.switchStateAndEmit(event);
    }

    private switchStateAndEmit(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._isOn = !this._isOn;
        this.toggle.emit(this._isOn);
    }
}
