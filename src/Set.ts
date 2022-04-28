import { AVL } from './index.js';
import type { Node } from './BST.js';
import type { compare } from './types/index.js';

class Set<T> extends AVL<T> {
    constructor(compare: compare<T>) {
        super(compare);
    }

    public insert(data: T): Node<T> {
        const node = this.findNode(data);
        if (node) {
            node.data = data;
            return node;
        }
        return super.insert(data);
    }

    public find(data: T): T | null {
        const node = super.findNode(data);
        return node ? node.data : null;
    }
}

export default Set;
