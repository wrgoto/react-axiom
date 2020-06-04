# Store

This class is designed to centralize relational model data and works best with [Normalizr](https://github.com/paularmstrong/normalizr). It is also able to stringify and parse the entire application state for offline storage or server-to-client data transfer.

`Store` extends the `Model` class.

When using the store, an application should extend the `Store` class as it is an abstraction and should not be instantiated directly.

```javascript
import { Store } from 'react-axiom';
```

*Note: this documentation specifically covers the interfacing API of the `Store` class.*

- [`static defaultState()`](#static--defaultstate-)
- [`find[ModelName](ids)`](#-find-modelname-ids-)
- [`addEntities(entities)`](#-addentities-entities-)

Experimental methods:

- [`static setModelRefs(classes)`](#static--setmodelrefs-classes-)
- [`stringify()`](#-stringify-)
- [`parse(string)`](#-parse-string-)
- [`parseMerge(string)`](#-parsemerge-string-)

## `static defaultState()`

This class method sets the default state for the store and should return state described as a plain object. If this is not defined, the default state is an empty object.

Default state must include the key `entityDefinitions` which should contain a mapping of the key name to the model class:

```javascript
class Task extends Model {}

const entityDefinitions = {
  tasks: Task
};

class ClientStore extends Store {
  static defaultState() {
    return {
      entityDefinitions,
      tasks: {} // instances of Task stored by id
    };
  }
}

const clientStore = new ClientStore();

clientStore.getTasks();
//=> {}

```

The `entityDefinitions` hash allows the method `addEntities()` to instantiate any new models if necessary.

## `find[ModelName](ids)`

This generated method will return a model instance or instances stored in state. A single id or an array of ids can be passed in as arguments.

`ModelName` is the name of the model class but in plural form, i.e. the `findTasks(1)` method returns the task with id of `1` from the `this.getTasks()` hash.

```javascript
const task = new Task({ id: 1, name: 'Create a new app.' });

const clientStore = new ClientStore({
  tasks: {
    1: task
  }
});

clientStore.findTasks(1);
//=> task

clientStore.findTasks([1]);
//=> [task]
```

## `addEntities(entities)`

This class method is responsible for adding any new or merging any new data to the store via entities. Entities must be a hash of model data keyed by id.

```javascript
const newEntities = {
  tasks: {
    1: { id: 1, name: 'Create a new app.' },
    2: { id: 2, name: 'Install React Axiom.' }
  }
}

clientStore.addEntities(newEntities);

const task1 = clientStore.findTasks(1);
const task2 = clientStore.findTasks(2);

task1.getId();
//=> 1

task1.getName();
//=> 'Create a new app.'

task2.getName();
//=> 'Install React Axiom.'
```

## `static setModelRefs(classes)`

This class method saves references to other React Axiom models used in the application. This is only required if the application uses `stringify()`, `parse()`, or `parseMerge()`.

```javascript
class Task extends Model {}
class ServerStore extends Store {}

ServerStore.setModelRefs([ Task ]);

```

## `stringify()`

This method will take all of the state in the store and stringify the information such that it can parse the information later with all of the models re-instantiated.

*Note: if you are using an uglifier such as UglifyJS, you must not mangle function names. The config option for Webpack looks like the following:*

```javascript
{
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: { keep_fnames: true }
    })
  ]
}
```

## `parse(string)`

This method will take a string representation of state created by `stringify()` and repopulate the store with all models re-instantiated. This method will destroy all current state from the store.

*Note: if you are using an uglifier such as UglifyJS, you must not mangle function names. The config option for Webpack looks like the following:*

```javascript
const data = ServerStore.stringify();

class ClientStore extends Store {}

ClientStore.parse(data);
//=> Populates with ServerStore data
```

## `parseMerge(string)`

This method will take a string representation of state created by `stringify()` and repopulate the store with all models re-instantiated. This method will merge current state with new state.

*Note: if you are using an uglifier such as UglifyJS, you must not mangle function names. The config option for Webpack looks like the following:*

```javascript
const data = ServerStore.stringify();

class ClientStore extends Store {}

ClientStore.parse(data);
//=> Merges with ServerStore data
```
