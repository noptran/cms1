export class ParentChildVisitation {
    valueArr = [
        { FromTime: 'From' },
        { ToTime: 'To' },
        { LocationVisit: 'Location of Visit Comment' },
        { ParentsHome: 'If visit not in parents’ home, please explain why' },
        { VisitTypePerson: 'If visit not in person, please explain why' },
        { ParentsEnvironment: 'If in the parent’s home, describe the environment' },
        { AdultsVisit: 'Adults present at visit and relationship to child(ren)' },
        { reason: 'If yes, what was the reason' },
        { MonitoredVisitation: 'List the safety concerns/contributing factors leading to the decision for supervised or monitored visitation' },
        { SafetyConcerns: 'What are the family’s strengths and resources to mitigate the safety concerns' },
        { AddressedVisit: 'If yes, describe the safety concern and how the concern was addressed during the visit' },
        { SupervisedVisitation: 'List the risk concerns leading to the decision for supervised or monitored visitation' },
        { Signature: 'Signature/Title' },
        { Date: 'Date' },
        { ServiceCasePlan: 'What services or case plan tasks are in place to mitigate the risks' },
        { FamilyMitigate: 'What progress has been made by the family to mitigate the risks' },
        { SafetyPlanConcerns: 'Concerns' },
    ];

    optionIndex = [
        { VisitType: 'VISIT TYPE' },
        { Location: 'Location of Visit' },
        { adjustment: 'Was an adjustment made to visit time, length or location' },
        { SafetyPlanYesNo: 'Is there a safety plan currently in place' },
        { SafetyConcernsYesNo: 'Were there any new safety concerns observed during the visit' },
        { ChildAcceptedLimits: 'Caregiver(s) had a plan and activities for the visit and brought appropriate supplies' },
        { InteractionYesNo: 'Caregiver(s) set limits when necessary and were firm, but not harsh, in these limits' },
        { FeelingsYesNo: 'Child(ren) accepted limits set by the caregiver(s)' },
        { RelationshipYesNo: 'Child(ren) positively engaged in interaction and showed positive feelings toward caregiver(s)' },
        { InteractionsYesNo: 'Caregiver(s) actively listened to child(ren) and showed interest in their activities and wellbeing' },
        { SupportChildYesNo: 'Caregiver(s) positively engaged with each other during visitation' },
        { SafetyPlanYesNo: 'Is there a safety plan currently in place?' },
    ]
}