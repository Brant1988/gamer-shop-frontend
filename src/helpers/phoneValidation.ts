/* eslint-disable no-useless-escape */
export const phoneNumberValidation = (phoneNumber: string) => {
  if (phoneNumber[0] !== "+") return false;
  let regex = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );

  if (regex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
