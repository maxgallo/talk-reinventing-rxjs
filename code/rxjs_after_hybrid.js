// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');
const { filter } = require('rxjs/operators');

class Observable{
    constructor(operator){
        this.operator = operator;
    }
    subscribe(observer){
        if (typeof this.operator === 'object') {
            return this.operator.call(observer, this.source);
        }
        this.operator(observer);
    }
    lift(operator){
        const obs = new Observable;
        obs.source = this;
        obs.operator = operator;
        return obs;
    }
}

const map = (mapFunction) => (sourceObservable) => {
    return new Observable(
        observer => {
            sourceObservable.subscribe({
                next: (value) => {
                    const newValue = mapFunction(value);
                    observer.next(newValue)
                },
                complete: observer.complete,
                error: observer.error
            })
        }
    )
}

// const filter = (filterFunction) => (sourceObservable) => {
    // return new Observable(
        // observer => {
            // sourceObservable.subscribe({
                // next: (value) => {
                    // if (filterFunction(value)){
                        // observer.next(value)
                    // }
                // },
                // error: observer.error,
                // complete: observer.complete,
            // })
        // }
    // )
// }

const from = (initialData) => ({
    pipe: (...pipeFunctions) => ({
        subscribe(observer) {
            const dataObservable = new Observable(
                observer => {
                    initialData.forEach(observer.next)
                }
            )

            let currentObservable = dataObservable;

            pipeFunctions.forEach(pipeFunc => {
                currentObservable = pipeFunc(currentObservable);
            })

            currentObservable.subscribe(observer);
            observer.complete()
        }
    })
})

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        filter(x => x % 2 === 0),
        map(x => x - 1),
    );

observable.subscribe({
    next     : val   => console.log('odd: ', val),
    error    : error => console.error(error),
    complete : ()    => console.log('DONE!'),
});












