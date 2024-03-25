#!/usr/bin/python3

"""
shuf.py should be in the style of randline.py but using Python 3 instead. Your script should implement the GNU shuf command that is part of GNU Coreutils. GNU shuf is written in C, but this should run on /usr/local/cs/bin/python3 as installed on SEASNET

--echo (-e) Treat each command-line operand as an input line
--input-range (-i) lo-hi Act as if input came from a file containing the range of unsigned decial integers lo...hi
--head-count (-n) Output at most count lines(default is all lines)
--repeat (-r) Repeat output values(select with replacement)
--help help

--repeat (-r) is used without --head-count (-n), your program should run forever.

Program should support zero non-option arguments or a single non-option argument "-"(either of which means read from standard output) or a single non-option argument other than "-" (which specifies the input file name)

It should report an error if given invalid arguments.
"""

import argparse
import random
import sys

class shuf:
    #Read inputs as elements in array
    def __init__(self, args):
        self.args = args
        self.input_lines = []
    
def main():
    parser = argparse.ArgumentParser(
        prog='Shuf',
        description='Shuf from GNU coreutils rewritten for Python3',
        usage='shuf.py [OPTION]... FILE')
        
        #List of arguments
    parser.add_argument('filename', nargs='?', default='-')
    parser.add_argument('-e', '--echo', nargs='+', help='Treat each command-line operand as an input line')
    parser.add_argument('-i', '--input-range', metavar='lo-hi', action='store', help='Input is deemed to come from a range of unsigned integers')
    parser.add_argument('-n', '--head-count', type=int, metavar='N', action='store', help='Output at most count lines(default is all lines)')
    parser.add_argument('-r', '--repeat', action='store_true', help='Repeat output values(select with replacement)')

    args = parser.parse_args()
    shuffler = shuf(args)

    if args.echo:
        shuffler.input_lines.extend(args.echo) #Because of nargs, no arguments outputs error

    if args.input_range:
        try:
            start, end = map(int, args.input_range.split('-'))
            shuffler.input_lines.extend(range(start, end + 1))
        except ValueError:
            sys.stderr.write("Invalid range: Use [lo-hi]\n")
            sys.exit(1)

    if args.filename != '-': #If file name is default, skips reading
        try:
            with open(args.filename, 'r') as file:
                shuffler.input_lines.extend(file.read().splitlines())
        except FileNotFoundError:
            sys.stderr.write("File Not Found\n")
            sys.exit(1)

    if args.head_count is not None: 
        if not args.repeat:
            count = min(args.head_count, len(shuffler.input_lines))
        else:
            count = args.head_count
    if args.head_count is None:
        count = len(shuffler.input_lines)

    if args.repeat:
        if args.head_count is None:
            while(True):
                sys.stdout.write(str(random.choice(shuffler.input_lines)) + '\n') #-r without -n results in infinite output
        else:
            for _ in range(count):
                sys.stdout.write(str(random.choice(shuffler.input_lines)) + '\n')
        
    else:
        for _ in range(count):
            pick = random.choice(shuffler.input_lines)
            sys.stdout.write(str(pick) + '\n')
            shuffler.input_lines.remove(pick)


    
if __name__ == "__main__":
    main()
