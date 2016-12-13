
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAILS_SUCCESS = 'GET_EMAIL_SERVICES_EMAILS_ALL_SUCCESS';
export const GET_EMAILS_FAIL = 'GET_EMAIL_SERVICES_EMAILS_ALL_FAIL';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const POST_EMAIL = 'POST_EMAIL';
export const POST_EMAIL_SUCCESS = 'POST_EMAIL_SERVICES_EMAILS_NEW_SUCCESS';
export const POST_EMAIL_FAIL = 'POST_EMAIL_SERVICES_EMAILS_NEW__FAIL';
export const START_CONFIRMATION = 'START_CONFIRMATION';
export const STOP_CONFIRMATION = 'STOP_CONFIRMATION';
export const START_RESEND_EMAIL_CODE = 'START_RESEND_EMAIL_CODE'
export const START_RESEND_EMAIL_CODE_FAIL = 'START_RESEND_EMAIL_CODE_FAIL'


export function getEmails () {
  return {
    type: GET_EMAILS,
  };
}

export function getEmailsFail (err) {
  return {
    type: GET_EMAILS_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function changeEmail (data) {
  return {
    type: CHANGE_EMAIL,
    payload: data
  };
}

export function postEmail () {
  return {
    type: POST_EMAIL
  };
}

export function postEmailFail (err) {
  return {
    type: POST_EMAIL_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startConfirmation (data) {
  return {
    type: START_CONFIRMATION,
    payload: data
  };
}

export function stopConfirmation () {
  return {
    type: STOP_CONFIRMATION
  };
}

export function startResendEmailCode () {
  return {
    type: START_RESEND_EMAIL_CODE
  };
}

export function resendEmailCodeFail (err) {
  return {
    type: START_RESEND_EMAIL_CODE_FAIL,
    error: true,
    payload: new Error(err)
  };
}
