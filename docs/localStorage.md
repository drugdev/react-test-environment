# Local Storage

This library will mock automatically the Local Storage. This will help in our tests so we don't have to care about testing functionalities that use the Local Storage.

The functions mocked are:

* `getItem`: retrieves an item from the Local Storage
* `setItem`: updates an item from the Local Storage
* `clear`: clears all items in the Local Storage
* `removeItem`: remove an item from the Local Storage

## Examples

```
describe('User utilities', () => {
  it('should save the token into the Local Storage', () => {
    saveToken('0123456789');
    
    expect(window.localStorage.setItem.mock.calls.length).toBe(1);
    expect(window.localStorage.setItem.mock.calls[0]).toBe(['token', '0123456789']);
  });
});
```