import { PriorityQueue } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError";

it('Tests PriorityQueue', () => {
    const pq = new PriorityQueue<number>();

    const popEmptyPQ = new InvalidOperationError("PriorityQueue Error: Unable to pop from empty Queue");
    const readEmptyPQ = new InvalidOperationError("PriorityQueue Error: Unable to read from empty Queue");

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);

    pq.push(3);
    pq.push(1);
    pq.push(100);                   // 100, 3, 1

    expect(pq.front).toBe(100);
    expect(pq.pop()).toBe(100);     // 3, 1

    expect(pq.front).toBe(3);
    expect(pq.pop()).toBe(3);       // 1

    pq.push(50);                    // 50, 1
    
    expect(pq.front).toBe(50);
    expect(pq.pop()).toBe(50);      // 1

    expect(pq.front).toBe(1);
    expect(pq.pop()).toBe(1);

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);
    
    pq.push(10);
    pq.push(10);

    expect(pq.front).toBe(10);
    expect(pq.pop()).toBe(10);

    expect(pq.front).toBe(10);
    expect(pq.pop()).toBe(10);

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);
});

it('Testing Priority Queue Constructor', () => {
    const pq = new PriorityQueue<number>([1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 6, 9, 10, 11, 12, 13]);

    expect(pq.pop()).toBe(13);
    expect(pq.pop()).toBe(12);
    expect(pq.pop()).toBe(11);
    expect(pq.pop()).toBe(10);
    expect(pq.pop()).toBe(9);
    expect(pq.pop()).toBe(8);

    pq.push(1000);
    pq.push(100);
    pq.push(900);

    expect(pq.pop()).toBe(1000);
    expect(pq.pop()).toBe(900);
    expect(pq.pop()).toBe(100);

    expect(pq.pop()).toBe(7);
    expect(pq.pop()).toBe(6);
    expect(pq.pop()).toBe(6);
    expect(pq.pop()).toBe(5);
    expect(pq.pop()).toBe(4);
    expect(pq.pop()).toBe(3);
    expect(pq.pop()).toBe(3);
    expect(pq.pop()).toBe(2);
    expect(pq.pop()).toBe(2);
    expect(pq.pop()).toBe(1);
});
