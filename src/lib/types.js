/**
 * User Types in Database and UI representation
 * @readonly
 * @enum {{db: String, ui: String}}
 */
export const USER_TYPE = {
  admin:        { db: 'admin',        ui: 'アドミン' },

  patient:      { db: 'patient',      ui: 'サービスを受ける方' },
  family:       { db: 'family',       ui: 'サービスを受ける方のご家族様・ご関係者様' },
  careCenter:   { db: 'carecenter',   ui: '施設様' },
  practitioner: { db: 'practicioner', ui: '理美容師・ネイル・エステ等の施術者' }
};

/**
 * Gets the UI representation of a given user type 
 * @param {String} userType 
 * @returns {String} UI representation of a given user type 
 */
export function getDisplayUserType(userType) {
  switch (userType) {
    case USER_TYPE.admin.db:        return USER_TYPE.admin.ui;
    case USER_TYPE.patient.db:      return USER_TYPE.patient.ui;
    case USER_TYPE.family.db:       return USER_TYPE.family.ui;
    case USER_TYPE.careCenter.db:   return USER_TYPE.careCenter.ui;
    case USER_TYPE.practitioner.db: return USER_TYPE.practitioner.ui;
  
    default: return '未定義';
  }
}


/**
 * @readonly
 * @enum {String}
 */
export const OWNER_TYPE = {
  organization: 'Organization',
  user:         'User'
}


/**
 * User Types in Database and UI representation
 * @readonly
 * @enum {{db: String, ui: String}}
 */
export const USER_STATUS = {
  active:       { db: 'active',       ui: 'アクティブ' },
  activated:    { db: 'activated',    ui: 'アクティブ' },
  inactive:     { db: 'inactive',     ui: '非活性' },
  deactivated:  { db: 'deactivated',  ui: '非活性' },
};

/**
 * Gets the UI representation of a given user type 
 * @param {String} userStatus 
 * @returns {String} UI representation of a given user type 
 */
export function getDisplayUserStatus(userStatus) {
  switch (userStatus) {
    case USER_STATUS.activated.db:
    case USER_STATUS.active.db:       return USER_STATUS.active.ui;
    case USER_STATUS.deactivated.db:
    case USER_STATUS.inactive.db:     return USER_STATUS.inactive.ui;
  
    default: return '未定義';
  }
}