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
  constructor({ name, listItems = [], otherList = null }) {
    super({ name, listItems, otherList });
  }
}

class ListItem extends Model {
  constructor({ name, dependencies = [] }) {
    super({ name, dependencies });
  }
}

const listItem1 = new ListItem({ name: '1' });
const listItem2 = new ListItem({ name: '2', dependencies: [listItem1] });
const listItem3 = new ListItem({ name: '3', dependencies: [listItem2] });

const list1 = new List({ name: '1', listItems: [listItem1, listItem2, listItem3] });
const list2 = new List({ name: '2', listItems: [], otherList: list1 });

const expectedString = JSON.stringify({
  "state": {
    "list": {
      "_constructor": "List",
      "_id": 4
    },
    "otherList": {
      "_constructor": "List",
      "_id": 5
    }
  },
  "models": {
    "List": {
      "4": {
        "name": "1",
        "listItems": [
          {
            "_constructor": "ListItem",
            "_id": 1
          },
          {
            "_constructor": "ListItem",
            "_id": 2
          },
          {
            "_constructor": "ListItem",
            "_id": 3
          }
        ],
        "otherList": null
      },
      "5": {
        "name": "2",
        "listItems": [

        ],
        "otherList": {
          "_constructor": "List",
          "_id": 4
        }
      }
    },
    "ListItem": {
      "1": {
        "name": "1",
        "dependencies": [

        ]
      },
      "2": {
        "name": "2",
        "dependencies": [
          {
            "_constructor": "ListItem",
            "_id": 1
          }
        ]
      },
      "3": {
        "name": "3",
        "dependencies": [
          {
            "_constructor": "ListItem",
            "_id": 2
          }
        ]
      }
    }
  }
});


//=============
// STORE TESTS
//=============

describe('Store', () => {
  let store;
  let state;
  let models;
  let output;

  describe('stringify', () => {
    describe('with non-Model data', () => {
      beforeEach(() => {
        state = { string, number, float, bool, array, object };
        store = new Store({ state });
        output = store.stringify();
      });

      it('should return a matching state and store string', () => {
        expect(output).toBe(JSON.stringify({ state, models: {} }));
      });
    });

    describe('with Model data', () => {
      beforeEach(() => {
        models = [List, ListItem];
        state = { list: list1, otherList: list2 };
        store = new Store({ models, state });
        output = store.stringify();
      });

      it('should return a matching state and store string', () => {
        expect(output).toBe(expectedString);
      });
    });
  });

  describe('parse', () => {
    describe('with non-Model data', () => {
      beforeEach(() => {
        state = { string, number, float, bool, array, object };
        output = JSON.stringify({ state, models: {} });
        store = new Store({});
        store.parse(output);
      });

      it('should set the correct store state', () => {
        expect(store.state).toEqual(state);
      });
    });

    describe('with Model data', () => {
      beforeEach(() => {
        models = [List, ListItem];
        state = { list: list1, otherList: list2 };
        store = new Store({ models });
        Model.baseId = 1;
        store.parse(expectedString);
      });

      it('should set the correct store state', () => {
        expect(store.state).toEqual(state);
      });
    });
  });
});
