import Model from '../../src/models/Model';
import Store from '../../src/models/Store';


//================
// TEST CONSTANTS
//================

const string = 'kafjoaja;';
const number = 121221;
const float = 0.392380134;
const bool = true;
const array = [
  string,
  number,
  float,
  bool,
  {
    string,
    number,
    float,
    bool,
  },
  [
    string,
    number,
    float,
    bool,
  ]
];

const object = {
  string,
  number,
  float,
  bool,
  array: [
    string,
    number,
    float,
    bool,
  ],
  object: {
    string,
    number,
    float,
    bool
  }
};


//=============
// TEST MODELS
//=============

class List extends Model {
  static defaultState() {
    return {
      id: '',
      listItems: [],
      otherList: null
    };
  }
}

class ListItem extends Model {
  static defaultState() {
    return {
      id: '',
      dependencies: []
    };
  }
}

const listItem1 = new ListItem({ id: '1' });
const listItem2 = new ListItem({ id: '2' });
const listItem3 = new ListItem({ id: '3' });
const listItem4 = new ListItem({ id: '4' });

listItem1.setDependencies([listItem4]);
listItem2.setDependencies([listItem1]);
listItem3.setDependencies([listItem2]);

const list1 = new List({ id: '1' });
const list2 = new List({ id: '2' });

list1.setListItems([listItem1, listItem2, listItem3, listItem4]);
list2.setOtherList(list1);


//=============
// STORE TESTS
//=============

describe('Store', () => {
  let store;
  let state;
  let output;

  beforeEach(() => {
    Store.setModelRefs([ List, ListItem ]);
  });

  describe('parse', () => {
    describe('with non-Model data', () => {
      beforeEach(() => {
        state = { string, number, float, bool, array, object };
        store = new Store(state);
        output = store.stringify();
        store = new Store();
        store.parse(output);
      });

      it('should set the correct store state', () => {
        expect(store.state).toEqual(state);
      });
    });

    describe('with Model data', () => {
      beforeEach(() => {
        state = { list: list1, otherList: list2 };
        store = new Store(state);
        output = store.stringify();
        store = new Store();
        Model.baseId = 1;
        store.parse(output);
      });

      describe('state', () => {
        let list;
        let listItems;
        let otherList;

        beforeEach(() => {
          list = store.getList();
          listItems = list.getListItems();
          otherList = store.getOtherList();
        });

        describe('list', () => {
          it('should have the correct id', () => {
            expect(list.getId()).toBe('1');
          });

          it('should be an instance of List', () => {
            expect(list instanceof List).toBe(true);
          });

          describe('first listItem', () => {
            it('should have the correct id', () => {
              expect(listItems[0].getId()).toBe('1');
            });

            it('should be an instance of ListItem', () => {
              expect(listItems[0] instanceof ListItem).toBe(true);
            });

            it('should contain a dependency reference to the fourth listItem', () => {
              expect(listItems[0].getDependencies()[0]).toBe(listItems[3]);
            });
          });

          describe('second listItem', () => {
            it('should have the correct id', () => {
              expect(listItems[1].getId()).toBe('2');
            });

            it('should be an instance of ListItem', () => {
              expect(listItems[1] instanceof ListItem).toBe(true);
            });

            it('should contain a dependency reference to the first listItem', () => {
              expect(listItems[1].getDependencies()[0]).toBe(listItems[0]);
            });
          });

          describe('third listItem', () => {
            it('should have the correct id', () => {
              expect(listItems[2].getId()).toBe('3');
            });

            it('should be an instance of ListItem', () => {
              expect(listItems[2] instanceof ListItem).toBe(true);
            });

            it('should contain a dependency reference to the second listItem', () => {
              expect(listItems[2].getDependencies()[0]).toBe(listItems[1]);
            });
          });

          describe('fourth listItem', () => {
            it('should have the correct id', () => {
              expect(listItems[3].getId()).toBe('4');
            });

            it('should be an instance of ListItem', () => {
              expect(listItems[3] instanceof ListItem).toBe(true);
            });

            it('should contain a no dependencies', () => {
              expect(listItems[3].getDependencies()).toEqual([]);
            });
          });
        });

        describe('otherList', () => {
          it('should have the correct id', () => {
            expect(otherList.getId()).toBe('2');
          });

          it('should be an instance of List', () => {
            expect(otherList instanceof List).toBe(true);
          });

          it('should contain a reference to list', () => {
            expect(otherList.getOtherList()).toBe(list);
          });
        });
      });
    });
  });
});
