SyntaxError: Unexpected token 'N', "Not Found" is not valid JSON    at JSON.parse (<anonymous>)    at parseJSONFromBytes (node:internal/deps/undici/undici:5472:19)    at successSteps (node:internal/deps/undici/undici:5454:27)    at fullyReadBody (node:internal/deps/undici/undici:4381:9)    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)    at async consumeBody (node:internal/deps/undici/undici:5463:7)    at async fetchPokemon (C:\Users\Workstation\Desktop\Manara Tech\Manara-Tech-Frontend-Engineering-with-React\Course 6 Asynchronous JavaScript\2.Callbacks, Promises, and AsyncAwait\app.js:57:16) Node.js v20.17.0









##### 

const fetchPokemon = async (id) => {  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id})`);  const data = await res.json();  console.log(data); }; fetchPokemon(2);





الخطأ اللي يظهر عندك سببه أن الطلب (fetch) ما يرجع بيانات JSON صحيحة. في هذا الحالة، المشكلة غالبًا تكون من الـ **URL** الخاص بالـ API. شوف الكود المصحح:

### المشكلة:

1. إغلاق الـ URL

    فيه قوس زايد غير صحيح. شوف الجزء:

   ```
   jsCopy codefetch(`https://pokeapi.co/api/v2/pokemon/${id})`);
                                   // القوس هذا خطأ
   ```

2. تحتاج أيضًا تتحقق إن الطلب ناجح (status code 200) قبل ما تحاول تحويل الرد إلى JSON.

### الكود المصحح:

```
javascriptCopy codeconst fetchPokemon = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
    // تأكد أن الطلب ناجح
    if (!res.ok) {
      throw new Error(`Pokemon not found: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching Pokemon:', error.message);
  }
};

fetchPokemon(2);
```

### التعديلات:

1. **إزالة القوس الزايد** من الـ URL.
2. **إضافة try-catch** لمعالجة أي أخطاء.
3. **فحص إذا كان `res.ok`** للتحقق إذا كانت الاستجابة ناجحة.

الحين الكود لازم يشتغل بدون مشاكل، وإذا الـ API رجّع خطأ (مثل 404)، راح يعرض رسالة خطأ واضحة.







##### You said:

Callback function A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. The consumer of a callback-based API writes a function that is passed into the API. The provider of the API (called the caller) takes the function and calls back (or executes) the function at some point inside the caller's body. The caller is responsible for passing the right parameters into the callback function. The caller may also expect a particular return value from the callback function, which is used to instruct further behavior of the caller. There are two ways in which the callback may be called: synchronous and asynchronous. Synchronous callbacks are called immediately after the invocation of the outer function, with no intervening asynchronous tasks, while asynchronous callbacks are called at some point later, after an asynchronous operation has completed. Understanding whether the callback is synchronously or asynchronously called is particularly important when analyzing side effects. Consider the following example: js Copy to Clipboard let value = 1; doSomething(() => {  value = 2; }); console.log(value); If doSomething calls the callback synchronously, then the last statement would log 2 because value = 2 is synchronously executed; otherwise, if the callback is asynchronous, the last statement would log 1 because value = 2 is only executed after the console.log statement. Examples of synchronous callbacks include the callbacks passed to Array.prototype.map(), Array.prototype.forEach(), etc. Examples of asynchronous callbacks include the callbacks passed to setTimeout() and Promise.prototype.then(). The Using promises guide has more information on the timing of asynchronous callbacks.



###### ChatGPT said:

ChatGPT

معلوماتك صحيحة حول **الدوال التعاودية (Callback Functions)**. لو تحتاج شرح أعمق أو تطبيق عملي على هذا المفهوم، خلني أوضح بشكل أدق، خاصة مع أمثلة **تزامنية** و**غير تزامنية**.

------

### 1. **مثال على Callback متزامن (Synchronous Callback)**

هذا النوع من الـ **callback** يتم تنفيذه مباشرة بعد استدعاء الدالة الخارجية:

```
javascriptCopy codeconst numbers = [1, 2, 3];

// map يستدعي الـ callback مباشرة لكل عنصر
const doubled = numbers.map((num) => num * 2);

console.log(doubled); // [2, 4, 6]
```

- هنا، الـ **callback** يُستدعى فورًا لكل عنصر في المصفوفة. لا توجد عمليات غير متزامنة (Asynchronous)، لذلك كل شيء يحدث بشكل فوري.

------

### 2. **مثال على Callback غير متزامن (Asynchronous Callback)**

هذا النوع يتم تنفيذه لاحقًا بعد انتهاء عملية غير متزامنة مثل **setTimeout** أو **fetch**.

```
javascriptCopy codeconsole.log('Start');

setTimeout(() => {
  console.log('This is an asynchronous callback');
}, 2000); // يتم تنفيذ الـ callback بعد ثانيتين

console.log('End');
```

**النتيجة:**

```
sqlCopy codeStart
End
This is an asynchronous callback
```

- هنا، يتم تسجيل `Start` و`End` مباشرة. لكن **الدالة التعاودية** (callback) داخل `setTimeout` تُنفذ بعد ثانيتين، مما يوضح أنها **غير متزامنة**.

------

### 3. **فهم التزامن مع مثال متقدم**

```
javascriptCopy codelet value = 1;

const doSomething = (callback) => {
  console.log('Before callback');
  callback(); // استدعاء الدالة التعاودية
  console.log('After callback');
};

doSomething(() => {
  value = 2;
});

console.log(value);
```

- **النتيجة:**

```
mathematicaCopy codeBefore callback  
After callback  
2
```

بما أن الدالة `callback` هنا تُستدعى بشكل **متزامن**، يتم تنفيذها في نفس اللحظة التي يتم استدعاؤها فيها داخل `doSomething`. بالتالي، **value** تأخذ القيمة 2 مباشرة.

------

### 4. **تأثير الـ Callback غير متزامن**

```
javascriptCopy codelet value = 1;

const doSomethingAsync = (callback) => {
  setTimeout(callback, 1000); // استدعاء الـ callback بعد ثانية
};

doSomethingAsync(() => {
  value = 2;
});

console.log(value); // 1
```

- **النتيجة:**

```
Copy code
1
```

بسبب أن الدالة التعاودية هنا يتم تنفيذها بعد **ثانية** (غير متزامنة)، سيتم طباعة `1` أولًا لأن الكود يكمل تنفيذ باقي التعليمات قبل أن تصل الدالة إلى الـ callback.

------

### الخلاصة

- **Callbacks المتزامنة:** يتم تنفيذها فورًا أثناء استدعاء الدالة الخارجية.
- **Callbacks غير المتزامنة:** يتم تنفيذها لاحقًا بعد اكتمال عملية غير متزامنة، مثل `setTimeout` أو `fetch`.

هل عندك تطبيق عملي معين تحتاج مساعدة في تطويره باستخدام الـ callbacks؟







##### You said:

شرح اعمق من ذلك



###### ChatGPT said:

ChatGPT

يا خالد، خلّني أعطيك **فهم أعمق للدوال التعاودية (Callbacks)** بشكل يسهل عليك استيعاب الفرق بين التزامن واللاتزامن، وكيف يتم التعامل مع كل منهما بالتفصيل.

------

## **1. ما هو الـ Callback فعلًا؟**

**الدالة التعاودية (Callback function)** هي ببساطة دالة تُمرر كـ **معامل (argument)** إلى دالة أخرى. هذه الدالة الأخرى قد تستدعي الـ callback في **أي نقطة** من داخلها، وتتحكم متى تنفذها (مباشرة أو لاحقًا).

### **لماذا نحتاج الـ Callbacks؟**

- **إعادة استخدام الكود**: تسمح الدوال التعاودية بتنفيذ إجراءات متعددة بدون إعادة كتابة المنطق.
- **التعامل مع العمليات غير المتزامنة**: تساعد على التعامل مع عمليات تحتاج وقت، مثل طلبات HTTP أو تأخير زمني باستخدام `setTimeout`.

------

## **2. الفرق بين التزامن (Synchronous) واللاتزامن (Asynchronous)**

### **تزامني (Synchronous):**

- كل **سطر من الكود** يتم تنفيذه بالتسلسل.
- لا يُكمل البرنامج إلا بعد انتهاء العملية الحالية.

### **غير تزامني (Asynchronous):**

- يتم تشغيل الكود بشكل **موازي أو مؤجل** إلى أن تنتهي عملية معينة (مثل طلب HTTP).
- البرنامج لا يتوقف، ويواصل تنفيذ التعليمات التالية مباشرة.

------

## **3. التفسير عبر تنفيذ الكود خطوة بخطوة**

### **Callback متزامن (Synchronous Callback)**

#### مثال:

```
javascriptCopy codefunction greet(name) {
  console.log(`Hello, ${name}!`);
}

function processUserInput(callback) {
  const name = "خالد";
  callback(name); // يتم تنفيذ الـ callback فورًا
}

processUserInput(greet);
```

#### **الشرح خطوة بخطوة:**

1. `processUserInput` تستدعي الدالة `greet` مباشرة بعد تجهيز الاسم (`خالد`).
2. لا يوجد أي عملية متأخرة، لذلك يتم طباعة "Hello, خالد!" فورًا.

#### **النتيجة:**

```
Copy code
Hello, خالد!
```

------

### **Callback غير متزامن (Asynchronous Callback)**

#### مثال:

```
javascriptCopy codeconsole.log("Start");

setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000); // غير متزامن، ينفذ لاحقًا

console.log("End");
```

#### **الشرح خطوة بخطوة:**

1. يتم طباعة "Start".
2. يتم ضبط `setTimeout` لتشغيل الـ callback بعد ثانيتين، لكن الكود لا ينتظر.
3. يتم طباعة "End" مباشرة.
4. بعد ثانيتين، يتم تنفيذ **الـ callback** الموجود في `setTimeout`.

#### **النتيجة:**

```
sqlCopy codeStart  
End  
This runs after 2 seconds
```

------

## **4. فهم اللاتزامن بشكل أعمق مع Callbacks**

في البرمجة الحديثة، جزء كبير من العمليات تحتاج وقت، مثل:

- **طلب بيانات من خادم (API).**
- **التعامل مع الملفات.**
- **استعلامات قواعد البيانات.**

#### **مثال عملي: طلب API باستخدام Callback**

```
javascriptCopy codefunction fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Pikachu", type: "Electric" };
    callback(data); // يتم استدعاء الـ callback بعد انتهاء العملية
  }, 3000);
}

fetchData((pokemon) => {
  console.log(`Fetched Pokemon: ${pokemon.name}, Type: ${pokemon.type}`);
});
```

#### **الشرح خطوة بخطوة:**

1. `fetchData` تضبط مؤقتًا ليحاكي طلب بيانات يستغرق 3 ثوانٍ.
2. بعد 3 ثوانٍ، يتم استدعاء الـ **callback** وتمرير البيانات (`Pikachu`).
3. تتم طباعة **اسم البوكيمون ونوعه** بعد اكتمال الطلب.

#### **النتيجة:**

```
yaml


Copy code
Fetched Pokemon: Pikachu, Type: Electric
```

------

## **5. مشكلة Callback Hell (جحيم التعاود)**

عند استخدام **callbacks متداخلة**، يصبح الكود معقدًا وغير قابل للقراءة بسهولة.

#### **مثال على Callback Hell:**

```
javascriptCopy codesetTimeout(() => {
  console.log("Task 1 done");
  setTimeout(() => {
    console.log("Task 2 done");
    setTimeout(() => {
      console.log("Task 3 done");
    }, 1000);
  }, 1000);
}, 1000);
```

#### **النتيجة:**

```
arduinoCopy codeTask 1 done
Task 2 done
Task 3 done
```

- المشكلة هنا أن الكود يصبح **صعب القراءة والصيانة** عند الحاجة إلى استدعاء العديد من callbacks داخل بعضها.

------

## **6. حل مشكلة Callback Hell باستخدام Promises**

الـ **Promise** هي طريقة أفضل لإدارة العمليات غير المتزامنة.

#### **نفس المثال باستخدام Promise:**

```
javascriptCopy codefunction waitForTask(task, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${task} done`);
      resolve(); // يُخبر أن المهمة اكتملت
    }, ms);
  });
}

waitForTask("Task 1", 1000)
  .then(() => waitForTask("Task 2", 1000))
  .then(() => waitForTask("Task 3", 1000));
```

#### **الشرح:**

- كل مهمة تنتظر انتهاء المهمة التي قبلها باستخدام `then`، مما يجعل الكود **أسهل في القراءة**.

------

## **7. الخلاصة**

1. **Callbacks**: هي دوال تمرر كمعامل لدوال أخرى وتنفذ في وقت لاحق.
2. **التزامن**: يتم التنفيذ مباشرة (مثل `Array.map`).
3. **اللاتزامن**: يتم التنفيذ لاحقًا بعد انتهاء عملية (مثل `setTimeout`).
4. **Callback Hell**: مشكلة تحدث عند تداخل العديد من callbacks، ويمكن حلها باستخدام **Promises**.

------

### لو عندك أي جزء غير واضح، أو تحب نشوف مثال عملي مخصص لفكرة معينة، خبرني! 🌟