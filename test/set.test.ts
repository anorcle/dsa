import { Set } from '../src/index';

type obj = {
    key1: number;
    key2: number;
    value: number;
}

const compareObj = (a: obj, b: obj) => {
    if(a.key1 < b.key1) return -1;
    if(a.key1 == b.key1 && a.key2 < b.key2) return -1;
    if(a.key1 == b.key1 && a.key2 == b.key2) return 0;
    if(a.key1 == b.key1 && a.key2 > b.key2) return 1;
    return 1;
}

it('Test Set Operations', () => {
    const set = new Set<obj>(compareObj);

    set.insert({key1: 1, key2: 1, value: 100});
    set.insert({key1: 1, key2: 2, value: 100});
    set.insert({key1: 1, key2: 1, value: 10});
    set.insert({key1: 2, key2: 1, value: 100});

    expect(set.toArray).toEqual([
        {key1: 1, key2: 1, value: 10},
        {key1: 1, key2: 2, value: 100},
        {key1: 2, key2: 1, value: 100}
    ])

    set.delete({key1: 2, key2: 1, value: 0});
    
    expect(set.toArray).toEqual([
        {key1: 1, key2: 1, value: 10},
        {key1: 1, key2: 2, value: 100}
    ])

    expect(set.find({key1: 1, key2: 1, value: 0})?.data).toEqual({key1: 1, key2: 1, value: 10})

    set.delete({key1: 1, key2: 1, value: 0});
    
    expect(set.toArray).toEqual([
        {key1: 1, key2: 2, value: 100}
    ])
})