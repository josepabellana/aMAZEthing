import 'jest';
import { mergeSortAlgo } from '../../utils/sorting-algo';

describe('Merge Sort', () => {
  test('Sorts an array', () => {
    let array = [5,3,6,7,8,3];
    let sortedAnimations = mergeSortAlgo([...array], true);
    expect(sortedAnimations).toEqual(
      [
        [ 0, 1 ], [ 0, 1 ], [ 0, 5 ], [ 1, 1 ],
        [ 1, 1 ], [ 1, 3 ], [ 0, 2 ], [ 0, 2 ],
        [ 0, 6 ], [ 0, 0 ], [ 0, 0 ], [ 1, 5 ],
        [ 1, 1 ], [ 1, 1 ], [ 2, 3 ], [ 3, 4 ],
        [ 3, 4 ], [ 3, 8 ], [ 3, 3 ], [ 3, 3 ],
        [ 4, 7 ], [ 3, 5 ], [ 3, 5 ], [ 3, 8 ],
        [ 4, 5 ], [ 4, 5 ], [ 4, 7 ], [ 5, 5 ],
        [ 5, 5 ], [ 5, 3 ], [ 0, 3 ], [ 0, 3 ],
        [ 0, 8 ], [ 0, 4 ], [ 0, 4 ], [ 1, 7 ],
        [ 0, 5 ], [ 0, 5 ], [ 2, 6 ], [ 1, 5 ],
        [ 1, 5 ], [ 3, 5 ], [ 2, 5 ], [ 2, 5 ],
        [ 4, 3 ], [ 5, 5 ], [ 5, 5 ], [ 5, 3 ]
      ]
    );
  })
  test('Return nothing for an empty array', () => {
    let array: number[] = [];
    let sortedAnimations = mergeSortAlgo([...array], true);
    expect(sortedAnimations).toEqual([]);
  })
})