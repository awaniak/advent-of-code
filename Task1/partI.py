import functools
freq: int = 0
freq_changes = open('input.txt', 'r').readlines()
freq = functools.reduce(lambda x,y: x + y, list(map(int, freq_changes)), 0)
print(freq)
