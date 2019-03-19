# [fit] Reinventing __RxJS__


[.footer: @_maxgallo ]
^ - rise your hand if you use RxJS in production

---

![right](images/me.jpg)

# Hi 👋🏻
#[fit] I'm __Max__ Gallo

_About me:_ 🍝 💻 🇬🇧 🎶 🏍 📷 ✈️ ✍️

_Principal Engineer_ @ DAZN

<br />

_twitter:_ @\_maxgallo
_more:_ maxgallo.io

---

[.build-lists: true]

#[fit] Here's __the Agenda__
<br/>
  
1. Introduction
- _Reinventing_ RxJS
- _Deep Dive_ Schedulers

---

![fill](images/bg.jpg)
# Introduction

---

#[fit] Introducing __RxJS__
<br/>

_Part of the_ Reactive X _Family_

> API for asynchronous programming
with observable streams

---

![right](images/me1996.jpg)

# [fit] Reinventing
## [fit] the wheel

## _by_

# __taking things apart__

^ - This is me when I was six
- I like to understand things by taking them apart
- and watch inside to understand how they work

---

![fill](images/bg.jpg)
#[fit] Reinventing __RxJS__

---

![inline fit](codeImages/rxjs_light.png)

---

[.build-lists: true]
# __RxJS__ code _first impressions_

<br/>

- Syntax _is library specific_
- Explicit Subscription
- Observable _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_
- Pipeline operator _[TC39 stage 1](https://github.com/tc39/proposals#stage-1)_

^ MutationObserver is a method for observing and reacting to changes to the DOM.
It's already available in many browser.

---

### 💡 _let's reinvent_ RxJS

---

# __RxJS__ Operators

<br />
<br />
<br />
<br />
<br />
<br />
_Operator_ 1 _-->_> _Operator_ 2 _-->_> _Operator_ 3

![original 150%](diagrams/rxjsCode/rxjsCode.pdf)

---

[.build-lists: true]
# __RxJS__ *from the inside*


- _Made of_ reusable parts > **Streams**
- custom operators
- Lazy evaluation
- Standard contract _between parts_
- Synchronous _by default_ > **Schedulers**

<!--

---

# __RxJS *Deep Dive*__ Cold & Hot Observables

❄️ Cold Observable _The producer is inside the observer_ 

🔥 Hot Observable _The producer is outside the observer_

-->

---

![fill](images/bg.jpg)
#[fit] Deep Dive __Schedulers__

---

![fit](codeImages/scheduler_light.png)

---

![left fit](codeImages/scheduler_light.png)

# __**Console**__

![inline](codeImages/output.png)

---

> Schedulers in RxJS are things that control _**the order of event emissions**_ (to Observers) and _**the speed of those event**_ emissions.
-- André Staltz

---

#[fit] __**Order**__ of event emissions
#[fit] __**Speed**__ of event emissions

---

Queue __*/*__ Asap __*/*__ Async __*/*__ AnimationFrame __*/*__ VirtualTime

---

```
                     requestAnimationFrame(task)
                                 |
                                 |
Promise.resolve().then(task)     |
			|                    |
```

Queue __*/*__ Asap __*/*__ Async __*/*__ AnimationFrame __*/*__ VirtualTime

```
     |             |                          |
synchronous        |                          | 
                   |                          |
           setInterval(task, delay)           |
                                             ???
```

---

<br />

#[fit] __*Virtual Time*__ scheduler 


__**Bending Time:**__ Hands on 🙌 example

---

![fill](images/bg.jpg)
# Recap

---

# __**>**__ Destroy 🧨

### _Tear things apart to understand what's going on_

--- 

# __**>**__ Reinvent 👷‍♀️

### _Build your own version_

---

# __**>**__ Learn
### _And Bend time of course_ ⏱

---

Destroy __*/*__ Reinvent __*/*__ Learn

#[fit] Thank __you__ 🙏

<br />

_slides_ [github.com/maxgallo/talk-reinventing-rxjs](https://github.com/maxgallo/talk-reinventing-rxjs)

_twitter_ @\_maxgallo
_other_ maxgallo.io


