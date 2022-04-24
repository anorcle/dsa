import { AVL } from "../src/index";
import type { Node } from "../src/BST";

const rand = (min: number, max: number): number => {
    return Math.floor(min + (max - min)*Math.random())
}

const compare = (array: number[], avl: AVL<number, null>): void => {
    array.sort((a, b) => a - b);
    let node = avl.find(array[0]);
    for(let i = 0; i < array.length; ++i) {
        if(node == null) {
            expect(node).not.toBeNull();
            continue;
        }
        expect(node.key).toBe(array[i]);
        node = avl.next(node);
    }

    node = avl.find(array[array.length - 1], true);
    for(let i = array.length - 1; node != null; --i) {
        expect(node.key).toBe(array[i]);
        node = avl.prev(node);
    }
}

it('Test AVL Operations', () => {
    const avl = new AVL<number, null>();

    let array: number[] = [10, 12, 15, 6, 7, 9, 5, 2, 4]

    array.forEach(elm => avl.insert(elm, null))
    compare(array, avl);

    avl.delete(10);
    compare([12, 15, 6, 7, 9, 5, 2, 4], avl);

    avl.delete(6);
    compare([12, 15, 7, 9, 5, 2, 4], avl);

    avl.delete(5);
    compare([12, 15, 7, 9, 2, 4], avl);
    
    avl.insert(19, null);
    compare([12, 15, 7, 9, 2, 4, 19], avl);

    avl.delete(12);
    avl.delete(7);
    avl.delete(9);
    avl.delete(2);
    compare([15, 4, 19], avl);

    avl.delete(15);
    avl.delete(19);
    avl.delete(4);
    
    
    avl.insert(100, null);
    compare([100], avl)

    avl.insert(99, null);
    avl.insert(0, null);
    compare([100, 99, 0], avl);
});

it('Test AVL Height', () => {
    const avl = new AVL<number, null>();

    for(let i = 0; i < 10000; ++i) {
        avl.insert(i, null);
    }
    expect(avl.height).toBe(14);
})

it('Test if all elements are present', () => {
    const avl = new AVL<number, null>();

    for(let i = 0; i < 10000; ++i) {
        avl.insert(i, null);
    }

    const array: number[] = [];

    const inorder = (root: Node<number, null> | null): void => {
        if(root == null) return;
        inorder(root.left);
        array.push(root.key);
        inorder(root.right);
    }

    inorder(avl.ROOT);

    for(let i = 0; i < 10000; ++i) {
        expect(array[i]).toBe(i);
    }
})