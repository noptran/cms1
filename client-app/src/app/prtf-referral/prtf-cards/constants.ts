export const API_INFO = {
  //----------------------------------- TRANSPORATION-----------------------------
  TRANSPORTATION: {
    save: '/staffTransportation/save',
    update: '/staffTransportation/update',
    list: '/staffTransportation/list',
    get_by_id: 'staffTransportation/getById',
    primary_key: 'staffTransportationID',
    get_by_id_response_key: 'staffTransportation',
    fields: [
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'staffTransportationID',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: 'Begin Date',
        fieldType: 'DATE_PICKER',
        isMandatory: true,
        key: 'beginDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: 'End Date',
        fieldType: 'DATE_PICKER',
        isMandatory: false,
        key: 'endDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'staffID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },
      {
        label: 'Person Type',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'personTypeID',
        dropdownAPI: {
          method: 'get',
          api: '/staffTransportation/getPersonType',
          responseKey: 'personType',
          fieldName: 'personType',
          request: null,
        },
        isDoubleGetByIdKey: false,
      },
      {
        label: 'SFM Office',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'sfaOfficeID',
        dropdownAPI: {
          method: 'get',
          api: '/staffTransportation/getSFAOffice',
          responseKey: 'sfaOfficeList',
          fieldName: 'officeName',
          request: null,
        },
        isDoubleGetByIdKey: false,
      }
    ]
  },

  //----------------------------------- TRAINING-----------------------------
  TRAINING: {
    save: '/staffTraining/save',
    update: '/staffTraining/update',
    list: '/staffTraining/list',
    get_by_id: '/staffTraining/getById',
    primary_key: 'staffTrainingID',
    get_by_id_response_key: 'staffTraining',
    fields: [
      {
        label: 'Training Type',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'trainingTypeID',
        dropdownAPI: {
          method: 'post',
          api: '/dropDown/contains',
          responseKey: 'dropDown',
          fieldName: 'trainingType',
          requestType: 'DROPDOWN_CONTAINS',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },
      {
        label: 'Training Catagory',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'trainingCategoryID',
        dropdownAPI: {
          method: 'post',
          api: '/dropDown/contains',
          responseKey: 'dropDown',
          fieldName: 'trainingCategory',
          requestType: 'DROPDOWN_CONTAINS',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },

      {
        label: 'Units',
        fieldType: 'SPINNER',
        isMandatory: true,
        key: 'units',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
        spinnerData: {
          step: 1,
        }
      },

      {
        label: 'Training Sponsor',
        fieldType: 'DROPDOWN',
        isMandatory: false,
        key: 'sponsorID',
        dropdownAPI: {
          method: 'post',
          api: '/staffTraining/getTrainingSponsor',
          responseKey: 'trainingSponsor',
          fieldName: 'sponsorName',
          requestType: 'STAFF_TRAINING_SPONSOR',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },

      {
        label: 'End Date',
        fieldType: 'DATE_PICKER',
        isMandatory: true,
        key: 'endDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'staffTrainingID',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },

      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'staffID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
        spinnerData: null,
      },

    ]
  },

  //----------------------------------- TREATMENT DECISION-----------------------------
  "TREATMENT DECISION": {
    save: '/treatmentDecisions/save',
    update: '/treatmentDecisions/update',
    list: '/treatmentDecisions/list',
    get_by_id: '/treatmentDecisions/getById',
    primary_key: 'treatmentDecisionsID',
    get_by_id_response_key: 'treatmentDecisions',
    fields: [
      {
        label: 'Person Table',
        fieldType: 'DROPDOWN',
        isMandatory: false,
        key: 'personAssignmentTypeID',
        dropdownAPI: {
          method: 'post',
          api: '/PRTF_Referral/getPersonAssignmentTypesByReferral',
          responseKey: 'personAssignmentType',
          fieldName: 'personAssignmentType',
          requestType: 'referralTypeID',
        },
        isDoubleGetByIdKey: true,
        spinnerData: null,
      },
      {
        label: 'Person Name',
        fieldType: 'DROPDOWN',
        isMandatory: false,
        key: 'personID',
        dropdownAPI: {
          method: 'post',
          api: '/PRTF_Referral/getPersonByReferralIDAndAssignmentType',
          responseKey: 'person',
          fieldName: 'name',
          requestType: 'personAssignmentTypeID & referralID',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },

      {
        label: 'Begin Date',
        fieldType: 'DATE_PICKER',
        isMandatory: false,
        key: 'beginDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: 'End Date',
        fieldType: 'DATE_PICKER',
        isMandatory: false,
        key: 'endDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: 'Notes',
        fieldType: 'TEXT_AREA',
        isMandatory: false,
        key: 'notes',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'treatmentDecisionsID',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'referralID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'personAssignmentTypeID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },

    ]
  },

  //----------------------------------- HEALTH EXAM-----------------------------
  "HEALTH EXAM": {
    save: '/healthExam/save',
    update: '/healthExam/update',
    list: '/healthExam/list',
    get_by_id: '/healthExam/getById',
    primary_key: 'healthExamID',
    get_by_id_response_key: 'healthExam',
    fields: [
      {
        label: 'Health Exam Type',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'healthExamTypeID',
        dropdownAPI: {
          method: 'post',
          api: '/healthExam/getHealthExamType',
          responseKey: 'healthExamType',
          fieldName: 'healthExamType',
          requestType: 'referralTypeID',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },
      {
        label: 'Follow Up',
        fieldType: 'CHECKBOX',
        isMandatory: false,
        key: 'followUpRequired',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: 'Exam Completed Date',
        fieldType: 'DATE_PICKER',
        isMandatory: false,
        key: 'examDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: 'Next Due Date',
        fieldType: 'DATE_PICKER',
        isMandatory: false,
        key: 'nextExamDue',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: 'Notes',
        fieldType: 'TEXT_AREA',
        isMandatory: false,
        key: 'notes',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },

      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'healthExamID',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'clientID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'referralID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },

    ]
  }
};
