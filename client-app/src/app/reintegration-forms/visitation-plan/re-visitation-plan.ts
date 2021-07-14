export class ReVisitationPlan {
    ChildName: string;
    Date: number;
    FactsCase: string;

    ParentEffectiveDate: number;
    ParentVisitsPerMonth: string;
    ParentParticipants: string;
    ParentArrangements: string;

    ParentEffectiveDate1: number;
    ParentVisitsPerMonth1: string;
    ParentParticipants1: string;
    ParentArrangements1: string;

    ChildEffectiveDate: number;
    ChildVisitsPerMonth: string;
    ChildParticipants: string;
    ChildArrangements: string;

    SiblingEffectiveDate: number;
    SiblingVisitsPerMonth: string;
    SiblingParticipants: string;
    SiblingArrangements: string;

    ChildSiblingEffectiveDate: number;
    ChildSiblingVisitsPerMonth: string;
    ChildSiblingParticipants: string;
    ChildSiblingArrangements: string;

    interactions: string;
    placedTogether=false;
    notApplicable=false;
    notApplicable1=false;
}
