import InvalidOperationError from "../errors/InvalidOperationError";

class LinkedListElement<T> {
    private $VALUE: T;
    private $NEXT: LinkedListElement<T> | null;
    private $PREV: LinkedListElement<T> | null;

    constructor(value: T) {
        this.$VALUE = value;
        this.$NEXT = null;
        this.$PREV = null;
    }

    public get next(): LinkedListElement<T> {
        if(this.$NEXT == null) {
            throw new InvalidOperationError("LinkedList Error: Accessing Next Element is Null");
        }
        return this.$NEXT;
    }

    public get hasNext(): Boolean {
        return this.$NEXT != null;
    }

    public get prev(): LinkedListElement<T> {
        if(this.$PREV == null) {
            throw new InvalidOperationError("LinkedList Error: Accessing Previous Element is Null");
        }
        return this.$PREV;
    }

    public get hasPrev(): Boolean {
        return this.$PREV != null;
    }

    public get value(): T {
        return this.$VALUE;
    }

    public set next(element: LinkedListElement<T> | null) {
        this.$NEXT = element;
    }

    public set prev(element: LinkedListElement<T> | null) {
        this.$PREV = element;
    }

    public set value(value: T) {
        this.$VALUE = value;
    }
}

class LinkedList<T> {

    private LINKEDLIST_SIZE: number;
    private LAST_ELEMENT: LinkedListElement<T> | null;
    private FIRST_ELEMENT: LinkedListElement<T> | null;

    constructor(initialArray: T[] = []) {
        this.LINKEDLIST_SIZE = 0;
        this.LAST_ELEMENT = null;
        this.FIRST_ELEMENT = null;

        initialArray.forEach(value => this.pushBack(value));
    }

    private initializeWith(element: LinkedListElement<T>) {
        this.FIRST_ELEMENT = element;
        this.LAST_ELEMENT = element;
        this.LINKEDLIST_SIZE = 1;
    }

    public get size(): number {
        return this.LINKEDLIST_SIZE;
    }

    public get empty(): boolean {
        return this.size == 0;
    }

    public get frontElement(): LinkedListElement<T> {
        if (this.FIRST_ELEMENT === null) {
            throw new InvalidOperationError("LinkedList Error: Accessing First Element, which is null");
        }
        return this.FIRST_ELEMENT;
    }

    public get backElement(): LinkedListElement<T> {
        if (this.LAST_ELEMENT === null) {
            throw new InvalidOperationError("LinkedList Error: Accessing Last Element, which is null");
        }
        return this.LAST_ELEMENT;
    }

    public get front(): T {
        return this.frontElement.value;
    }

    public get back(): T {
        return this.backElement.value;
    }

    public pushBack(value: T): LinkedListElement<T> {

        const last = new LinkedListElement<T>(value);

        if (this.size === 0 || this.LAST_ELEMENT === null || this.FIRST_ELEMENT === null) {
            this.initializeWith(last);
            return last;
        }

        const secondLast = this.LAST_ELEMENT;
        this.LAST_ELEMENT = last;

        secondLast.next = last;
        last.prev = secondLast;
        this.LINKEDLIST_SIZE++;

        return last;
    }

    public pushFront(value: T): LinkedListElement<T> {
        const first = new LinkedListElement<T>(value);

        if (this.size === 0 || this.LAST_ELEMENT === null || this.FIRST_ELEMENT === null) {
            this.initializeWith(first)
            return first;
        }

        const second = this.FIRST_ELEMENT;
        this.FIRST_ELEMENT = first;
    
        second.prev = first;
        first.next = second;
        this.LINKEDLIST_SIZE++;

        return first;
    }

    public insertBefore(target: LinkedListElement<T>, value: T): LinkedListElement<T> {

        if(target == this.FIRST_ELEMENT) {
            return this.pushFront(value);
        }

        const element = new LinkedListElement<T>(value);
        const prev = target.prev;

        prev.next = element;
        element.next = target;
    
        target.prev = element;
        element.prev = prev;

        return element;
    }

    public insertAfter(target: LinkedListElement<T>, value: T): LinkedListElement<T> {

        if(target == this.LAST_ELEMENT) {
            return this.pushBack(value);
        }

        const element = new LinkedListElement<T>(value);
        const next = target.next;

        target.next = element;
        element.next = next;

        next.prev = element;
        element.prev = target;

        return element;
    }

    public popBack(): T {

        if (this.LAST_ELEMENT === null) {
            throw new InvalidOperationError("LinkedList Error: Pop Back Null Element");
        }

        const target = this.LAST_ELEMENT;

        if(this.size === 1) {
            this.LAST_ELEMENT = null;
            this.FIRST_ELEMENT = null;
        }
        else {
            this.LAST_ELEMENT = target.prev;
            // remove linkage for garbage collection
            this.LAST_ELEMENT.next = null;
            target.prev = null;
        }

        this.LINKEDLIST_SIZE--;

        return target.value;
    }

    public popFront(): T {

        if (this.FIRST_ELEMENT === null) {
            throw new InvalidOperationError("LinkedList Error: Pop Front Null Element");
        }

        const target = this.FIRST_ELEMENT;

        if(this.size == 1) {
            this.LAST_ELEMENT = null;
            this.FIRST_ELEMENT = null;
        }
        else {
            this.FIRST_ELEMENT = target.next;
            // remove linkage for garbage collection
            this.FIRST_ELEMENT.prev = null;
            target.next = null;
        }

        this.LINKEDLIST_SIZE--;

        return target.value;
    }

    public delete(target: LinkedListElement<T>) {
        const prev = target.hasPrev ? target.prev : null;
        const next = target.hasNext ? target.next : null;

        if(prev && next) {
            // A <-> T <-> B
            prev.next = next; // A -> B
            next.prev = prev; // B -> A
        }
        else if(next) {
            // NULL <-> T <-> B
            this.FIRST_ELEMENT = next; // B
            next.prev = null;
        }
        else if(prev) {
            // A <-> T <-> NULL
            this.LAST_ELEMENT = prev; // A
            prev.next = null;
        }
        else {
            // NULL <-> T <-> NULL
            this.FIRST_ELEMENT = null;
            this.LAST_ELEMENT = null;
        }

        this.LINKEDLIST_SIZE--;

        // Dereference for garbage collection
        target.next = null;
        target.prev = null;
    }

    public toArray(): T[] {
        const result: T[] = [];

        let itr = this.FIRST_ELEMENT;
        if(itr) result.push(itr.value);

        while(itr?.hasNext) {
            itr = itr.next;
            result.push(itr.value);
        }
        
        return result;
    }
}

// C++ Equivalent Alias Methods
interface LinkedList<T> {
    push_back: typeof LinkedList.prototype.pushBack;
    push_front: typeof LinkedList.prototype.pushFront;
    insert_before: typeof LinkedList.prototype.insertBefore;
    insert_after: typeof LinkedList.prototype.insertAfter;
    pop_back: typeof LinkedList.prototype.popBack;
    pop_front: typeof LinkedList.prototype.popFront;
    remove: typeof LinkedList.prototype.delete;
}

LinkedList.prototype.push_back = LinkedList.prototype.pushBack;
LinkedList.prototype.push_front = LinkedList.prototype.pushFront;
LinkedList.prototype.insert_before = LinkedList.prototype.insertBefore;
LinkedList.prototype.insert_after = LinkedList.prototype.insertAfter;
LinkedList.prototype.pop_back = LinkedList.prototype.popBack;
LinkedList.prototype.pop_front = LinkedList.prototype.popFront;
LinkedList.prototype.remove = LinkedList.prototype.delete;

export default LinkedList;