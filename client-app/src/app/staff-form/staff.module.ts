import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WidgetModule } from "../Widget/widget.module";
import { DialogModule } from "primeng/dialog";
import { FormHeaderModule } from "../form-header/form-header.module";
import { FormFooterModule } from "../form-footer/form-footer.module";
import { TabViewModule } from "primeng/tabview";
import { MessageModule } from "primeng/message";
import { StaffFormComponent } from "./staff-form.component";
import { StaffFamilyChangeComponent } from "../Shared/Components/Family change/family-change.component";
import { StaffPositionComponent } from "../staff-position/staff-position.component";
import { DropdownModule } from "primeng/dropdown";
import { PageSizeModule } from "../pagesize/page-size.module";
import { AgGridModule } from "ag-grid-angular";
import { StaffTeamLeaderComponent } from '../staff-opencards/staff-team-leader/staff-team-leader.component';
import { ComplianceTechComponent } from '../staff-opencards/compliance-tech/compliance-tech.component';
import { SfmOfficeComponent } from '../staff-opencards/sfm-office/sfm-office.component';
import { FamilyChangeApprovalComponent } from '../staff-opencards/family-change-approval/family-change-approval.component';
import { StaffCardComponent } from '../staff-opencards/staff-card/staff-card.component';
import { StaffNotificationTranferComponent } from '../staff-opencards/staff-notification-tranfer/staff-notification-tranfer.component';

import { DraggableDialogModule } from '../draggable-dialog/draggable-dialog.module';

@NgModule({
    declarations: [
        StaffFormComponent,
        StaffFamilyChangeComponent,
        StaffPositionComponent,
        StaffTeamLeaderComponent,
        ComplianceTechComponent,
        SfmOfficeComponent,
        FamilyChangeApprovalComponent,
        StaffCardComponent,
        StaffNotificationTranferComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        WidgetModule,
        DialogModule,
        FormHeaderModule,
        FormFooterModule,
        TabViewModule,
        MessageModule,
        DropdownModule,
        PageSizeModule,
        AgGridModule,
        DraggableDialogModule,
    ],
    exports: [
        StaffFormComponent,
        StaffFamilyChangeComponent,
        StaffPositionComponent,
        StaffTeamLeaderComponent,
        ComplianceTechComponent,
        SfmOfficeComponent,
        FamilyChangeApprovalComponent,
        StaffCardComponent,
        StaffNotificationTranferComponent
    ]

})
export class CMSStaffModule { }
