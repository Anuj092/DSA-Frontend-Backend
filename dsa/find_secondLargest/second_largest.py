def find_second_largest(arr):
    if len(arr) < 2:
        return -1
    
    largest = float('-inf')
    second = float('-inf')
    
    for num in arr:
        if num > largest:
            second = largest
            largest = num
        elif num > second and num != largest:
            second = num
    
    return second if second != float('-inf') else -1


if __name__ == "__main__":
    tests = [
        ([3, 5, 2, 5, 6, 6, 1], 5),
        ([7, 7, 7], -1),
        ([1, 2], 1),
        ([5], -1),
        ([], -1),
        ([10, 5, 10], 5),
        ([-1, -2, -3], -2),
        ([100, 200, 300, 200], 200),
    ]
    
    for arr, expected in tests:
        result = find_second_largest(arr)
        status = "pass" if result == expected else "FAIL"
        print(f"{status}: {arr} -> {result} (expected {expected})")
