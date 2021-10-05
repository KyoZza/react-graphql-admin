import uuid from 'uuid';
import { client } from "../../../../../../graphql";
import { GET_ALERT_MESSAGES } from "../../../lib";
import { ALERT_TYPE } from "./types";

/**
 * @param {String} message 
 */
export function pushErrorAlert(message) {
  pushAlert(message, ALERT_TYPE.error);
}

/**
 * @param {String} message 
 */
export function pushSuccessAlert(message) {
  pushAlert(message, ALERT_TYPE.success);
}

/**
 * @param {String} message 
 */
export function pushDefaultAlert(message) {
  pushAlert(message, ALERT_TYPE.default);
}

/**
 * @param {String} message 
 * @param {String} type 
 */
export function pushAlert(message, type) {
  const data = client.readQuery({
    query: GET_ALERT_MESSAGES
  });

  const newAlertMessage = {
    __typename: 'AlertMessage',
    id: uuid.v4(),
    message,
    type
  }

  client.writeData({
    data: {
      alertMessages: [...data.alertMessages, newAlertMessage]
    }
  });
}

/**
 * @param {String} id 
 */
export function removeAlert(id) {
  const data = client.readQuery({
    query: GET_ALERT_MESSAGES
  });

  client.writeData({
    data: {
      alertMessages: data.alertMessages.filter(alert => alert.id !== id)
    }
  });
}

