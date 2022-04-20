class Node<K, V> {
    public parent: Node<K, V> | null;
    public left: Node<K, V> | null;
    public right: Node<K, V> | null;
    public key: K;
    public value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class BST<K, V> {
    private $ROOT: Node<K, V> | null;
    constructor() {
        this.$ROOT = null;
    }

    private leftDescendant(node: Node<K, V>): Node<K, V> {
        if (node.left == null) {
            return node;
        } else {
            return this.leftDescendant(node.left);
        }
    }

    private rightDescendant(node: Node<K, V>): Node<K, V> {
        if (node.right == null) {
            return node;
        } else {
            return this.leftDescendant(node.right);
        }
    }

    /**
     * ## Get Right Ancestor of a Node
     * @param node The reference node
     * @returns The ancestor of a node with the next largest key | null if right ancestor doesn't exists
     */
    private rightAncestor(node: Node<K, V>): Node<K, V> | null {
        if (node.parent == null) {
            return null;
        }

        if (node.key < node.parent.key) {
            return node.parent;
        } else {
            return this.rightAncestor(node.parent);
        }
    }

    /**
     * ## Get Left Ancestor of a Node
     * @param node The reference node
     * @returns The ancestor of a node with the next largest key | null if right ancestor doesn't exists
     */
    private leftAncestor(node: Node<K, V>): Node<K, V> | null {
        if (node.parent == null) {
            return null;
        }

        if (node.key > node.parent.key) {
            return node.parent;
        } else {
            return this.leftAncestor(node.parent);
        }
    }

    /**
     * ## Find Node in BST
     * It find the node with the given key and if node doesn't exists it return the position
     * where the node can be inserted.
     * @param key target key to search
     * @returns Node in BST | Null if tree is empty
     */
    public find(key: K, root: Node<K, V> | null = this.$ROOT): Node<K, V> | null {
        if (root == null) {
            return null;
        }

        if (key == root.key) {
            return root;
        } else if (key > root.key) {
            return this.find(key, root.right) || root;
        } else {
            return this.find(key, root.left) || root;
        }
    }

    /**
     * ## Get Next Node in BST
     * @param node The reference node
     * @returns Inorder Successor | null if current node is largest
     */
    public next(node: Node<K, V>): Node<K, V> | null {
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
    public prev(node: Node<K, V>): Node<K, V> | null {
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
    public rangeSearch(start: K, end: K): Node<K, V>[] {
        const list: Node<K, V>[] = [];
        let node = this.find(start);

        while(node && node.key <= end) {
            if(node.key >= start) {
                list.push(node);
            }
            node = this.next(node);
        }

        return list;
    }

    public insert(key: K, value: V): Node<K, V> {
        const node = new Node<K, V>(key, value);
        const ref = this.find(key);

        if(ref == null) {
            this.$ROOT = node;
            return node;
        }

        if(ref.key < key) {
            ref.right = node;
            node.parent = ref;
        }
        else {
            ref.left = node;
            node.parent = ref;
        }

        return node;
    }

    public deleteElement(target: Node<K, V>): void {
        const left = target.left;
        const right = target.right;

        if(right == null) {

            // promote left
            if(target.parent) {
                if(target.parent.left == target) {
                    target.parent.left = left;
                }
                else {
                    target.parent.right = left;
                }
            }
            else {
                this.$ROOT = left;
            }
            if(left) left.parent = target.parent;

            // dereference target
            target.parent = target.left = target.right = null;
        }
        else {
            const successor = this.next(target);
            if(!successor) throw new Error("BST Error: Unexpected Bug!");

            // replace target with it's successor
            target.key = successor.key;
            target.value = successor.value;

            // remove successor and promote right
            if(successor.parent) {
                if(successor.parent.left == successor) {
                    successor.parent.left = successor.right;
                }
                else {
                    successor.parent.right = successor.right;
                }
            }
            if(successor.right) successor.right.parent = successor.parent;
        }
    }

    public delete(key: K): void {
        const ref = this.find(key);
        if(ref == null || ref.key != key) {
            // tree empty or element not found
            return;
        }
        this.deleteElement(ref);
    }
}

export default BST;
