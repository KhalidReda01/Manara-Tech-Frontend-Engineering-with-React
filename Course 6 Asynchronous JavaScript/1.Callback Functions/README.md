# Callback function

A **callback function** is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

The consumer of a callback-based API writes a function that is passed into the API. The provider of the API (called the *caller*) takes the function and calls back (or executes) the function at some point inside the caller's body. The caller is responsible for passing the right parameters into the callback function. The caller may also expect a particular return value from the callback function, which is used to instruct further behavior of the caller.

There are two ways in which the callback may be called: *synchronous* and *asynchronous*. Synchronous callbacks are called immediately after the invocation of the outer function, with no intervening asynchronous tasks, while asynchronous callbacks are called at some point later, after an [asynchronous](https://developer.mozilla.org/en-US/docs/Glossary/Asynchronous) operation has completed.

Understanding whether the callback is synchronously or asynchronously called is particularly important when analyzing side effects. Consider the following example:

jsCopy to Clipboard

```
let value = 1;

doSomething(() => {
  value = 2;
});

console.log(value);
```

If `doSomething` calls the callback synchronously, then the last statement would log `2` because `value = 2` is synchronously executed; otherwise, if the callback is asynchronous, the last statement would log `1` because `value = 2` is only executed after the `console.log` statement.

Examples of synchronous callbacks include the callbacks passed to [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), etc. Examples of asynchronous callbacks include the callbacks passed to [`setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout) and [`Promise.prototype.then()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then).

The [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#timing) guide has more information on the timing of asynchronous callbacks.

لـ **Callback Function** هي دالة يتم تمريرها كـ **وسيط (argument)** إلى دالة أخرى، ويتم استدعاؤها داخل هذه الدالة لاستكمال مهمة معينة. بمعنى أن الدالة التي تستقبل الـ callback مسؤولة عن استدعاء الدالة الممررة في الوقت المناسب.

------

## **كيف تعمل الـ Callback Function؟**

### 1. المستهلك (Consumer):

هذا هو الجزء الذي يقوم بكتابة الـ **callback function** وتمريرها كوسيط إلى دالة أخرى.

### 2. المزود (Caller):

هذه هي الدالة التي تستقبل الـ callback وتقوم باستدعائها. قد تقوم بتمرير بعض القيم إلى الـ callback أثناء استدعائه، وقد تتوقع منها نتيجة تستخدمها لاتخاذ خطوات إضافية.

------

## **أنواع الـ Callback:**

1. **Synchronous Callback (تزامني):**
   يتم استدعاء الـ callback مباشرة بعد استدعاء الدالة التي تحتوي عليه، بدون أي تأخيرات أو عمليات غير متزامنة.

   **مثال:**

   ```
   javascriptCopy codelet numbers = [1, 2, 3];
   numbers.forEach(num => console.log(num));
   ```

   - في المثال هذا، يتم استدعاء الـ callback (الدالة التي تطبع الأرقام) بشكل **تزامني** لكل عنصر في المصفوفة.

2. **Asynchronous Callback (غير تزامني):**
   يتم استدعاء الـ callback في وقت لاحق، بعد اكتمال عملية غير متزامنة (مثل المؤقت أو جلب البيانات من خادم).

   **مثال:**

   ```
   javascriptCopy codeconsole.log('Start');
   
   setTimeout(() => {
     console.log('This is the callback');
   }, 2000);
   
   console.log('End');
   ```

   - هنا، يتم طباعة `'Start'` و `'End'` أولاً، ثم بعد ثانيتين يتم استدعاء الـ callback وطباعة `'This is the callback'`. هذا لأنه **غير تزامني**.

------

## **أهمية التفرقة بين التزامني وغير التزامني:**

### مثال:

```
javascriptCopy codelet value = 1;

doSomething(() => {
  value = 2;
});

console.log(value);
```

- **إذا كان استدعاء الـ callback تزامنيًا:**
  سيتم تعديل `value` إلى 2 قبل تنفيذ `console.log(value)`، وبالتالي ستتم طباعة 2.
- **إذا كان استدعاء الـ callback غير تزامني:**
  سيتم تنفيذ `console.log(value)` قبل تعديل `value` إلى 2، وبالتالي ستتم طباعة 1.

------

## **أمثلة على الـ Callbacks:**

- **تزامني:**
  - `Array.prototype.map()`
  - `Array.prototype.forEach()`
- **غير تزامني:**
  - `setTimeout()`
  - `Promise.prototype.then()`

------

### **الخلاصة:**

- **Callback Function** هي آلية قوية للتحكم في ترتيب تنفيذ الكود.
- من المهم أن تعرف متى يتم استدعاء الـ callback (تزامني أو غير تزامني) لفهم كيفية تأثيره على باقي الكود.