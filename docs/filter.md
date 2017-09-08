# Filter

The Filter object allows to query the component and get the required node. The available functions are:

* `find`: it returns the first element that matches with the query provided. 
* `findAll`: it returns a list with all the elements that matches with the query provided.
* `findLast`: it returns the last element that matches with the query provided.
* `findNth`: it returns the nth element of the list of elements that matches with the query provided.
* `text`: it returns then concatenated inner text of all the elelements that matches with the query provided.

Every result returned by the find functions is a enhaced Node object that allows to check the properties of the current Node, navigate to its children and parent and it has the capabilities of the Filter object, so we can run another query if needed.

## Examples

### find()

Find a button element and simulate an onClick event
```
component.find('button').find({ onClick: ANY }).props.onClick();
```

Find an element that contains the string 'addr' in the name attribute
```
expect(component.find({ name: 'addr' })).toBeDefined();
```

Find any element that contains the string 'addr' 'lat' or 'lon' in the name attribute
```
expect(component.find({ names: ['addr', 'lat', 'lon'] })).toBeDefined();
```

Find an input element and access to its props
```
component.find('input').props.disabled
```

Find an element that contains the text ' Opted out ' in its inner text
```
expect(component.find(' Opted out ')).toBeTruthy();
```

Find an element by its HTML ID
```
component.find('#p_id’)
```

Find an element by its HTML Class
```
component.find('.fa-search’)
```

Find an element that has a property type equal to 'submit.
```
component.find({type: 'submit’})
```

Find an element that contains the text 'OPN' and trigger the onClick event of the parent
```
component.find('OPN').parent.props.onClick();
```

Find an element that contains the text '+ 1 variation' and simulate an onClick event. Expect that spy function to have been called.
```
component.find('+ 1 variation').props.onClick();
expect(spy).toHaveBeenCalled();
```

### findAll()

Find all textarea elements in this component
```
component.findAll('textarea’);
```

Find all the elements with the class 'close', pick the first element of the list and simulate an onClick event.
```
component.findAll('.close')[0].props.onClick();
```

Find all the elements of type CountryResultRow and count them. Expect to have only one
```
expect(component.findAll('CountryResultRow').length).toBe(1)
```

Find all the link elements and simulate an onClick event in the first one
```
expect(component.findAll('a')[0].props.onClick).toBe(spyClear);
```

### findLast()

Find the last link element in a component and simulate a click on it
```
component.findLast('a', -1).props.onClick();
```

### findNth()

Find the nth element with the class 'menu-item' and simulate an onClick event.
```
component.findNth('.menu-item', 1).props.onClick();
```

### text()

Find all the elements with the class `active` and check that there's only one with the text "Menu"
```
expect(component.text('.active')).toBe('Menu');
```

