// const { from } = require('rxjs');
// const { map, filter } = require('rxjs/operators');
// const { map } = require('rxjs/operators');
const { filter } = require('rxjs/operators');


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

                    const dataObservable = new Observable({
                        call: observer => initialData.forEach(observer.next.bind(observer)),
                    });

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

const map = (mapFunction) => (sourceObservable) => {
    return sourceObservable.lift({
        call: observer => {
            sourceObservable.subscribe({
                next(value){
                    const newValue = mapFunction(value);
                    observer.next(newValue);
                },
                error(err) { observer.error(err) },
                complete() { observer.complete() },
            })
        }
    })
}

class Observable {
    constructor(operator) {
        this.operator = operator
    }
    subscribe(observer) {
        this.operator.call(observer, this.source)
    }
    lift(operator) {
        const obs = new Observable();
        obs.source = this;
        obs.operator = operator;
        return obs;
    }
}
// const pow = (n) => (source) =>
    // new Observable(observer => {
        // return source.subscribe({
            // next(x) {
                // observer.next(
                    // Math.pow(x, n)
                // );
            // },
            // error(err) { observer.error(err); },
            // complete() { observer.complete(); }
        // });
    // });

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
