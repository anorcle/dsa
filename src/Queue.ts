import InvalidOperationError from '../errors/InvalidOperationError';

interface QueueElement<T> {
    value: T;
    next: QueueElement<T> | null;
}

class Queue<T> {
    private QUEUE_SIZE: number;
    private LAST_ELEMENT: QueueElement<T> | null;
    private FIRST_ELEMENT: QueueElement<T> | null;

    constructor(initialArray: T[] = []) {
        this.QUEUE_SIZE = 0;
        this.LAST_ELEMENT = null;
        this.FIRST_ELEMENT = null;

        initialArray.forEach((value) => this.push(value));
    }

    public get size(): number {
        return this.QUEUE_SIZE;
    }

    public get empty(): boolean {
        return this.size == 0;
    }

    public get front(): T | null {
        if (this.FIRST_ELEMENT === null) {
            throw new InvalidOperationError('Unable to access element from Empty Queue');
        }

        return this.FIRST_ELEMENT.value;
    }

    public push(value: T): number {
        const element: QueueElement<T> = {
            value: value,
            next: null,
        };

        if (this.size === 0 || this.LAST_ELEMENT === null || this.FIRST_ELEMENT === null) {
            this.FIRST_ELEMENT = element;
            this.LAST_ELEMENT = element;
            this.QUEUE_SIZE = 1;
            return this.size;
        }

        this.LAST_ELEMENT.next = element;
        this.LAST_ELEMENT = element;
        this.QUEUE_SIZE++;

        return this.size;
    }

    public pop(): T | null {
        if (this.FIRST_ELEMENT === null) {
            throw new InvalidOperationError('Unable to pop element from empty queue');
        }

        const value = this.FIRST_ELEMENT.value;
        this.FIRST_ELEMENT = this.FIRST_ELEMENT.next;
        this.QUEUE_SIZE--;

        return value;
    }
}

export default Queue;
