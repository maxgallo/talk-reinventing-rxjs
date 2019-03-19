const { from, merge,
    queueScheduler,
    asapScheduler,
    asyncScheduler,
} = require('rxjs');

const queueObservable = from(['queue'], queueScheduler);
const asapObservable  = from(['asap'],  asapScheduler);
const asyncObservable = from(['async'], asyncScheduler);

const observable = merge(
    asyncObservable,
    queueObservable,
    asapObservable,
);

observable.subscribe(console.log);

console.log('--> Subscribed!')

// queue
// --> Subscribed
// asap
// async
