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
  // -----------------------------------SFM OFFICE TRANSPORTATION-----------------
  'TRANSPORTATION (SFM OFFICE)': {
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
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'sfaOfficeID',
        dropdownAPI: null,
        isDoubleGetByIdKey: true,
      },

      {
        label: 'Staff',
        fieldType: 'DROPDOWN',
        isMandatory: true,
        key: 'staffID',
        dropdownAPI: {
          method: 'post',
          api: '/staffTransportation/getStaffs',
          responseKey: 'staffs',
          fieldName: 'staffName',
          requestType: 'STAFF',
        },
        isDoubleGetByIdKey: false,
        spinnerData: null,
      },
    ]
  },

  // --------------------------------SFM OFFICE CASE------------------------------
  CASES: {
    list: '/sfaOffice/getCases',
    get_by_id_response_key: 'caseList',
    fields: [],
  },

  // --------------------------------SFM OFFICE STAFF------------------------------
  STAFF: {
    list: '/sfaOffice/getStaffs',
    get_by_id_response_key: 'staffsList',
    fields: [],
  }
};
