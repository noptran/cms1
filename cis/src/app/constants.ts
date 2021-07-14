export class Constants {
    public static QUESTIONNAIRE = '';
    public static FORM_STATUS = {
        'DRAFT': 'Draft',
        'PENDING': 'Pending',
        'SYNCED': 'Synced',
        'ERROR': 'Error in Sync'
    }
    public static PROGRAMS = {
        REINTEGRATION: {
            TITLE: 'Reintegration',
            MENU_TITLE: 'Reintegration',
            SHORT_NAME: 'reintegration',
            FORMS: {
                ADOPTIVE_RESOURCE_INQUIRY: 'Adoptive Resource Inquiry',
                CASE_ACTIVITY: 'Case Activity',
                COURT_APPEARANCE_LOG6_23_16: 'Court Appearance Log',
                INITIAL_FAMILY_TEAM_MEETING_INFORMED_CONSENT: 'Initial Family-Team Meeting w Informed Consent',
                MATERNAL_AND_PATERNAL_RELATIVE_FORM7_21_16: 'MATERNAL & PATERNAL Kinship',
                PARENT_CHILD_VISITATION_LOG_FORM: 'Parent-Child Visitation Log Form',
                PERMANENCY_RELEASE_OR_CHANGE_OF_STATUS: 'Permanency Release or Change of Status',
                // REQUEST_FOR_FINANCIAL_ASSISTANCE: 'Request for Financial Assistance',
                WORKED_CHILD_VISIT_ACTIVITY_NOTE9_19_16: 'Worker Child Visit Activity Note',
                WORKED_PARENT_VISIT_ACTIVITY_LOG_TYPE_UNLOCKED: 'Worker Parent Visit Activity Log'
            }
        },
        FAMILY_PRESERVATION: {
            TITLE: 'Family Preservation',
            MENU_TITLE: 'Family Preservation',
            SHORT_NAME: 'familyPreservation',
            FORMS: {
                SUPERVISORY_STAFFING_FORM_11_20_17_002: 'FP Supervisory Staffing'
            }
        },
        FOSTER_CARE_HOMES: {
            TITLE: 'Foster Care Homes',
            MENU_TITLE: 'Foster Care',
            SHORT_NAME: 'fosterCare',
            FORMS: {
                REINTEGRATION_FOSTER_CARE_PLACEMENT_SUPPORT_PLAN: 'Reintegration Foster Care Placement Support Plan'
            }
        },
        OKLAHOMA_FOSTER_CARE_HOME: {
            TITLE: 'Oklahoma Foster Care Home',
            MENU_TITLE: 'Oklahoma',
            SHORT_NAME: 'oklahoma',
            FORMS: {
                GUIDE_FOR_MONTHLY_RESOURCE_HOME_CONTACT: 'Guide for Monthly Resource Home Contact'
            }
        },
        BEHAVIORAL_ASSESSMENTS: {
            TITLE: 'Behavioral Assessments',
            MENU_TITLE: 'Behavior',
            SHORT_NAME: 'behavior',
            FORMS: {
                ASQ_2MO: 'ASQ 2 Months',
                ASQ_6MO: 'ASQ 6 Months',
                ASQ_12mo: 'ASQ 12 Months',
                ASQ_18mo: 'ASQ 18 Months',
                ASQ_24MO: 'ASQ 24 Months',
                ASQ_30MO: 'ASQ 30 Months',
                ASQ_36MO: 'ASQ 36 Months',
                ASQ_48MO: 'ASQ 48 Months',
                ASQ_60MO: 'ASQ 60 Months',
                CAFAS_SFCS10_2_17: 'CAFAS',
                CROPS: 'CROPS',
                CSDC: 'CSDC',
                NCFAS7_17_17: 'NCFAS',
                PECFAS_SFCS3_8_17: 'PECFAS',
                PS17_17_17: 'PSI'
            },
            TOTAL_QUESTIONS_COUNT: {
                ASQ_2MO: 16,
                ASQ_6MO: 23,
                ASQ_12mo: 27,
                ASQ_18mo: 31,
                ASQ_24MO: 31,
                ASQ_30MO: 33,
                ASQ_36MO: 35,
                ASQ_48MO: 36,
                ASQ_60MO: 36,
            }
        }
    }
}
