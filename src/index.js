import renderer from 'react-test-renderer';

import filters from './filters';

function bindFilters(rendered, tree) {
  return Object.assign(
    {
      tree,
      getInstance: rendered.getInstance.bind(rendered),
      snapshot: () => bindFilters(rendered, snapshot(rendered)),
      children: tree.children,
      props: tree.props,
    },
    filters(tree)
  );
}

function snapshot(rendered, test) {
  const tree = rendered.toJSON();
  if (test) {
    expect(tree).toMatchSnapshot();
  }
  return tree || { children: [] };
}

/**
* The task of this function is to recevie a React component, process it and return
* an object that represents that component in a DOM tree style with
* added functions for navigating it more easily
*
* @method render
* @param {Object} React component
* @param {Boolean} if true it will create a Jest assertion with Snapshot
* @param {Object} Options passed down to the react renderer.create()
* @return {Object} Filter object
*/
function render(component, test = true, rendererOptions) {
  const rendered = renderer.create(component, rendererOptions);
  const tree = snapshot(rendered, test);
  return bindFilters(rendered, tree);
}

/**
 * Local Storage Mock
 */
const localStorageMock = (() => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

/**
 * Globals Setup for Test Environment
 */
global.window = {};
global.render = render;
