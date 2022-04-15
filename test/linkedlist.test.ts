import { LinkedList } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError"

it('Test LinkedList Operations', () => {
    const list = new LinkedList<number>();

    const elem2 = list.pushBack(2);     // 2
    const elem3 = list.pushFront(3);    // 3 <-> 2
    const elem5 = list.pushBack(5);     // 3 <-> 2 <-> 5
    const elem1 = list.pushFront(1);    // 1 <-> 3 <-> 2 <-> 5
    const elem4 = list.pushBack(4);     // 1 <-> 3 <-> 2 <-> 5 <-> 4

    expect(list.toArray()).toEqual([1, 3, 2, 5, 4])

    expect(list.back).toBe(4);
    expect(list.front).toBe(1);

    list.delete(elem5);                 // 1 <-> 3 <-> 2 <-> 4
    expect(list.size).toBe(4);

    list.popFront();                    // 3 <-> 2 <-> 4
    list.popBack();                     // 3 <-> 2
    expect(list.size).toBe(2);

    const elem80 = list.pushFront(80);  // 80 <-> 3 <-> 2
    const elem40 = list.pushBack(40);   // 80 <-> 3 <-> 2 <-> 40
    list.delete(elem3);                 // 80 <-> 2 <-> 40
    expect(list.size).toBe(3)

    // iterate and check from begining;
    let itr = list.frontElement;
    expect(itr.value).toBe(80);

    itr = itr.next;
    expect(itr.value).toBe(2);

    itr = itr.next;
    expect(itr.value).toBe(40);

    
    // iterate and check from end;
    itr = list.backElement;
    expect(itr.value).toBe(40);

    itr = itr.prev;
    expect(itr.value).toBe(2);

    itr = itr.prev;
    expect(itr.value).toBe(80);
});

it('Test LinkedList Errors', () => {
    
    const accessNextNullElementError = new InvalidOperationError("LinkedList Error: Accessing Next Element is Null");
    const accessPreviousNullElementError = new InvalidOperationError("LinkedList Error: Accessing Previous Element is Null");
    const accessFirstNullElementError = new InvalidOperationError("LinkedList Error: Accessing First Element, which is null");
    const accessLastNullElementError = new InvalidOperationError("LinkedList Error: Accessing Last Element, which is null");
    const popBackNullElementError = new InvalidOperationError("LinkedList Error: Pop Back Null Element");
    const popFrontNullElementError = new InvalidOperationError("LinkedList Error: Pop Front Null Element");

    const list = new LinkedList<number>();

    list.pushBack(2);                   // 2
    list.pushFront(3);                  // 3 <-> 2
    list.pushBack(5);                   // 3 <-> 2 <-> 5

    // iterate and check from begining;
    let itr = list.frontElement;
    expect(itr.value).toBe(3);

    itr = itr.next;
    expect(itr.value).toBe(2);

    itr = itr.next;
    expect(itr.value).toBe(5);

    expect(() => itr.next).toThrowError(accessNextNullElementError);

    // clear list from end;
    list.popBack();
    list.popBack();
    list.popBack();

    expect(list.size).toBe(0);
    expect(() => list.front).toThrowError(accessFirstNullElementError);
    expect(() => list.back).toThrowError(accessLastNullElementError);
    expect(() => list.popBack()).toThrowError(popBackNullElementError);
    expect(() => list.popFront()).toThrowError(popFrontNullElementError);


    // put back elements
    list.pushBack(2);                   // 2
    list.pushFront(3);                  // 3 <-> 2
    list.pushBack(5);                   // 3 <-> 2 <-> 5

    // iterate and check from end;
    itr = list.backElement;
    expect(itr.value).toBe(5);

    itr = itr.prev;
    expect(itr.value).toBe(2);

    itr = itr.prev;
    expect(itr.value).toBe(3);

    expect(() => itr.prev).toThrowError(accessPreviousNullElementError);

    // clear list from start;
    list.popFront();
    list.popFront();
    list.popFront();

    expect(list.size).toBe(0);
    expect(() => list.front).toThrowError(accessFirstNullElementError);
    expect(() => list.back).toThrowError(accessLastNullElementError);
    expect(() => list.popBack()).toThrowError(popBackNullElementError);
    expect(() => list.popFront()).toThrowError(popFrontNullElementError);
});

it('Test LinkedList delete Function', () => {
    const list = new LinkedList<number>();

    const elem2 = list.pushBack(2);
    const elem100 = list.pushBack(100);
    const elem99 = list.pushBack(99);
    const elem60 = list.pushBack(60);
    const elem20 = list.pushBack(20);

    list.delete(elem2);
    expect(list.toArray()).toEqual([100, 99, 60, 20]);

    list.delete(elem20);
    expect(list.toArray()).toEqual([100, 99, 60]);

    list.delete(elem99);
    expect(list.toArray()).toEqual([100, 60]);

    list.delete(elem100);
    expect(list.toArray()).toEqual([60]);

    list.delete(elem60);
    expect(list.toArray()).toEqual([]);
});