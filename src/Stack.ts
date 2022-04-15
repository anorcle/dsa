import InvalidOperationError from '../errors/InvalidOperationError';

class Stack<T> {
    private array: T[];

    constructor(initialArray: T[] = []) {
        this.array = initialArray;
    }

    public get empty(): boolean {
        return this.array.length == 0;
    }

    public get top(): T {
        const value = this.array.at(-1);

        if (value == undefined) {
            throw new InvalidOperationError('Unable to access element from empty stack');
        } else {
            return value;
        }
    }

    public push(element: T): number {
        return this.array.push(element);
    }

    public pop(): T {
        const value = this.array.pop();

        if (value == undefined) {
            throw new InvalidOperationError('Unable to pop element from empty stack');
        } else {
            return value;
        }
    }
}

export default Stack;
