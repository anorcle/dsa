import { BST } from "../src/index";

const rand = (min: number, max: number): number => {
    return Math.floor(min + (max - min)*Math.random())
}

const compare = (array: number[], bst: BST<number, null>): void => {
    array.sort((a, b) => a - b);
    let node = bst.find(array[0]);
    for(let i = 0; i < array.length; ++i) {
        if(node == null) {
            expect(node).not.toBeNull();
            continue;
        }
        expect(node.key).toBe(array[i]);
        node = bst.next(node);
    }

    node = bst.find(array[array.length - 1], true);
    for(let i = array.length - 1; node != null; --i) {
        expect(node.key).toBe(array[i]);
        node = bst.prev(node);
    }
}

it('Test BST Operations', () => {
    const bst = new BST<number, null>();

    let array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => bst.insert(elm, null))
    compare(array, bst);

    bst.delete(10);
    compare([12, 15, 6, 7, 9, 5, 2, 4], bst);

    bst.delete(6);
    compare([12, 15, 7, 9, 5, 2, 4], bst);

    bst.delete(5);
    compare([12, 15, 7, 9, 2, 4], bst);
    
    bst.insert(19, null);
    compare([12, 15, 7, 9, 2, 4, 19], bst);

    bst.delete(12);
    bst.delete(7);
    bst.delete(9);
    bst.delete(2);
    compare([15, 4, 19], bst);

    bst.delete(15);
    bst.delete(19);
    bst.delete(4);
    
    
    bst.insert(100, null);
    compare([100], bst)

    bst.insert(99, null);
    bst.insert(0, null);
    compare([100, 99, 0], bst);
});

it('Test BST with duplicate keys', () => {
    const bst = new BST<number, null>();

    let array: number[] = [10, 10, 5, 6, 10, 9, 5, 2, 4, 4]

    array.forEach(elm => bst.insert(elm, null))
    compare(array, bst);

    bst.delete(10);
    compare([10, 5, 6, 10, 9, 5, 2, 4, 4], bst);

    bst.delete(6);
    compare([10, 5, 10, 9, 5, 2, 4, 4], bst);

    bst.delete(5);
    compare([10, 10, 9, 5, 2, 4, 4], bst);
    
    bst.insert(9, null);
    compare([10, 10, 9, 5, 2, 4, 4, 9], bst);

    bst.delete(10);
    bst.delete(5);
    bst.delete(4);
    compare([10, 9, 2, 4, 9], bst);

    bst.delete(10);
    bst.delete(9);
    bst.delete(2);
    bst.delete(4);
    bst.delete(9);
    
    
    bst.insert(100, null);
    compare([100], bst)

    bst.insert(99, null);
    bst.insert(0, null);
    compare([100, 99, 0], bst);

    bst.insert(100, null);
    bst.insert(99, null);
    bst.insert(0, null);
    compare([100, 99, 0, 100, 99, 0], bst);
});

it('Test with randomized Data Set', () => {
    const bst = new BST<number, null>();

    const array = [];

    for(let i = 0; i < 10000; ++i) {
        const num = rand(0, 100);
        bst.insert(num, null);
        array.push(num);
    }
    array.sort();
    compare(array, bst);

    for(let i = 0; i < 1000; ++i) {
        const num = rand(0, 100);
        bst.delete(num);

        const index = array.indexOf(num);
        if (index > -1) {
            array.splice(index, 1);
        }

    }
    compare(array, bst);
})

it('Test Range Search', () => {
    const bst = new BST<number, null>();

    const array = [];

    for(let i = 0; i < 10000; ++i) {
        const num = rand(0, 100);
        bst.insert(num, null);
        array.push(num);
    }
    array.sort();
    compare(array, bst);

    let num1 = rand(0, 100);
    let num2 = rand(0, 100);

    [num1, num2] = [Math.min(num1, num2), Math.max(num1, num2)];

    let start = array.indexOf(num1);

    // same num
    const rangeResult1 = bst.rangeSearch(num1, num1);
    for(let i = 0; i < rangeResult1.length; ++i) {
        expect(rangeResult1[i].key).toBe(array[start + i]);
    }

    // different num
    const rangeResult2 = bst.rangeSearch(num1, num2);
    for(let i = 0; i < rangeResult2.length; ++i) {
        expect(rangeResult2[i].key).toBe(array[start + i]);
    }

})

it('Test Height of BST', () => {
    const bst = new BST<number, null>();

    let array: number[] = [10, 10, 5, 6, 10, 9, 5, 2, 4, 4]

    array.forEach(elm => bst.insert(elm, null))

    expect(bst.height).toBe(5);

    bst.delete(4);
    expect(bst.height).toBe(4);

    bst.delete(4);
    expect(bst.height).toBe(4);

    bst.delete(6);
    expect(bst.height).toBe(4);

    bst.delete(9);
    expect(bst.height).toBe(3);

    bst.delete(10);
    expect(bst.height).toBe(3);

    bst.delete(10);
    expect(bst.height).toBe(3);

    bst.delete(10);
    expect(bst.height).toBe(2);
    
    bst.delete(5);
    expect(bst.height).toBe(2);
    
    bst.delete(2);
    expect(bst.height).toBe(1);

    bst.delete(5);
    expect(bst.height).toBe(0);

})