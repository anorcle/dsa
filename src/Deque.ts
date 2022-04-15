import InvalidOperationError from '../errors/InvalidOperationError';
import { LinkedList } from './index';

class Deque<T> {
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

    public get front(): T {
        if (this.list.size == 0) {
            throw new InvalidOperationError('Unable to access element from Empty Deque');
        }
        return this.list.front;
    }

    public get back(): T {
        if (this.list.size == 0) {
            throw new InvalidOperationError('Unable to access element from Empty Deque');
        }
        return this.list.back;
    }

    public pushBack(value: T): number {
        this.list.pushBack(value);
        return this.list.size;
    }

    public pushFront(value: T): number {
        this.list.pushFront(value);
        return this.list.size;
    }

    public popBack(): T {
        if (this.list.size == 0) {
            throw new InvalidOperationError('Unable to pop element from Empty Deque');
        }
        return this.list.popBack();
    }

    public popFront(): T {
        if (this.list.size == 0) {
            throw new InvalidOperationError('Unable to pop element from Empty Deque');
        }
        return this.list.popFront();
    }
}

export default Deque;
