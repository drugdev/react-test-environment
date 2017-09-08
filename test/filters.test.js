import filters from '../src/filters';

describe('Filter module', () => {
  let tree;
  beforeEach(() => {
    tree = {
      children: [
        {
          type: 'div',
          props: {
            names: ['addr', 'lat', 'lon'],
            className: 'fa-search',
          },
          children: ['Content 1'],
        },
        {
          type: 'div',
          props: {
            name: 'lvl1 child',
            className: 'hide',
            id: 'x_id',
          },
          children: ['Content 2'],
        },
        {
          type: 'div',
          props: {
            name: 'lvl1 child',
            className: 'hide',
            id: 'p_id',
          },
          children: ['Content 3'],
        },
      ],
      props: {
        name: 'test name',
        label: 'test label',
        tooltip: 'test tooltip',
        initialValue: 'Test',
        disabled: true,
        input: { value: 'initial', onChange: jest.fn() },
      },
    };
  });

  describe('find()', () => {
    it('should find an element by its name', () => {
      const component = filters(tree);
      expect(component.find({ name: 'test name' })).toBeDefined();
    });

    it('should find an element with multiple names', () => {
      const component = filters(tree);
      expect(component.find({ names: ['addr', 'lat', 'lon'] })).toBeDefined();
    });

    it('should access to an element properties', () => {
      const component = filters(tree);
      expect(component.find({ name: 'lvl1 child' }).props.className).toBe('hide');
    });

    it('should access to the parent element properties', () => {
      const component = filters(tree);
      expect(component.find({ name: 'lvl1 child' }).parent.props.label).toBe('test label');
    });

    it('should find an element by its class', () => {
      const component = filters(tree);
      expect(component.find('.fa-search')).toBeDefined();
    });

    it('should find an element by its id', () => {
      const component = filters(tree);
      expect(component.find('#p_id')).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should find all the elements with the class hide', () => {
      const component = filters(tree);
      expect(component.findAll('.hide').length).toBe(2);
    });

    it('should find all the <div> elements by its tag', () => {
      const component = filters(tree);
      expect(component.findAll('div').length).toBe(3);
    });
  });

  describe('findLast', () => {
    it('should find all the elements with the class hide and return only the last one', () => {
      const component = filters(tree);
      expect(component.findLast('.hide').props.id).toBe('p_id');
    });
  });

  describe('findNth', () => {
    it('should find the second element with the <div> tag', () => {
      const component = filters(tree);
      expect(component.findNth('div', 1).props.id).toBe('x_id');
    });
  });

  describe('text', () => {
    it('should contact all the inner texts of the div elements', () => {
      const component = filters(tree);
      expect(component.text('div')).toBe('Content 1Content 2Content 3');
    });
  });
});
