# Second Largest Unique Number

## Problem Statement
Given an array of integers, return the second largest unique number in the array. If it doesn't exist, return -1.

## Examples
```
Input: [3, 5, 2, 5, 6, 6, 1]
Output: 5

Input: [7, 7, 7]
Output: -1
```

## Solution Approach

The algorithm uses a single-pass approach with two tracking variables:

1. **Initialize** two variables (`largest` and `second_largest`) to negative infinity
2. **Iterate** through the array once:
   - If current number > largest: shift largest to second_largest, update largest
   - Else if current number > second_largest AND different from largest: update second_largest
3. **Return** second_largest if it was updated, otherwise -1

## Complexity Analysis

- **Time Complexity**: O(n) - Single pass through the array
- **Space Complexity**: O(1) - Only two variables used (constant space)

This is significantly better than O(n²) approaches like nested loops or sorting-based solutions.

## Running the Code

```bash
python second_largest.py
```

## Test Cases Covered

- Standard case with duplicates: `[3, 5, 2, 5, 6, 6, 1]` → 5
- All same numbers: `[7, 7, 7]` → -1
- Two elements: `[1, 2]` → 1
- Single element: `[5]` → -1
- Empty array: `[]` → -1
- Negative numbers: `[-1, -2, -3]` → -2
- Multiple duplicates of largest: `[10, 5, 10]` → 5
