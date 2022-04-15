import InvalidOperationError from '../errors/InvalidOperationError';
import { LinkedList } from './index';

class Queue<T> {
    private list: LinkedList<T>;

    constructor(initialArray: T[] = []) {
        this.list = new LinkedList<T>(initialArray);
    }

    public get size(): number {
        return this.list.size;
    }

    public get empty(): boolean {
        return this.list.size == 0;
    }

    public get front(): T | null {
        if (this.list.size == 0) {
            throw new InvalidOperationError('Unable to access element from Empty Queue');
        }
        return this.list.front;
    }

    public push(value: T): number {
        this.list.pushBack(value);
        return this.list.size;
    }

    public pop(): T | null {
        if (this.list.size === 0) {
            throw new InvalidOperationError('Unable to pop element from empty queue');
        }
        return this.list.popFront();
    }
}

export default Queue;
