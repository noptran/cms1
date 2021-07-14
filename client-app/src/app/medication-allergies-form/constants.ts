export const API_INFO = {

  // ------------------------------------ALLERGIES------------------------
  ALLERGIES: {
    save: '/clientAllergy/save',
    update: '/clientAllergy/update',
    list_1: '/client/opencards/',
    list_2: null,
    list_3: '/list',
    get_by_id: 'clientAllergy/getById',
    primary_key: 'clientAllergiesID',
    get_by_id_response_key: 'clientAllergy',
    fields: [
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'client',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: 'Notification Date',
        fieldType: 'DATE_PICKER',
        isMandatory: true,
        key: 'notificationDate',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: 'Allergies',
        fieldType: 'TEXT_AREA',
        isMandatory: false,
        key: 'allergies',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },
      {
        label: null,
        fieldType: null,
        isMandatory: null,
        key: 'clientAllergiesID',
        dropdownAPI: null,
        isDoubleGetByIdKey: false,
      },


    ]
  },
};
