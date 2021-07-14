export const constants = {
  // -----------------------PREFERRED_AGE--------------------------------
  changeReasons: [
    {
      name: 'PREFERRED_AGE',
      providerWeeklyChangeReasonID: 5,
      index: 0,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Preferred Age',
      header: 'Preferred Age',
      list: [],
      noRecordLabel: 'preferred age',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesPreferredAge',
        RESPONSE_KEY: 'weeklyChangesPreferredAgeList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Youngest',
          key: 'preferredAge_Youngest',
          isDoubleKey: true,
          secondaryKey: 'youngest',
        },
        {
          name: 'Oldest',
          key: 'preferredAge_Oldest',
          isDoubleKey: true,
          secondaryKey: 'oldest',
        },
        {
          name: 'Age is Flexible',
          key: 'preferredAgeIsFlexible',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Current Value',
          key: 'currentValue',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },
      ],
      popUpFields: [
        {
          label: 'Youngest',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'preferredAge_Youngest',
          dropdownAPI: {
            isMultipleSelection: false,
            method: 'post',
            api: '/familyChanges/getPreferredAgeYoungest',
            responseKey: 'preferredAgeYoungestList',
            fieldName: 'youngest',
            requestType: 'providerID',
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Oldest',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'preferredAge_Oldest',
          dropdownAPI: {
            isResponseToBeReversed: true,
            isMultipleSelection: false,
            method: 'post',
            api: '/familyChanges/getPreferredAgeOldest',
            responseKey: 'preferredAgeOldestList',
            fieldName: 'oldest',
            requestType: 'providerID',
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Age is Flexible',
          fieldType: 'CHECKBOX',
          isMandatory: false,
          key: 'preferredAgeIsFlexible',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Current Value',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'currentValue',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [
        {
          isArrayFormat: false, keyToBeChanged: 'weeklyDateID',
          keyToBeCreated: 'weekID',
          secondaryKey: null,
        },
        {
          isArrayFormat: false, keyToBeChanged: 'youngest',
          keyToBeCreated: 'preferredAge_Youngest',
          secondaryKey: 'youngest',
        },
        {
          isArrayFormat: false, keyToBeChanged: 'oldest',
          keyToBeCreated: 'preferredAge_Oldest',
          secondaryKey: 'oldest',
        },
        {
          isArrayFormat: false, keyToBeChanged: 'ageIsFlexible',
          keyToBeCreated: 'preferredAgeIsFlexible',
          secondaryKey: null,
        },
      ],
    },
    // -----------------PREFERRED_DAY_CARE_HOURS------------------------------
    {
      name: 'PREFERRED_DAY_CARE_HOURS',
      providerWeeklyChangeReasonID: 8,
      index: 1,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Preferred DCH',
      header: 'Preferred Daycare Hours',
      list: [],
      noRecordLabel: 'preferred DCH',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesDayCareHours',
        RESPONSE_KEY: 'weeklyChangesDayCareHoursList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Day Care Hours',
          key: 'preferredDayCareHours',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Current Value',
          key: 'currentValue',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },
      ],
      popUpFields: [
        {
          label: 'Day Care Hours',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'preferredDayCareHours',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'number'

        },
        {
          label: 'Current Value',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'currentValue',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'

        },
        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [
        {
          isArrayFormat: false, keyToBeChanged: 'dayCareHours',
          keyToBeCreated: 'preferredDayCareHours',
          secondaryKey: null,
        },
      ],
    },
    // --------------------------PROVIDER_STATUS-------------------------
    {
      name: 'PROVIDER_STATUS',
      providerWeeklyChangeReasonID: 3,
      index: 2,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Provider Status',
      header: 'Provider Status',
      list: [],
      noRecordLabel: 'provider status',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesProviderStatus',
        RESPONSE_KEY: 'weeklyChangesProviderStatusList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Provider Status',
          key: 'providerStatusTypeID',
          isDoubleKey: true,
          secondaryKey: 'providerStatusType',
        },
        {
          name: 'Current Value',
          key: 'currentValue',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },

        {
          name: 'Begin Date',
          key: 'beginDate',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'End Date',
          key: 'endDate',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Reason On Hold',
          key: 'reasonOnHold',
          isDoubleKey: true,
          secondaryKey: 'reasonOnHold',
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },

      ],
      popUpFields: [
        {
          label: 'Provider Status',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'providerStatusTypeID',
          dropdownAPI: {
            isMultipleSelection: false,
            method: 'get',
            api: '/familyChanges/getProviderStatusType',
            responseKey: 'providerStatusTypeList',
            fieldName: 'providerStatusType',
            requestType: null,
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Current Value',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'currentValue',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Begin Date',
          fieldType: 'DATE_PICKER',
          isMandatory: false,
          key: 'beginDate',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'End Date',
          fieldType: 'DATE_PICKER',
          isMandatory: false,
          key: 'endDate',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Reason On Hold',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'reasonOnHold',
          dropdownAPI: {
            isMultipleSelection: false,
            method: 'get',
            api: '/familyChanges/getReasonOnHold',
            responseKey: 'providerStatusTypeList',
            fieldName: 'reasonOnHold',
            requestType: null,
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [
        {
          isArrayFormat: false, keyToBeChanged: 'providerStatus',
          keyToBeCreated: 'providerStatusTypeID',
          secondaryKey: null,
        },
      ],
    },
    // -----------------LEVEL_OF_CARE------------------------------
    {
      name: 'LEVEL_OF_CARE',
      providerWeeklyChangeReasonID: 2,
      index: 3,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Level of Care',
      header: 'Level of Care',
      list: [],
      noRecordLabel: 'level of care',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesLevelOfCare',
        RESPONSE_KEY: 'weeklyChangesDailyChangeList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Level of Care',
          key: 'levelOfCare',
          isDoubleKey: true,
          secondaryKey: 'fchLevelOfCare',
        },
        {
          name: 'Current Value',
          key: 'currentValue',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },
      ],
      popUpFields: [
        {
          label: 'Level of Care',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'levelOfCare',
          dropdownAPI: {
            method: 'get',
            api: '/familyChanges/getFCHLevelOfCare',
            responseKey: 'fchLevelOfCareList',
            fieldName: 'fchLevelOfCare',
            requestType: null,
            isMultipleSelection: true,
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Current Value',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'currentValue',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [

      ],
    },
    // -----------------PREFERRED_RACE------------------------------
    {
      name: 'PREFERRED_RACE',
      providerWeeklyChangeReasonID: 6,
      index: 4,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Preferred Race',
      header: 'Preferred Race',
      list: [],
      noRecordLabel: 'preferred race',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesPreferredRace',
        RESPONSE_KEY: 'weeklyChangesPreferredRaceList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Preferred Race',
          key: 'preferredRaceID',
          isDoubleKey: true,
          secondaryKey: 'race',
        },
        {
          name: 'Current Value',
          key: 'currentValue',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },
      ],
      popUpFields: [
        {
          label: 'Preferred Race',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'preferredRaceID',
          dropdownAPI: {
            isMultipleSelection: false,
            method: 'get',
            api: '/familyChanges/getRaceAndIsFlexible',
            responseKey: 'raceAndIsFlexibleList',
            fieldName: 'race',
            requestType: null,
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Current Value',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'currentValue',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },
        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [
        {
          isArrayFormat: false, keyToBeChanged: 'preferredRace',
          keyToBeCreated: 'preferredRaceID',
          secondaryKey: null,
        },
      ],
    },
    // --------------------------DAILY_CHANGE-------------------------
    {
      name: 'DAILY_CHANGE',
      providerWeeklyChangeReasonID: 10,
      index: 5,
      isVisible: false,
      isFormPopUpVisible: false,
      popUpHeader: 'Family Change - Daily Change',
      header: 'Daily Change',
      list: [],
      noRecordLabel: 'daily change',
      apiList: {
        GET: '/familyChanges/getWeeklyChangesDailyChange',
        RESPONSE_KEY: 'weeklyChangesDailyChangeList',
      },
      tableHeaders: [
        {
          name: 'Provider Name',
          key: 'providerName',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Daily Changes',
          key: 'dailyChange',
          isDoubleKey: true,
          secondaryKey: 'providerDailyChangeReason',
        },
        {
          name: 'Status',
          key: 'status',
          isDoubleKey: false,
          secondaryKey: null,
        },

        {
          name: 'Begin Date',
          key: 'beginDate',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'End Date',
          key: 'endDate',
          isDoubleKey: false,
          secondaryKey: null,
        },
        {
          name: 'Notes',
          key: 'notes',
          isDoubleKey: false,
          secondaryKey: null,
        },
      ],
      popUpFields: [
        {
          label: 'Daily Change',
          fieldType: 'DROPDOWN',
          isMandatory: false,
          key: 'dailyChange',
          dropdownAPI: {
            isMultipleSelection: false,
            method: 'get',
            api: '/familyChanges/getProviderDailyChangeReason',
            responseKey: 'providerDailyChangeReasonList',
            fieldName: 'providerDailyChangeReason',
            requestType: null,
          },
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: 'Status',
          fieldType: 'INPUT_BOX',
          isMandatory: false,
          key: 'status',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Begin Date',
          fieldType: 'DATE_PICKER',
          isMandatory: false,
          key: 'beginDate',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'End Date',
          fieldType: 'DATE_PICKER',
          isMandatory: false,
          key: 'endDate',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },
        {
          label: 'Notes',
          fieldType: 'TEXT_AREA',
          isMandatory: false,
          key: 'notes',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: true,
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffIDWhoShouldAuth',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeReasonID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'staffID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'weekID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

        {
          label: null,
          fieldType: null,
          isMandatory: null,
          key: 'providerWeeklyChangeID',
          dropdownAPI: null,
          isDoubleGetByIdKey: false,
          spinnerData: null,
          isDisabled: false,
          inputType: 'text'
        },

      ],
      getByIdKeyModifiers: [
        {
          isArrayFormat: true, keyToBeChanged: 'dailyChange',
          keyToBeCreated: 'dailyChange',
          secondaryKey: null,
          // isArrayFormat: false
        },
      ],
    },
  ],
  //


};
