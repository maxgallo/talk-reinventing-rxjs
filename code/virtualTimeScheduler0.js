const { interval } = require('rxjs');
const { take, filter } = require('rxjs/operators');
const { VirtualTimeScheduler } = require('rxjs');

const scheduler = new VirtualTimeScheduler();

const source = interval(1000, scheduler)
    .pipe(take(10));

source.subscribe(
    console.log,
    console.err,
    () => console.log('--> Completed!'),
);
console.log('--> Subscribed!')

scheduler.flush()
