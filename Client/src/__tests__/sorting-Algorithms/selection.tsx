import 'jest';
import { selectionSortAlgo } from '../../utils/sorting-algo';

describe('Selection Sort', () => {
  test('Sorts an array', () => {
    let array = [5,3,6,7,8,3];
    let sortedAnimations = selectionSortAlgo([...array], true);
    expect(sortedAnimations).toEqual(
      [
        [ 0, 1 ],       [ 0, 2 ],
        [ 0, 3 ],       [ 0, 4 ],
        [ 0, 5 ],       [ 4, 8, 0, 5 ],
        [ 1, 2 ],       [ 1, 3 ],
        [ 1, 4 ],       [ 1, 5 ],
        [ 3, 7, 1, 3 ], [ 2, 3 ],
        [ 2, 4 ],       [ 2, 5 ],
        [ 3, 4 ],       [ 3, 5 ],
        [ 4, 5, 3, 3 ], [ 4, 5 ]
      ]
    );
  })
  test('Return nothing for an empty array', () => {
    let array: number[] = [];
    let sortedAnimations = selectionSortAlgo([...array], true);
    expect(sortedAnimations).toEqual([]);
  })
})