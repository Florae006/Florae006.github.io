# JavaScript 链式调用 | 设计模式


## Promise 中的链式调用

### 手写 Promise 方法

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

function myPromise(fn) {
  if (!this || this.constructor !== myPromise) {
    throw new TypeError('Promise must be called with new');
  }
  if (!isFunction(fn)) {
    throw new TypeError('Promise resolver undefined is not a function');
  }

  this.status = PENDING;
  this.value = void 0;
  this.reason = void 0;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = value => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      // 发布
      this.onFulfilledCallbacks.forEach(fn => fn());
    }
  };

  const reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      // 发布
      this.onRejectedCallbacks.forEach(fn => fn());
    }
  };

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 添加 then 原型方法
myPromise.prototype.then = function (onFulfilled, onRejected) {
  // 处理边界
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value;
  onRejected = isFunction(onRejected) ? onRejected : reason => { throw reason };

  // 返回一个新的 Promise
  const promise2 = new myPromise((resolve, reject) => {
    if (this.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }, 0);
    } else if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }, 0);
    } else if (this.status === PENDING) {
      // 订阅
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
  });

  return promise2;
};


// 测试
const promise = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);

});

promise.then(value => {
  console.log(value);
  return 'msg from then1';
}).then(value => {
  console.log(value);
  return 'msg from then2';
}).then(value => {
  console.log(value);
});
```

## Vue :从 createApp 开始的链式调用

在 Vue 3 中，createApp 创建的 Vue 应用实例提供了 use 方法，用于安装插件或扩展 Vue 的功能。use 方法的作用是将插件或库集成到 Vue 应用中，使其可以在全局范围内使用。

```ts
import { createApp } from 'vue';

// 创建一个 Vue 应用实例
const app = createApp({
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    }
  }
});

// 链式调用：配置应用并绑定事件
app
  .component('MyButton', {
    template: `<button @click="handleClick">Click Me</button>`,
    methods: {
      handleClick() {
        this.$emit('custom-click');
      }
    }
  })
  .directive('highlight', {
    mounted(el) {
      el.style.backgroundColor = 'yellow';
    }
  })
  .mixin({
    created() {
      console.log('Mixin created hook');
    }
  })
  .mount('#app'); // 挂载到 DOM
```

### 解释

`createApp`:创建一个 Vue 应用实例。传入一个根组件配置对象，包含 data 和 methods。

**链式调用**

- `.component()`: 注册一个全局组件 MyButton，组件中定义了一个按钮，点击按钮时会触发 custom-click 事件。
- `.directive()`: 注册一个全局指令 highlight，当元素挂载时，背景颜色会变为黄色。
- `.mixin()`: 添加一个全局混入，在组件的 created 生命周期钩子中输出日志。
- `.mount()`: 将应用挂载到 DOM 中，挂载点为 `#app`。

**事件绑定**

在 `MyButton` 组件中，通过 `@click` 绑定了一个点击事件，触发时会调用 `handleClick` 方法，并通过` $emit` 触发 `custom-click` 事件。

在父组件中，可以通过监听 custom-click 事件来处理按钮点击逻辑。

### use 方法

`use`  方法是 Vue 应用实例的一个方法，用于安装插件。插件可以是一个对象（必须提供  `install`  方法），也可以是一个函数（会被直接调用）。Vue 会调用插件的  `install`  方法，并将 Vue 应用实例作为参数传递给它。

#### 语法

```javascript
app.use(plugin, options)
```

- **`plugin`**: 要安装的插件，可以是一个对象或函数。
- **`options`**: 可选的配置对象，传递给插件的  `install`  方法。

#### 实现 use

1. use 的逻辑

```js
function use(plugin, options) {
  if (typeof plugin.install === 'function') {
    // 如果插件是一个对象，并且提供了 install 方法
    plugin.install(this, options);
  } else if (typeof plugin === 'function') {
    // 如果插件是一个函数
    plugin(this, options);
  } else {
    throw new Error('Plugin must be a function or an object with an install method.');
  }
  return this; // 返回应用实例，支持链式调用
}
```

2. 使用

```js
// 自定义插件
const myPlugin = {
  install(app, options) {
    console.log('My plugin is installed with options:', options);
    // 添加全局方法或属性
    app.config.globalProperties.$myMethod = () => {
      console.log('Hello from my plugin!');
    };
    // 注册全局组件
    app.component('my-component', {
      template: '<div>My Custom Component</div>'
    });
  }
};

// 使用插件
createApp(App)
  .use(myPlugin, { someOption: true }) // 安装自定义插件
  .mount('#app');
```

## 实现链式调用

### 例题

限制用 JavaScript 实现：

```js
Student("Alice"); // 输出 I am Alice

Student("Alice").rest(10).learn("computer");
/* 输出
I am Alice
经过10秒后
After 10 seconds
Learning computer
*/

Student("Alice").restFirst(5).learn("Math");
/* 输出
I am Alice
经过5秒后
After 5 seconds
Learning Math
*/
```

### 代码

```js
class Student {
    constructor(name) {
        this.name = name;
        this.tasks = []; // 任务队列
        this.tasks.push(() => {
            console.log(`I am ${this.name}`);
            this.next(); // 执行下一个任务
        });
        setTimeout(() => this.next(), 0); // 异步启动任务队列
    }

    next() {
        const task = this.tasks.shift(); // 取出队列中的第一个任务
        task && task(); // 如果任务存在，则执行
    }

    rest(seconds) {
        this.tasks.push(() => {
            setTimeout(() => {
                console.log(`After ${seconds} seconds`);
                this.next(); // 执行下一个任务
            }, seconds * 1000);
        });
        return this; // 返回this以支持链式调用
    }

    restFirst(seconds) {
        this.tasks.unshift(() => {
            setTimeout(() => {
                console.log(`After ${seconds} seconds`);
                this.next(); // 执行下一个任务
            }, seconds * 1000);
        });
        return this; // 返回this以支持链式调用
    }

    learn(subject) {
        this.tasks.push(() => {
            console.log(`Learning ${subject}`);
            this.next(); // 执行下一个任务
        });
        return this; // 返回this以支持链式调用
    }
}

// 测试用例
new Student("Alice"); // 输出 I am Alice

new Student("Alice").rest(10).learn("computer");
/* 输出
I am Alice
经过10秒后
After 10 seconds
Learning computer
*/

new Student("Alice").restFirst(5).learn("Math");
/* 输出
I am Alice
经过5秒后
After 5 seconds
Learning Math
*/
```

## 发布订阅模式 vs 观察者模式

发布-订阅模式（Pub-Sub）和观察者模式（Observer）是两种常见的设计模式，它们都用于处理对象之间的通信和事件处理。

### **观察者模式（Observer Pattern）**

观察者模式定义了一种一对多的依赖关系，当一个对象（称为**Subject**，主题）的状态发生变化时，所有依赖于它的对象（称为**Observers**，观察者）都会收到通知并自动更新。

Subject

- 维护一个观察者列表。
- 提供注册（`attach`）和注销（`detach`）观察者的方法。
- 在状态变化时通知所有观察者（`notify`）。

Observer（观察者）

- 定义一个更新接口（`update`），用于接收主题的通知。

#### 代码示例

```js
class Subject {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify() {
        this.observers.forEach(observer => observer.update());
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.log(`${this.name} received an update!`);
    }
}

// 使用
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.attach(observer1);
subject.attach(observer2);

subject.notify(); // Observer 1 received an update! Observer 2 received an update!
```

### **发布-订阅模式（Pub-Sub Pattern）**

发布-订阅模式通过一个**事件中心**（Event Bus）来解耦发布者和订阅者。发布者将消息发布到事件中心，订阅者从事件中心订阅感兴趣的消息。发布者和订阅者之间没有直接的依赖关系。

#### 关键角色

**Publisher（发布者）**： 负责发布消息到事件中心。

**Subscriber（订阅者）**： 向事件中心订阅感兴趣的消息。

**Event Bus（事件中心）**：维护一个消息队列和订阅者列表；负责将消息分发给订阅者。

#### 代码示例

```js
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];  // 初始化事件队列
    }
    this.events[event].push(callback);
  }

  publish(event, data) {
    // 边界检查
    if (!this.events[event]) {
      return;
    }
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// 使用
const eventBus = new EventBus();

// 订阅者
eventBus.subscribe('news', data => {
  console.log(`Subscriber 1 received news: ${data}`);
});

eventBus.subscribe('news', data => {
  console.log(`Subscriber 2 received news: ${data}`);
});

// 发布者
eventBus.publish('news', 'Breaking news!');
// 输出：
// Subscriber 1 received news: Breaking news!
// Subscriber 2 received news: Breaking news!
```

### 主要区别

|      特性      |             观察者模式              |                          发布-订阅模式                           |
| :------------: | :---------------------------------: | :--------------------------------------------------------------: |
|  **通信方式**  |   直接通信（主题直接通知观察者）    |                     间接通信（通过事件中心）                     |
|   **耦合度**   |   强耦合（观察者和主题直接关联）    |                   松耦合（发布者和订阅者解耦）                   |
|    **角色**    | 主题（Subject）和观察者（Observer） | 发布者（Publisher）、订阅者（Subscriber）、事件中心（Event Bus） |
|  **适用场景**  |          简单的对象间通信           |                    复杂的系统，需要解耦的场景                    |
| **实现复杂度** |                简单                 |                             相对复杂                             |
| **同步/异步**  |            通常是同步的             |                           可以是异步的                           |

#### 应用

##### 观察者模式

- GUI 框架中的事件处理（如按钮点击事件）。
- 数据模型和视图之间的绑定（如 MVC 模式）。
- 简单的对象间通信场景。

##### 发布-订阅模式

- 消息队列系统（如 RabbitMQ、Kafka）。
- 事件驱动架构（如 Node.js 的 EventEmitter）。
- 需要解耦的复杂系统（如微服务之间的通信）。

