freq: int = 0
freq_changes = open('input.txt', 'r')

for freq_change in freq_changes:
    freq = freq + int(freq_change)

print(freq)

