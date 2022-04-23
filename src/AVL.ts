import { BST } from "./index";
import type { Node } from './BST';

class AVL<K, V> extends BST<K, V> {
    constructor() {
        super();
    }

    private rotateRight(node: Node<K, V>): void {
        const parent = node.parent;
        const left = node.left;
        const lRight = node.left?.right;

        if(left) {
            left.parent = parent;
            left.right = node;
            node.parent = left;
            node.left = lRight ? lRight : null;
        }
    }

    private rotateLeft(node: Node<K, V>): void {
        const parent = node.parent;
        const right = node.right;
        const rLeft = node.right?.left;

        if(right) {
            right.parent = parent;
            right.left = node;
            node.parent = right;
            node.right = rLeft ? rLeft : null;
        }
    }

    private rebalance(node: Node<K, V>): void {
        const parent = node.parent;
        if(parent == null) return;
    }

    public insert(key: K, value: V): Node<K, V> {
        const node = super.insert(key, value);
        this.rebalance(node);
        return node;
    }

    public delete(key: K): void {
        const ref = this.find(key);
        if (ref == null || ref.key != key) {
            // tree empty or element not found
            return;
        }
        this.deleteElement(ref);
        const parentOfReplacingElement = this.insertionPoint(key);
        if(parentOfReplacingElement)
            this.rebalance(parentOfReplacingElement);
    }
}

export default AVL;