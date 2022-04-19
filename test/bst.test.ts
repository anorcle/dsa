import { BST } from "../src/index";

it('Test BST Operations', () => {
    const bst = new BST<number, null>();

    const array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => {
        bst.insert(elm, null);
    })

    array.sort();
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

});