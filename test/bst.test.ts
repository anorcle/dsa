import { BST } from "../src/index";

it('Test BST Operations', () => {
    const bst = new BST<number, null>();

    const compare = (array: number[]): void => {
        array.sort((a, b) => a - b);
        let node = bst.find(array[0]);
        for(let i = 0; node != null; ++i) {
            expect(node.key).toBe(array[i]);
            node = bst.next(node);
        }

        node = bst.find(array[array.length - 1]);
        for(let i = array.length - 1; node != null; --i) {
            expect(node.key).toBe(array[i]);
            node = bst.prev(node);
        }
    }

    let array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => bst.insert(elm, null))
    compare(array);

    bst.delete(10);
    compare([12, 15, 6, 7, 9, 5, 2, 4]);

    bst.delete(6);
    compare([12, 15, 7, 9, 5, 2, 4]);

    bst.delete(5);
    compare([12, 15, 7, 9, 2, 4]);
    
    bst.insert(19, null);
    compare([12, 15, 7, 9, 2, 4, 19]);

    bst.delete(12);
    bst.delete(7);
    bst.delete(9);
    bst.delete(2);
    compare([15, 4, 19]);

    bst.delete(15);
    bst.delete(19);
    bst.delete(4);
    
    
    bst.insert(100, null);
    compare([100])

    bst.insert(99, null);
    bst.insert(0, null);
    compare([100, 99, 0]);

});