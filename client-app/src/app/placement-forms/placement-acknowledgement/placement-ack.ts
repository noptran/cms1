
  export interface Section1 {
      dob: string;
      courtCase?: any;
      kaecsesID: string;
      facts: string;
      nameofChild: string;
      keesClientid?: any;
  }

  export interface Section2 {
      providerTookPhysicalCustodyofChild: number;
      referralReceivedbyProvider: number;
  }

  export interface Section3 {
      zip: string;
      providerAssignedStaff: string;
      address: string;
      workerPhone: string;
      city: string;
      dateProviderStaffChanged: string;
      state: string;
      twentyfourHourAccessPhone?: any;
  }

  export interface Section4 {
      fromDate?: any;
      previousPlacement?: any;
      toDate?: any;
      reasonForMove: string;
  }

  export interface Section5 {
      hassiblinginOOHplacementandnotplaced: boolean;
      factsServiceSourceCode: string;
      sibsAffectedByMove?: any;
      endDate?: any;
      siblingReason?: any;
      claris: string;
      hassiblingInOOHplacementandplaced?: any;
      factsServiceActionCodePlacement: string;
      dateofPlacement: string;
      icwaApply: boolean;
      placementName: string;
      mailingAddress: string;
      phone: string;
      physicalAddress: string;
      startDate?: any;
      sameSchoolandAddress: any;
  }

  export interface Section6 {
      returnedHomeWithOutCustodyDate?: any;
      returnedHomeWithCustody: boolean;
      returnedHomeWithCustodyDate?: any;
      custodianshipReleasedFromCustodyDate?: any;
      releasedFromSRSCustodyDate?: any;
      custodianshipReleasedFromCustody: boolean;
      transferTribalCourtDate?: any;
      releasedFromSRSCustodyOtherReason: boolean;
      childDeathDate?: any;
      releasedFromSRSCustodyOtherReasonDate?: any;
      transferJJADate?: any;
      adoptivePlacementFinalizedDate?: any;
      releasedFromSRSCustody: boolean;
      transferJJA: boolean;
      returnedHomeWithOutCustody: boolean;
      custodianshipNotReleasedFromCustody: boolean;
      custodianshipNotReleasedFromCustodyDate?: any;
      venueChange: boolean;
      childDeath: boolean;
      adoptivePlacementFinalized: boolean;
      venueChangeDate?: any;
      transferTribalCourt: boolean;
      releasedFromSRSCustodyOtherReasonDescription: any;
  }

  export class PPS5120Form {
      dateTime: number;
      correctedCopy: boolean;
      trialHomePlacement: boolean;
      respite: boolean;
      initial: boolean;
      disruption: boolean;
      srsWorker: string;
      change: boolean;
      clarification?: any;
      section1: Section1;
      responseStatus: boolean;
      section2: Section2;
      section3: Section3;
      section4: Section4;
      section5: Section5;
      section6: Section6;
      plannedMove: boolean;
      reinstatement: boolean;
      changeOfVenue: boolean;
      hospital: boolean;
      awol: boolean;
      countyOfRemoval: string;
      transferJJA: any;
  }

