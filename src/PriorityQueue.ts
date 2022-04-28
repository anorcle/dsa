import InvalidOperationError from './errors/InvalidOperationError.js';
import type { compare } from './types/index.js';

class PriorityQueue<T> {
    private $ARRAY: T[];
    protected compare: compare<T>;
    constructor(compare: compare<T>, array: T[] = []) {
        this.compare = compare;
        this.$ARRAY = [];
        array.forEach(this.push.bind(this));
    }

    public get size(): number {
        return this.$ARRAY.length;
    }

    private parentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private leftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    private rightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    private swap(i: number, j: number): void {
        const temp = this.$ARRAY[i];
        this.$ARRAY[i] = this.$ARRAY[j];
        this.$ARRAY[j] = temp;
    }

    private shiftUp(node: number): void {
        let parent = this.parentIndex(node);

        while (node > 0 && this.compare(this.$ARRAY[parent], this.$ARRAY[node]) == -1) {
            this.swap(parent, node);
            node = parent;
            parent = this.parentIndex(node);
        }
    }

    private shiftDown(node: number): void {
        let maxIndex = node;
        const left = this.leftChildIndex(node);
        const right = this.rightChildIndex(node);

        if (left < this.size && this.compare(this.$ARRAY[left], this.$ARRAY[maxIndex]) == 1) {
            maxIndex = left;
        }

        if (right < this.size && this.compare(this.$ARRAY[right], this.$ARRAY[maxIndex]) == 1) {
            maxIndex = right;
        }

        if (node !== maxIndex) {
            this.swap(node, maxIndex);
            this.shiftDown(maxIndex);
        }
    }

    public push(value: T): void {
        const index = this.size;
        this.$ARRAY.push(value);
        this.shiftUp(index);
    }

    public pop(): T {
        if (this.size == 0) {
            throw new InvalidOperationError('PriorityQueue Error: Unable to pop from empty Queue');
        }

        const result = this.$ARRAY[0];
        this.$ARRAY[0] = this.$ARRAY[this.size - 1];
        this.$ARRAY.pop();

        this.shiftDown(0);

        return result;
    }

    public top(): T {
        if (this.size == 0) {
            throw new InvalidOperationError('PriorityQueue Error: Unable to read from empty Queue');
        }
        return this.$ARRAY[0];
    }

    public get front(): T {
        return this.top();
    }

    public get toArray(): T[] {
        return this.$ARRAY.slice();
    }
}

export default PriorityQueue;
