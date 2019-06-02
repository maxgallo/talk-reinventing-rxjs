const { from } = require('rxjs');
const { map, filter } = require('rxjs/operators');

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        filter(x => x % 2 === 0),
        map(x => x - 1),
    );

observable.subscribe({
    next     : val   => console.log('odd: ', val),
    error    : error => console.error(error),
    complete : ()    => console.log('Completed'),
});
