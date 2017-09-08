/**
* @method flatMap
* @param {String} text
* @param {Object} properties from an Element
* @return {String} Returns a text with the concatenated text from the component and its children
*/
export function flatMap(text, prop) {
  (prop.children || []).forEach(child => {
    text += typeof child === 'object' ? flatMap('', child) : child;
  });
  return text;
}
