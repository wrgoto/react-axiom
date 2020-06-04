# Subscriber

This React component class is responsible for subscribing to models and updating itself in response to model state changes.

```javascript
import { subscribe } from 'react-axiom';
```

*Note: this documentation specifically covers the interfacing API of the `Subscriber` class and the higher-order `subscribe()` function. For more information on how to use subscribers with models, see the [introduction](https://medium.com/@wrgoto/introducing-react-axiom-84bf37a50adb).*

## `subscribe(Component)`

This higher-order function returns a new `Subscriber` component class by wrapping a React component class.

```javascript
const TaskSubscriber = subscribe(TaskComponent);
```

*Note: the returned component class will hoist the static methods of the wrapped component and store a reference to the wrapped component in the class property `WrappedComponent`.* 
