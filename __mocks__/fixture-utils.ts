export function randomInteger(power = 1000000000) {
  // https://stackoverflow.com/a/8378885/3437868
  return Math.floor(Math.random() * Math.pow(10, power)) + 1;
}

/**
 * Source: https://stackoverflow.com/a/1349426/3437868
 * @param length
 */
export function randomString(length = 10) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Query for attribute data-testid or data-testid='id'.
 *
 * @param id
 */
export function dataTestIdSelector(id?: any, elementTag?: string): string {
  const attributeSelector = '[data-testid' + (id ? "='" + id + "']" : ']');
  return !!elementTag ? elementTag + attributeSelector : attributeSelector;
}
