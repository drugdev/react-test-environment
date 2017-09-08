# Test Renderer

Test Environment public interface has a function called `render` that is the entry point for its usage.
It will be available into the global scope so is ready to call once you import this library.

The task of this function is to process React component and return an enhaced component object. This object represents that component in a DOM tree style with extra features that allow easy navigation over it.

The parameters for this function are:

* {Object} React component
* {Boolean} If set it will create a Jest assertion with Snapshot
* {Object} Options passed down to the react renderer.create()

It will return a Filter object that can be used to browse through the component elements.

## Examples

In the most simple scenario you can call the render function with just a parameter that corresponds with the component you want to test. In this case, `render()` will create a Jest Snapshot.
```
describe('<MyModal>', () => {
  it('should render', () => {
    render(<MyModal {...props}/>);
  });
});
```

When you want to perform some extra validations, you can store the result of the `render()` in a constant. This is a Filter object will help us to query elements inside of this compoment. If for some reason we don't want to create a Jest Snapshot we just need to send `false` as the second parameter.
```
describe('<MyModal>', () => {
  it('should render', () => {
    const component = render(<MyModal {...props}/>, false);
  });
});
```

From this point, read the documentation for the [Filter](./filter) object, where you will find all the different features for inspect React components.