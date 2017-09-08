/**
* xx
*
* @method flatMap
* @param {String} foo Argument 1
* @param {Object} config A config object
* @return {Boolean} Returns true on success
*/
export function flatMap(text, prop) {
  (prop.children || []).forEach(child => {
    text += typeof child === 'object' ? flatMap('', child) : child;
  });
  return text;
}
