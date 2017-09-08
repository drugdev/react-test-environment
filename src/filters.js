import shallowEqual from 'shallowequal';

import { flatMap } from './utils';
import { NOT_FOUND } from './constants';

export const find = (acc, node, T, first, parent) => {
  if (node === T) return acc(node, parent);
  if (node === null) return acc();
  let found = NOT_FOUND;
  if (node.props) {
    // look for classes...
    if (T[0] === '.') {
      if (
        T === '.ANY' ||
        (node.props.className &&
          node.props.className.split(' ').includes(T.substr(1)))
      ) {
        found = node;
      }
    } else if (T[0] === '#') {
      // look for ids...
      if (T === '#ANY' || (node.props.id && node.props.id == T.substr(1))) {
        found = node;
      }
    } else if (typeof T === 'object') {
      // look for props...
      const P = Object.keys(T)[0];
      if (
        node.props[P] &&
        (shallowEqual(node.props[P], T[P]) || T[P] === ANY)
      ) {
        found = node;
      }
    }
    // look for type...
    if (node.props.type === T) found = node;
    if (found === NOT_FOUND || !first) {
      if (node.props.children) {
        // recurse into children and do the same...
        // Note: result order will be depth first,
        const fc = acc().length;
        let cc = false;
        for (const c in node.props.children || []) {
          if (node.props.children[c]) {
            const nc = find(acc, node.props.children[c], T, first, node).length;
            cc = first && nc > fc;
            if (cc) break;
          }
        }
      }
    }
  }
  if (found === NOT_FOUND) {
    // look for tag types...
    const type = T[0] === '$' ? T.substr(1) : T;
    if (node.type === type) {
      found = node;
    } else if (
      typeof T === 'string' &&
      (node.children || []).find(c => (c.toString() || '').indexOf(T) >= 0)
    ) {
      found = node;
    }
  }

  if (found === NOT_FOUND || !first) {
    // recurse into children and do the same...
    // Note: result order will be depth first,
    const fc = acc().length;
    let cc = false;
    for (const c in node.children || []) {
      if (node.children[c]) {
        const nc = find(acc, node.children[c], T, first, node).length;
        cc = first && nc > fc;
        if (cc) break;
      }
    }
    if (!cc) {
      for (const p in node.props) {
        if (typeof node.props[p] === 'object') {
          const np = find(acc, node.props[p], T, first, node).length;
          cc = first && np > fc;
          if (cc) break;
        }
      }
    }
  }
  return acc(found, parent);
};

function accumulate(acc) {
  return function (node, parent) {
    // recurse filters into objects
    // eg: component.find(x).find(y).find(z) assumes {x: y: {z:{}}}
    if (typeof node === 'object') {
      acc.push({ ...node, parent, ...filters(node) });
    } else if (node && node !== NOT_FOUND) {
      acc.push({ ...node, parent });
    }
    return acc;
  };
}

function filters(tree) {
  return {
    find: T => find(accumulate([]), tree, T, true)[0],
    findAll: T => find(accumulate([]), tree, T),
    findLast: T => find(accumulate([]), tree, T).slice(-1)[0],
    findNth: (T, nth) => find(accumulate([]), tree, T).slice(nth, nth + 1)[0],
    text: T => find(accumulate([]), tree, T).reduce(flatMap, '')
  };
}

export default filters;
