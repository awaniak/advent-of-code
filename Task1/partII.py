twice_freq = ""

freq: int = 0
freq_history_set = {0}
freq_changes = [int(x) for x in open('input.txt', 'r').readlines()]

while twice_freq == "":

    for freq_change in freq_changes:
        freq += freq_change
        if freq in freq_history_set:
            twice_freq = freq
            break
        freq_history_set.add(freq)

print(twice_freq)



