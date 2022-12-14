import 'jest';
import { bubbleSortAlgo } from '../../utils/sorting-algo';

describe('Bubble Sort', () => {
  test('Sorts an array', () => {
    let array = [5,3,6,7,8,3];
    let sortedAnimations = bubbleSortAlgo([...array], true);
    expect(sortedAnimations).toEqual(
      [
        [ 0, 5 ],       [ 1, 3 ],
        [ 1, 3, 2, 6 ], [ 2, 3 ],
        [ 2, 3, 3, 7 ], [ 3, 3 ],
        [ 3, 3, 4, 8 ], [ 4, 3 ],
        [ 0, 5 ],       [ 0, 5, 1, 6 ],
        [ 1, 5 ],       [ 1, 5, 2, 7 ],
        [ 2, 5 ],       [ 2, 5, 3, 8 ],
        [ 3, 5 ],       [ 0, 6 ],
        [ 0, 6, 1, 7 ], [ 1, 6 ],
        [ 1, 6, 2, 8 ], [ 2, 6 ],
        [ 0, 7 ],       [ 0, 7, 1, 8 ],
        [ 1, 7 ],       [ 0, 8 ]
      ]
    );
  })
  test('Return nothing for an empty array', () => {
    let array: number[] = [];
    let sortedAnimations = bubbleSortAlgo([...array], true);
    expect(sortedAnimations).toEqual([]);
  })
})