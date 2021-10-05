import { USER_TYPE } from "./types";

/**
 * Check whether the the user is an admin
 * @param {String} userType 
 */
export function isAdmin(userType) {
  return userType === USER_TYPE.admin.db;
}