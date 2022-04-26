import { compare } from './types';

class Node<T> {
    public parent: Node<T> | null;
    public left: Node<T> | null;
    public right: Node<T> | null;
    public data: T;
    public height: number;

    constructor(data: T) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class BST<T> {
    protected $ROOT: Node<T> | null;
    protected compare: compare<T>;
    constructor(compare: compare<T>) {
        this.$ROOT = null;
        this.compare = compare;
    }

    public get height(): number {
        return this.$ROOT?.height || 0;
    }

    private leftDescendant(node: Node<T>): Node<T> {
        if (node.left == null) {
            return node;
        } else {
            return this.leftDescendant(node.left);
        }
    }

    private rightDescendant(node: Node<T>): Node<T> {
        if (node.right == null) {
            return node;
        } else {
            return this.rightDescendant(node.right);
        }
    }

    /**
     * ## Get Right Ancestor of a Node
     * @param node The reference node
     * @returns The ancestor of a node with the next largest data | null if right ancestor doesn't exists
     */
    private rightAncestor(node: Node<T>): Node<T> | null {
        if (node.parent == null) {
            return null;
        }

        if (this.compare(node.data, node.parent.data) == -1) {
            return node.parent;
        } else {
            return this.rightAncestor(node.parent);
        }
    }

    /**
     * ## Get Left Ancestor of a Node
     * @param node The reference node
     * @returns The ancestor of a node with the next largest data | null if right ancestor doesn't exists
     */
    private leftAncestor(node: Node<T>): Node<T> | null {
        if (node.parent == null) {
            return null;
        }

        if (this.compare(node.data, node.parent.data) >= 0) {
            return node.parent;
        } else {
            return this.leftAncestor(node.parent);
        }
    }

    protected adjustHeight(node: Node<T> | null): void {
        if (node == null) return;

        node.height = Math.max(node.left?.height || 0, node.right?.height || 0) + 1;

        this.adjustHeight(node.parent);
    }

    /**
     * ## Find Node with `data` in BST
     * It find the node with the given data and if node doesn't exists it return null
     * @param data target data to search
     * @param end Get first occurrence of node
     * @returns Node in BST | Null if node not found
     */
    public findNode(data: T, end = false, root: Node<T> | null = this.$ROOT): Node<T> | null {
        if (root == null) {
            return null;
        }

        if (end && this.compare(data, root.data) == 0 && root.right) {
            const newRef = this.findNode(data, end, root.right);
            return newRef?.data == root.data ? newRef : root;
        } else if (this.compare(data, root.data) == 0) {
            return root;
        } else if (this.compare(data, root.data) == -1) {
            return this.findNode(data, end, root.left);
        } else {
            return this.findNode(data, end, root.right);
        }
    }

    /**
     * ## Find Insertion Point for new Node in BST
     * It find the node with the given data and if node doesn't exists it return the position
     * where the node can be inserted.
     * @param data target data to insert
     * @returns Node in BST | Null if tree is empty
     */
    protected insertionPoint(data: T, root: Node<T> | null = this.$ROOT): Node<T> | null {
        if (root == null) {
            return null;
        }

        if (this.compare(data, root.data) == 0 && root.right) {
            return this.insertionPoint(data, root.right);
        } else if (this.compare(data, root.data) == 0) {
            return root;
        } else if (this.compare(data, root.data) == -1) {
            return this.insertionPoint(data, root.left) || root;
        } else {
            return this.insertionPoint(data, root.right) || root;
        }
    }

    /**
     * ## Get Next Node in BST
     * @param node The reference node
     * @returns Inorder Successor | null if current node is largest
     */
    public next(node: Node<T>): Node<T> | null {
        if (node.right != null) {
            return this.leftDescendant(node.right);
        } else {
            return this.rightAncestor(node);
        }
    }

    /**
     * ## Get Previous Node in BST
     * @param node The reference node
     * @returns Inorder Predecessor | null if current node is smallest
     */
    public prev(node: Node<T>): Node<T> | null {
        if (node.left != null) {
            return this.rightDescendant(node.left);
        } else {
            return this.leftAncestor(node);
        }
    }

    /**
     * ## Search List of Nodes
     * @param start staring value for search
     * @param end ending value for search
     * @returns A list of nodes within range [`start`, `end`]
     */
    public rangeSearch(start: T, end: T): Node<T>[] {
        const list: Node<T>[] = [];
        let node = this.findNode(start);

        while (node && this.compare(node.data, end) <= 0) {
            if (this.compare(node.data, start) >= 0) {
                list.push(node);
            }
            node = this.next(node);
        }

        return list;
    }

    public insert(data: T): Node<T> {
        const node = new Node<T>(data);
        const ref = this.insertionPoint(data);

        if (ref == null) {
            this.$ROOT = node;
            return node;
        }

        if (this.compare(ref.data, data) == 1) {
            ref.left = node;
            node.parent = ref;
        } else {
            ref.right = node;
            node.parent = ref;
        }

        this.adjustHeight(node);
        return node;
    }

    public deleteElement(target: Node<T>): void {
        const left = target.left;
        const right = target.right;

        if (right == null) {
            // promote left
            if (target.parent) {
                if (target.parent.left == target) {
                    target.parent.left = left;
                } else {
                    target.parent.right = left;
                }
            } else {
                this.$ROOT = left;
            }
            if (left) left.parent = target.parent;
            this.adjustHeight(target);

            // dereference target
            target.parent = target.left = target.right = null;
        } else {
            const successor = this.next(target);
            if (!successor) throw new Error('BST Error: Unexpected Bug!');

            // replace target with it's successor
            target.data = successor.data;

            // remove successor and promote right
            if (successor.parent) {
                if (successor.parent.left == successor) {
                    successor.parent.left = successor.right;
                } else {
                    successor.parent.right = successor.right;
                }
            }
            if (successor.right) successor.right.parent = successor.parent;
            this.adjustHeight(target);
        }
    }

    public delete(data: T): void {
        const ref = this.findNode(data);
        if (ref == null || this.compare(ref.data, data) != 0) {
            // tree empty or element not found
            return;
        }
        this.deleteElement(ref);
    }

    private inorder(root: Node<T> | null, array: T[] = []): T[] {
        if (root == null) return array;
        this.inorder(root.left, array);
        array.push(root.data);
        this.inorder(root.right, array);
        return array;
    }

    public get toArray(): T[] {
        return this.inorder(this.$ROOT, []);
    }
}

export default BST;
export type { Node };
