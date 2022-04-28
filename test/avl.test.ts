import { AVL } from "../src/index";
import InvalidOperationError from '../src/errors/InvalidOperationError';

const compareArray = (array: number[], avl: AVL<number>): void => {
    array.sort((a, b) => a - b);
    let node = avl.findNode(array[0]);
    for(let i = 0; i < array.length; ++i) {
        if(node == null) {
            expect(node).not.toBeNull();
            continue;
        }
        expect(node.data).toBe(array[i]);
        node = avl.next(node);
    }

    node = avl.findNode(array[array.length - 1], true);
    for(let i = array.length - 1; node != null; --i) {
        expect(node.data).toBe(array[i]);
        node = avl.prev(node);
    }
}

const compareNumber = (a: number, b: number): -1 | 0 | 1 => {
    if(a < b) return -1;
    if(a > b) return +1;
    return 0;
};

it('Test AVL Operations', () => {
    const avl = new AVL<number>(compareNumber);

    let array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => avl.insert(elm))
    compareArray(array, avl);

    avl.delete(10);
    compareArray([12, 15, 6, 7, 9, 5, 2, 4], avl);

    avl.delete(6);
    compareArray([12, 15, 7, 9, 5, 2, 4], avl);

    avl.delete(5);
    compareArray([12, 15, 7, 9, 2, 4], avl);
    
    avl.insert(19);
    compareArray([12, 15, 7, 9, 2, 4, 19], avl);

    avl.delete(12);
    avl.delete(7);
    avl.delete(9);
    avl.delete(2);
    compareArray([15, 4, 19], avl);

    avl.delete(15);
    avl.delete(19);
    avl.delete(4);
    
    
    avl.insert(100);
    compareArray([100], avl)

    avl.insert(99);
    avl.insert(0);
    compareArray([100, 99, 0], avl);
});

it('Test AVL Height', () => {
    const avl = new AVL<number>(compareNumber);

    for(let i = 0; i < 10000; ++i) {
        avl.insert(i);
    }
    expect(avl.height).toBe(14);
})

it('Test if all elements are present in forward direction', () => {
    const avl = new AVL<number>(compareNumber);

    for(let i = 0; i < 10000; ++i) {
        avl.insert(i);
    }

    const array: number[] = avl.toArray;

    for(let i = 0; i < 10000; ++i) {
        expect(array[i]).toBe(i);
    }
})

it('Test if all elements are present in backward direction', () => {
    const avl = new AVL<number>(compareNumber);

    for(let i = 10000; i > 0; --i) {
        avl.insert(i);
    }

    const array: number[] = avl.toArray;

    for(let i = 0; i < 10000; ++i) {
        expect(array[i]).toBe(i + 1);
    }
})

it('Test Duplicate Prevention', () => {
    const avl = new AVL<number>(compareNumber);
    const duplicateKeyError = new InvalidOperationError('AVL Error: Duplicate Keys not Allowed!')

    let array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => avl.insert(elm))

    expect(() => avl.insert(2)).toThrowError(duplicateKeyError);
})

type obj = {
    key: number,
    value: string
}

const compareObj = (a: obj, b: obj): -1 | 0 | 1 => {
    if(a.key < b.key) return -1;
    if(a.key > b.key) return +1;
    return 0;
};

it('Test AVL tree with Object', () => {
    const avl = new AVL<obj>(compareObj);

    for(let i = 10000; i > 0; --i) {
        avl.insert({key: i, value: String(i)});
    }

    const array: obj[] = avl.toArray;

    for(let i = 0; i < 10000; ++i) {
        expect(array[i]).toEqual({key: i+1, value: String(i+1)});
    }
})