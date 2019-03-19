const { interval } = require('rxjs');
const { take, filter } = require('rxjs/operators');

const source = interval(1000)
    .pipe(take(3600));

source.subscribe(
    console.log,
    console.err,
    () => console.log('--> Completed!'),
);

console.log('--> Subscribed!')
