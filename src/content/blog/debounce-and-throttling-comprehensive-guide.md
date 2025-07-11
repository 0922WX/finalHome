---
pubDatetime: 2021-01-03
title: Debounce and Throttle Comprehensive Guide
slug: debounce-and-throttling-comprehensive-guide
featured: false
draft: true
tags:
  - tutorial
  - javascript
description: Every web developer must aware of Debounce and Throttle to maximize client performance.
---

## Table of Contents

When it's come to client-side optimization, **_Debounce_** and **_Throttling_** are one of the most important techniques that every web developer must have
in their toolboxes. Because web development not only consists of **_UI/UX_**. We should always bear in mind that we also optimize
our codes to use less-resource, for both client and server. Enough chit-chat! Let's get into it.

## Debounce

![debounce-gif](/blog-images/debounce-and-throttle-comprehensive-guide/debounce.gif)

[Debounce example](https://codesandbox.io/embed/debounce-example-jbybw?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview)

First, let's go over a use-case scenario to get a better understanding of **_Debounce_**. Imagine a case
where you have to optimize a **search bar**. As someone types into a **search bar**, the client makes
a request and fetches some data, let's suppose these are list of books, but here is the catch: As user
keeps typing, our search function instantly makes a request and fetches, by the way, this is not a wrong
way of doing things but makes too much burden for our backend services. Because, now, our services have
to fetch all-time until the user finishes typing this is costly both for the client and server.

### Example

```javascript
const debounce = (func, wait, immediate, args) => {
  let timeout;
  return () => {
    const callNow = immediate && !timeout;
    if (callNow) func.apply(null, args);

    const later = () => {
      timeout = undefined;
      if (!immediate) func.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const myEfficientFn = debounce(function () {
  console.log("Costly calculations.");
}, 1000);

window.addEventListener("resize", myEfficientFn);
```

In this example we are trying to debounce the resizing of the window. Our debounce function accepts few params such as a `func` which is a
function we are going to call after desired time passes, `wait`, `immediate` to not wait for debounced function, we pass `true`, and `args` to pass some extra arguments
to pass onto our inner function.

Then we need to define `timeout` for our [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). We should be able to access `timeout`
only from our inner functions and should pass itself to other function calls. Consider this example below.

### Closure

```javascript
const add = () => {
  let total = 0;
  return (a, b) => {
    console.log("Total value", total);
    total += a + b;
    return total;
  };
};

const letsAdd = add();
console.log(letsAdd(1, 2)); // Returns 3
console.log(letsAdd(4, 5)); // Returns 12
```

If it was a regular function, first would've returned 3 and second one would've returned 9, but second one returned 12 because we are adding to total
which keeps getting stored between function calls thanks to **closures** and [lexical scopes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Lexical_scoping).
So that why we've defined `timeout`. To not lose track of it. Then, inside our inner function we first check if user passed `immediate` if it's true, then we check
if our `timeout` has a value, then we call our function right away with `func.apply`.

### Function.Apply()

```javascript
Math.max(1, 2, 3, 4); // Will return 3

Math.max.apply(null, [1, 2, 3, 4]); // Will also return 3
```

If I have to explain `func.apply()` briefly: Since Javascript arrays do not have a method called `max()`.
In order to find a maximum value we either have to iterate over array or use apply. First argument is not really important if it's applied on functions,
but it's used when applied on Objects. Another example would be:

```javascript
const array = ["a", "b"];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

If you have to do it with array push, you would first iterate it over then push elements one-by-one. So, we use apply when we want o avoid iteration. And, also, we used
first argument. Because, we need a context to apply on. We pushed `elements` array to `array`. Okay, let's continue where we left off.

So, if it's `immediate` not passed in, we move onto our `setTimeout()`. Quick `setTimeout()` reminder.

### setTimeout()

```javascript
setTimeout(() => console.log("Hello World!"), 2000);
```

It will print out `Hello World!` after 2000 milliseconds passed. When usually people want to delay things `setTimeout()` is used.

Before we call `setTimeout()` we first call `clearTimeout()`. Reason is, if user resizes the window before the function
completes, and, then another debounce method gonna fire. So, to avoid such cases we use `clearTimeout()` to ensure there are no unfinished calls. Finally, we just wait `setTimeout()`
complete and call our `later()` function so we can invoke passed `func`.

### Debounce use cases:

- Don't make any axios requests until user stops typing.
- Don't do anything while user drags and drops.
- Wait until the user stops resizing the window.

## Throttle

![throttle-gif](/blog-images/debounce-and-throttle-comprehensive-guide/throttle.gif)

[Throttle example](https://codesandbox.io/embed/throttle-example-elzis?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview)

Throttle and debounce shares some similarities, but the throttle is another beast. Unlike debounce, throttle only allows a certain amount of actions within a given time.
Such as the example above. But, debounce waits until the process to be completed first, and only then proceeds to do the costly calculation.

### Example

```javascript
const throttle = (func, duration) => {
  let shouldWait = false;
  return (...args) => {
    if (!shouldWait) {
      func.apply(null, args);
      shouldWait = true;
      setTimeout(function () {
        shouldWait = false;
      }, duration);
    }
  };
};
```

This function looks similar to debounce, but now we are storing a boolean variable across function calls to ensure that our function cannot be called if it's already called.
Then, after we applied that function we toggle `shouldWait` to true. After a certain amount of time has passed, referencing `duration` here, then we toggle our `shouldWait` to false
to make our `throttle` function callable.

### Throttle use cases:

- Disable button click so users cannot spam.
- Throttling after mousemove.
- Throttling API calls.
