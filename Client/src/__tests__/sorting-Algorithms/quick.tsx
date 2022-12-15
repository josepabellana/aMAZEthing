import 'jest';
import { quickSortAlgo } from '../../utils/sorting-algo';

describe('Quick Sort', () => {
  test('Sorts an array', () => {
    let array = [5,3,6,7,8,3];
    let sortedAnimations = quickSortAlgo([...array], true);
    expect(sortedAnimations).toEqual(
      [
        [ 0, 5 ],       [ 0, 5, 0, 5 ],
        [ 1, 5 ],       [ 2, 5 ],
        [ 2, 6, 1, 3 ], [ 3, 5 ],
        [ 3, 7, 2, 3 ], [ 4, 5 ],
        [ 4, 8, 3, 3 ], [ 4, 3, 5, 3 ],
        [ 0, 3 ],       [ 1, 3 ],
        [ 2, 3 ],       [ 0, 5, 3, 8 ],
        [ 1, 3 ],       [ 1, 6, 1, 6 ],
        [ 2, 3 ],       [ 2, 7, 2, 7 ],
        [ 3, 5, 3, 5 ], [ 1, 2 ],
        [ 1, 6, 2, 7 ]
      ]
    );
  })
  test('Return nothing for an empty array', () => {
    let array: number[] = [];
    let sortedAnimations = quickSortAlgo([...array], true);
    expect(sortedAnimations).toEqual([]);
  })
})