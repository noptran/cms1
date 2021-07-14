import { Component, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Constants } from '../../constants';
@Component({
    selector: 'form-footer',
    templateUrl: './form-footer.component.html',
    styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnDestroy {
    @Input() disableCalculate: boolean;
    showFinalize: boolean;
    @Input() isFinalize = false;
    @Input() formSelected: any;
    @Output() resetAction = new EventEmitter();
    @Output() saveAction = new EventEmitter();
    @Output() finalizeAction = new EventEmitter();
    @Output() calculateAction = new EventEmitter();

    interval: any;

    reset() {
        this.resetAction.emit();
    }

    save() {
        this.saveAction.emit();
    }

    finalize() {
        this.finalizeAction.emit();
    }
    calculate() {
        this.calculateAction.emit();
    }
    constructor() {

    }
    ngOnInit() {
        if (this.formSelected === Constants.PROGRAMS.OKLAHOMA_FOSTER_CARE_HOME.FORMS.GUIDE_FOR_MONTHLY_RESOURCE_HOME_CONTACT ||
            this.formSelected === ':Oklahoma') {
            this.showFinalize = true;
        } else {
            this.showFinalize = false;
        }
        this.inactivityAutoSave();
    }

    // this is to auto save form when its inactivity
    inactivityAutoSave() {
        clearTimeout(this.interval);
        this.interval = setInterval(() => {
            this.save();
        }, 180000); // 3 minutes
    }

    ngOnDestroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

}