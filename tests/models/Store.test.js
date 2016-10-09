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
  constructor({ id, listItems = [], otherList = null }) {
    super({ id, listItems, otherList });
  }
}

class ListItem extends Model {
  constructor({ id, dependencies = [] }) {
    super({ id, dependencies });
  }
}

const listItem1 = new ListItem({ id: '1' });
const listItem2 = new ListItem({ id: '2', dependencies: [listItem1] });
const listItem3 = new ListItem({ id: '3', dependencies: [listItem2] });

const list1 = new List({ id: '1', listItems: [listItem1, listItem2, listItem3] });
const list2 = new List({ id: '2', listItems: [], otherList: list1 });

const expectedString = JSON.stringify({
  "state": {
    "list": {
      "_constructor": "List",
      "id": "1"
    },
    "otherList": {
      "_constructor": "List",
      "id": "2"
    }
  },
  "models": {
    "List": {
      "1": {
        "id": "1",
        "listItems": [
          {
            "_constructor": "ListItem",
            "id": "1"
          },
          {
            "_constructor": "ListItem",
            "id": "2"
          },
          {
            "_constructor": "ListItem",
            "id": "3"
          }
        ],
        "otherList": null
      },
      "2": {
        "id": "2",
        "listItems": [

        ],
        "otherList": {
          "_constructor": "List",
          "id": "1"
        }
      }
    },
    "ListItem": {
      "1": {
        "id": "1",
        "dependencies": [

        ]
      },
      "2": {
        "id": "2",
        "dependencies": [
          {
            "_constructor": "ListItem",
            "id": "1"
          }
        ]
      },
      "3": {
        "id": "3",
        "dependencies": [
          {
            "_constructor": "ListItem",
            "id": "2"
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
        store.parse(expectedString);
      });

      it('should set the correct store state', () => {
        expect(store.state).toEqual(state);
      });
    });
  });
});
