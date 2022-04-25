import { BST } from './index';
import type { Node } from './BST';
import type { compare } from './types/compare';
import InvalidOperationError from '../errors/InvalidOperationError';

class AVL<K, V> extends BST<K, V> {
    constructor(compare: compare<K>) {
        super(compare);
    }

    private rotateRight(node: Node<K, V>): void {
        const parent = node.parent;
        const left = node.left;
        const lRight = node.left?.right;

        if (left) {
            left.parent = parent;
            left.right = node;

            node.parent = left;
            node.left = lRight ? lRight : null;

            if (lRight) lRight.parent = node;
            if (parent) {
                if (parent.right == node) parent.right = left;
                else parent.left = left;
            }

            this.adjustHeight(node);
            if (parent == null) {
                this.$ROOT = left;
            }
        }
    }

    private rotateLeft(node: Node<K, V>): void {
        const parent = node.parent;
        const right = node.right;
        const rLeft = node.right?.left;

        if (right) {
            right.parent = parent;
            right.left = node;

            node.parent = right;
            node.right = rLeft ? rLeft : null;

            if (rLeft) rLeft.parent = node;
            if (parent) {
                if (parent.right == node) parent.right = right;
                else parent.left = right;
            }

            this.adjustHeight(node);

            if (parent == null) {
                this.$ROOT = right;
            }
        }
    }

    private rebalanceRight(node: Node<K, V>): void {
        const left = node.left;
        if (left == null) throw new Error('AVL Error: Unexpected Error!');

        const lRHeight = left.right?.height || 0;
        const lLHeight = left.left?.height || 0;

        if (lRHeight > lLHeight) {
            this.rotateLeft(left);
        }

        this.rotateRight(node);
    }

    private rebalanceLeft(node: Node<K, V>): void {
        const right = node.right;
        if (right == null) throw new Error('AVL Error: Unexpected Error!');

        const rLHeight = right.left?.height || 0;
        const rRHeight = right.right?.height || 0;

        if (rLHeight > rRHeight) {
            this.rotateRight(right);
        }

        this.rotateLeft(node);
    }

    private rebalance(node: Node<K, V>): void {
        const leftHeight = node.left?.height || 0;
        const rightHeight = node.right?.height || 0;

        if (leftHeight > rightHeight + 1) {
            this.rebalanceRight(node);
        } else if (rightHeight > leftHeight + 1) {
            this.rebalanceLeft(node);
        }

        if (node.parent) this.rebalance(node.parent);
    }

    public insert(key: K, value: V): Node<K, V> {
        if (this.find(key)) {
            throw new InvalidOperationError('AVL Error: Duplicate Keys not Allowed!');
        }

        const node = super.insert(key, value);
        this.rebalance(node);
        return node;
    }

    public delete(key: K): void {
        const ref = this.find(key);
        if (ref == null || this.compare(ref.key, key) != 0) {
            // tree empty or element not found
            return;
        }
        this.deleteElement(ref);
        const parentOfReplacingElement = this.insertionPoint(key);
        if (parentOfReplacingElement) this.rebalance(parentOfReplacingElement);
    }
}

export default AVL;
