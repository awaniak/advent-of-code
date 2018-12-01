import functools

freq_changes = [int(x) for x in open('input.txt', 'r').readlines()]
freq = functools.reduce(lambda x, y: x + y, list(map(int, freq_changes)), 0)
print(freq)
