// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');
// const { map } = require('rxjs/operators');
// const { filter } = require('rxjs/operators');
// const { Observable } = require('rxjs');


// observer
// {
//    next: () => {},
//    error: () => {},
//    complete: () => {},
// }

// sourceObservable --> currentObservable --> observer

function from(initialData){
    return {
        pipe: (...pipeFunctions) => {
            return {
                subscribe: (onNext, onError, onComplete) => {
                    const dataObservable = new Observable(
                        observer => initialData.forEach(observer.next.bind(observer)),
                    );

                    let currentObservable = dataObservable;

                    pipeFunctions.forEach(( pipeFunc, i ) => {
                        currentObservable = pipeFunc(currentObservable)
                    })

                    currentObservable.subscribe({
                        next: onNext,
                        error: onError,
                        onComplete: onComplete,
                    });

                    onComplete();
                }
            }
        }
    }
}

const map = (mapFunction) => (source) => {
    return new Observable(
        observer => {
            source.subscribe({
                next(value){
                    const newValue = mapFunction(value);
                    observer.next(newValue);
                },
                error(err) { observer.error(err) },
                complete() { observer.complete() },
            })
        }
    )
}

const filter = (filterFunction) => (source) => {
    return new Observable(
        observer => {
            source.subscribe({
                next(value){
                    if(filterFunction(value)) {
                        observer.next(value);
                    }
                },
                error(err) { observer.error(err) },
                complete() { observer.complete() },
            })
        }
    )
}

class Observable {
    constructor(operator) {
        this.operator = operator
    }
    subscribe(observer) {
        // if (typeof this.operator === 'object') { // for lib compatibility
            // return this.operator.call(observer, this.source)
        // }
        this.operator(observer)
    }
    // lift(operator) { // just for Lib compatibility
        // const obs = new Observable();
        // obs.source = this;
        // obs.operator = operator;
        // return obs;
    // }
}

const observable = from([1, 2, 3, 4, 5])
    .pipe(
        map(x => x + 1),
        filter(x => x % 2 === 0),
        map(x => x - 1),
    );

observable.subscribe(
    val => console.log('odd: ', val),
    error => console.error('ERR:', error),
    () => console.log('Completed!'),
);
