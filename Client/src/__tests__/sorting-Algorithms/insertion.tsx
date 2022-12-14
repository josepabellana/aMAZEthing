import 'jest';
import { insertionSortAlgo } from '../../utils/sorting-algo';

describe('Insertion Sort', () => {
  test('Sorts an array', () => {
    let array = [5,3,6,7,8,3];
    let sortedAnimations = insertionSortAlgo([...array], true);
    console.log(sortedAnimations);
    expect(sortedAnimations).toEqual(
      [
        [ 1, 3 ],       [ 2, 6 ],
        [ 2, 6, 1, 3 ], [ 1, 6 ],
        [ 1, 6, 0, 5 ], [ 3, 7 ],
        [ 3, 7, 2, 3 ], [ 2, 7 ],
        [ 2, 7, 1, 5 ], [ 1, 7 ],
        [ 1, 7, 0, 6 ], [ 4, 8 ],
        [ 4, 8, 3, 3 ], [ 3, 8 ],
        [ 3, 8, 2, 5 ], [ 2, 8 ],
        [ 2, 8, 1, 6 ], [ 1, 8 ],
        [ 1, 8, 0, 7 ], [ 5, 3 ]
      ]
    );
  })
  test('Return nothing for an empty array', () => {
    let array: number[] = [];
    let sortedAnimations = insertionSortAlgo([...array], true);
    expect(sortedAnimations).toEqual([]);
  })
})