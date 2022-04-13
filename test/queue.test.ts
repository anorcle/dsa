import { Queue } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError";

it('Tests Queue', () => {
    const queue = new Queue<number>();

    const accessEmptyQueue = new InvalidOperationError("Unable to access element from Empty Queue");
    const popEmptyQueue = new InvalidOperationError("Unable to pop element from empty queue");

    expect(() => queue.front).toThrowError(accessEmptyQueue);
    expect(() => queue.pop()).toThrowError(popEmptyQueue);

    queue.push(3);
    queue.push(1);
    queue.push(100);

    expect(queue.front).toBe(3);
    expect(queue.pop()).toBe(3);

    expect(queue.front).toBe(1);
    expect(queue.pop()).toBe(1);

    queue.push(50);
    
    expect(queue.front).toBe(100);
    expect(queue.pop()).toBe(100);

    expect(queue.front).toBe(50);
    expect(queue.pop()).toBe(50);

    expect(() => queue.front).toThrowError(accessEmptyQueue);
    expect(() => queue.pop()).toThrowError(popEmptyQueue);
    
    queue.push(10);
    queue.push(10);

    expect(queue.front).toBe(10);
    expect(queue.pop()).toBe(10);

    expect(queue.front).toBe(10);
    expect(queue.pop()).toBe(10);

    expect(() => queue.front).toThrowError(accessEmptyQueue);
    expect(() => queue.pop()).toThrowError(popEmptyQueue);
});
