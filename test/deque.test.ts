import { Deque } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError";

it('Tests Deque', () => {
    const deque = new Deque<number>();

    const accessEmptyDeque = new InvalidOperationError("Unable to access element from Empty Deque");
    const popEmptyDeque = new InvalidOperationError("Unable to pop element from Empty Deque");

    expect(() => deque.front).toThrowError(accessEmptyDeque);
    expect(() => deque.popBack()).toThrowError(popEmptyDeque);
    expect(() => deque.popFront()).toThrowError(popEmptyDeque);

    deque.pushBack(3);                      // [ 3 ]
    deque.pushFront(1);                     // [ 1, 3 ]
    deque.pushBack(100);                    // [ 1, 3, 100 ]

    expect(deque.front).toBe(1);
    expect(deque.popFront()).toBe(1);       // [ 3, 100 ]

    expect(deque.back).toBe(100);
    expect(deque.popBack()).toBe(100);      // [ 3 ]

    expect(deque.size).toBe(1)
    
    expect(deque.front).toBe(3);
    expect(deque.back).toBe(3);
    expect(deque.popBack()).toBe(3);

    expect(() => deque.front).toThrowError(accessEmptyDeque);
    expect(() => deque.popBack()).toThrowError(popEmptyDeque);
    expect(() => deque.popFront()).toThrowError(popEmptyDeque);
    
    deque.pushBack(10);
    deque.pushBack(100);

    expect(deque.front).toBe(10);
    expect(deque.popFront()).toBe(10);

    expect(deque.front).toBe(100);
    expect(deque.popFront()).toBe(100);

    expect(() => deque.front).toThrowError(accessEmptyDeque);
    expect(() => deque.popFront()).toThrowError(popEmptyDeque);

    
    deque.pushBack(20);
    deque.pushBack(200);

    expect(deque.back).toBe(200);
    expect(deque.popBack()).toBe(200);

    expect(deque.back).toBe(20);
    expect(deque.popBack()).toBe(20);

    expect(() => deque.front).toThrowError(accessEmptyDeque);
    expect(() => deque.popBack()).toThrowError(popEmptyDeque);
});

it('Testing Deque Constructor', () => {
    const queue = new Deque<number>([1 , 2, 3]);

    expect(queue.front).toBe(1);
    expect(queue.back).toBe(3);
    expect(queue.popFront()).toBe(1);
    expect(queue.popBack()).toBe(3);

    expect(queue.front).toBe(2);
    expect(queue.back).toBe(2);
    expect(queue.popFront()).toBe(2);
});
