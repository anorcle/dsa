import { PriorityQueue } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError";

const compareNumber = (a: number, b: number): -1 | 0 | 1 => {
    if(a < b) return -1;
    if(a > b) return +1;
    return 0;
};

it('Tests PriorityQueue', () => {

    const pq = new PriorityQueue<number>(compareNumber);

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
    const pq = new PriorityQueue<number>(compareNumber, [1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 6, 9, 10, 11, 12, 13]);

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

type obj = {
    key: number,
    value: string
}

const compareObj = (a: obj, b: obj): -1 | 0 | 1 => {
    if(a.key < b.key) return -1;
    if(a.key > b.key) return +1;
    return 0;
};

it('Tests PriorityQueue of Objects', () => {

    const pq = new PriorityQueue<obj>(compareObj);

    const popEmptyPQ = new InvalidOperationError("PriorityQueue Error: Unable to pop from empty Queue");
    const readEmptyPQ = new InvalidOperationError("PriorityQueue Error: Unable to read from empty Queue");

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);

    pq.push({ key: 3, value: "Three"});
    pq.push({ key: 1, value: "One"});
    pq.push({ key: 100, value: "Hundred"}); // 100, 3, 1

    expect(pq.front).toEqual({ key: 100, value: "Hundred"});
    expect(pq.pop()).toEqual({ key: 100, value: "Hundred"});     // 3, 1

    expect(pq.front).toEqual({ key: 3, value: "Three"});
    expect(pq.pop()).toEqual({ key: 3, value: "Three"});       // 1

    pq.push({key: 50, value: "Fifty"});                    // 50, 1
    
    expect(pq.front).toEqual({key: 50, value: "Fifty"});
    expect(pq.pop()).toEqual({key: 50, value: "Fifty"});      // 1

    expect(pq.front).toEqual({key: 1, value: "One"});
    expect(pq.pop()).toEqual({key: 1, value: "One"});

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);
    
    pq.push({key: 10, value: "Ten"});
    pq.push({key: 10, value: "Ten"});

    expect(pq.front).toEqual({key: 10, value: "Ten"});
    expect(pq.pop()).toEqual({key: 10, value: "Ten"});

    expect(pq.front).toEqual({key: 10, value: "Ten"});
    expect(pq.pop()).toEqual({key: 10, value: "Ten"});

    expect(() => pq.front).toThrowError(readEmptyPQ);
    expect(() => pq.pop()).toThrowError(popEmptyPQ);
});