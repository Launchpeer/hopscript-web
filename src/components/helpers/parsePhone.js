/** the purpose of this file is to provide a function that formats a phone number
* As opposed to normalize.js, parsePhone.js is to be used for full strings
* example: parsePhone("+1(843)882-4215") returns 8438824215
*/

const parsePhone = (value) => {
  if (value.indexOf('+1') === 0) {
    // removing US country identifier //
    value = value.substring(2);
  }
  // removing all special characters //
  value = value.replace(/[^\d]/g, '');
  if (value.length > 10) {
    // removing any numbers that exceed a length of 10 //
    value = value.substring(0, 10);
  }
  return value;
};

export default parsePhone;
