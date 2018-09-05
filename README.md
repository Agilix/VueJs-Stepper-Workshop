# myef-onboarding-proto

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Notes

### Directives
#### v-if 
`<div v-if="shown">i might be shown</div>`

**Also supports else:**
```html
<h1 v-if="ok">Yes</h1>
<h1 v-else-if="ko">No</h1>
<h1 v-else>What?</h1>
```
Also supports `v-else-if="foo == 'bar'"`

**Grouping with invisible wrapper <template>**
```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
The `<template>` tag will never render, it's just a way to group multiple nodes

#### v-show
Pretty much the same as `$el.show() / $el.hide()` in jQuery. toggles the `display` CSS property

*Note this is not supported on <template>*


#### v-for
 ```html
<li v-for="todo of todos">{{todo}}</li>
```

Will also iterate on objects. **BUT!** the order is not guaranteed. It depends in JS implementation.

#### v-on:<event>
```html
<button v-on:click="doSomething">do</button>

<!-- you can also pass arguments -->
<button v-on:click="sayHi('Caroline')">Caroline</button>
<!-- but then the DOM event is not passed, to pass it use: -->
<button v-on:click="sayHi('Caroline', $event)">Caroline</button>

<!-- shorthand: -->
<button @click="doSomething">do</button>
``` 

##### Event modifiers
Never write `e.preventDefault` anymore !

```html
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form v-on:submit.prevent></form>

<!-- the click event will be triggered at most once -->
<a v-on:click.once="doThis"></a>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div v-on:click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div v-on:click.self="doThat">...</div>
```





#### v-model 
Two way binding:
```html
<p>{{ message }}</p>
<input v-model="message">
```

#### v-bind 
```html
<div v-bind:id="dynamicId"></div>
<a v-bind:href="url"></a>

<!-- shorthand: -->
<a :href="url"></a>
```

**Object syntax:**
```html
<div v-bind:class="{ active: isActive }"></div>
```
if `data.isActive` is true, div will get class `active`


**Mix it all!**
```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```
both `class` and `v-bind:class` can work together

**Also works with computed properties:**
```html
<div v-bind:class="classObject"></div>
```
```javascript
new Vue({
    data: {
      isActive: true,
      error: null
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
})

```




#### v-once
```html
<span v-once>This will never change: {{ msg }}</span>
```



#### v-html
```html
<div v-html="rawHtml"></div>
```
🚨 **Dangerous** - use as last resort








## Vue instance
```javascript
const vm = new Vue({
    el: '#app',
    data: {
        foo:'bar',
        firstName: 'john',
        lastName: 'doe'
    },
    computed: { // cached. only re-evalute when dependencies change
        superFoo: function() {
            return 'SUPER ' + this.foo.toUpperCase() + ' !';
        },
        fullName: { // you can even define the getter/setter !!
            get: function() {
                return this.firstName + ' ' + this.lastName;
            },
            set: function(full) {
                [this.firstName, this.lastName] = full.split(' ');
            }
        }
    },
    methods: { // not cached. methods are always re-evaluated
        superizeFoo: function(event) {
            // event is the native DOM event
            return 'SUPER ' + this.foo.toUpperCase() + ' !'
        }
    },
    watch: {} // can' you use a computed property ?
              // this is mostly useful for async operations
});
```

### special attributes
```javascript
vm.$data.foo === vm.foo; // true

vm.$router // the router

vm.$watch('foo', function (newValue, oldValue) {
  // This function will be called when `vm.foo` changes
  // but again, you should probably be using a computed property
})
```


## Components

### Register a component
```javascript
Vue.component('my-component', {
    
    // data must be a function
    // otherwise all instances will share the same data object 
    data: function() {
        return {
            counter: 0
        }
    },
    
    // declare the props
    // props are data passed from parent Vue instances
    props: ['message'],
    
    // props can also be declared with validation:
    props: {
        count: Number, // type check, multiple also work: [Number, String]
                       // type is not limited to native JS types, constructors can also be used
        important: {
            type: String,
            required: true, 
            default: 'wtf' // default can also be a function
        },
        weirdCase: {
            // custom validator
            validator: function(val) {
                return val.length > 3 && !val.includes('!')
            }
        }
    },
    
    // like data, the prop can be used inside templates and
    // is also made available in the vm as this.message
    template: '<span>{{ message }}</span>'
})
```

A string can then be passed to the component:
```html
<my-component message="123"></my-component>

<!-- note that while the above passes a string, you can use v-bind to get it JS evaluated: -->
<my-component v-bind:message="123"></my-component>
<!-- this will be passed as an actual Number -->
```


### Dynamics props
```html
<div>
  <input v-model="parentMsg">
  <br>
  <my-component v-bind:my-message="parentMsg"></my-component>
</div>
```



## Events

Every Vue instance implements an events interface. (completely custom, it's not aliases for addEventListener, etc...)

* Listen using `$on(eventName)`
* Trigger using `$emit(eventName [, arguments])`

```html
div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```

```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
```

