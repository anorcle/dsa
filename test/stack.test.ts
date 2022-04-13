import { Stack } from "../src/index";
import InvalidOperationError from "../errors/InvalidOperationError"

it('Tests Stack', () => {
    const stack = new Stack<number>();

    const accessEmptyStack = new InvalidOperationError("Unable to access element from empty stack");
    const popEmptyStack = new InvalidOperationError("Unable to pop element from empty stack");

    expect(() => stack.top).toThrowError(accessEmptyStack);
    expect(() => stack.pop()).toThrowError(popEmptyStack);

    stack.push(3);
    stack.push(1);
    stack.push(100);

    expect(stack.top).toBe(100);
    expect(stack.pop()).toBe(100);

    expect(stack.top).toBe(1);
    expect(stack.pop()).toBe(1);

    stack.push(50);
    
    expect(stack.top).toBe(50);
    expect(stack.pop()).toBe(50);

    expect(stack.top).toBe(3);
    expect(stack.pop()).toBe(3);

    expect(() => stack.top).toThrowError(accessEmptyStack);
    expect(() => stack.pop()).toThrowError(popEmptyStack);
    
    stack.push(10);
    stack.push(10);

    expect(stack.top).toBe(10);
    expect(stack.pop()).toBe(10);

    expect(stack.top).toBe(10);
    expect(stack.pop()).toBe(10);

    expect(() => stack.top).toThrowError(accessEmptyStack);
    expect(() => stack.pop()).toThrowError(popEmptyStack);
});