import { AVL } from ".";
import { Node } from "./BST";
import { compare } from "./types";

class Set<T> extends AVL<T> {
    constructor(compare: compare<T>) {
        super(compare);
    }
    
    public insert(data: T): Node<T> {
        const node = this.find(data);
        if(node) {
            node.data = data;
            return node;
        }
        return super.insert(data);
    }
}

export default Set;