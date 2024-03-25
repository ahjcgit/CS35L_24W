#!/usr/local/cs/bin/python3

import os
import sys

class CommitNode:
    def __init__(self, commit_hash):
        """
        :type commit_hash: str
        """
        self.commit_hash = commit_hash
        self.parents = set()
        self.children = set()


def check_git_dir(input):
    current = input #Puts cursor on current directory
    while True:
        if os.path.isdir(os.path.join(current, '.git')):
            return os.path.join(current, '.git')
        parent = os.path.dirname(current)
        if current == parent: #Parent of root == root
            sys.stderr.write('Not inside a Git repository\n') #Error when reaching root
            sys.exit(1)
        current = parent


def get_branches(git_dir):
    branch_names = {}
    ref_heads_path = os.path.join(git_dir, 'refs', 'heads')
    for root, dirs, files in os.walk(ref_heads_path):
        for file in files:
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                commit_hash = f.read().strip()    
                branch_name = os.path.relpath(path, ref_heads_path).replace(os.sep, '/') #Replace OS seperator with '/'
                branch_names[branch_name] = commit_hash
    return branch_names                


def parse_commit(commit):
    lines = commit.split('\n')
    parents = []
    for line in lines:
        if line.startswith('parent '):
            parents.append(line.split(' ')[1])
    return parents


def dfs_graph(commit_hash, visited, curr_dir, root_commits, commit_graph):
    if commit_hash in visited:
        return
    visited.add(commit_hash)
    object_path = os.path.join(curr_dir, 'objects', commit_hash[:2], commit_hash[2:], )
    parents = parse_commit(object_path)
    if commit_hash not in commit_graph:
        commit_graph[commit_hash] = CommitNode(commit_hash)
    for parent_hash in parents:
        if parent_hash not in commit_graph:
            commit_graph[parent_hash] = CommitNode(parent_hash)
        commit_graph[commit_hash].parents.add(parent_hash)
        commit_graph[parent_hash].children.add(commit_hash)
        dfs_graph(parent_hash, visited, curr_dir, root_commits, commit_graph)
    if len(commit_graph[commit_hash].parents) is 0:
        root_commits.add(commit_hash) #If it is a leaf(no parents) append to root_commits


def gen_topo_order(commit_hash, visited, stack, commit_graph):
    visited.add(commit_hash)
    for child in commit_graph[commit_hash].children:
        if child not in visited:
            gen_topo_order(child, visited, stack, commit_graph)
    stack.insert(0, commit_hash) #Prepend for topological ordering    

def print_graph(stack, commit_graph, branches):
    

    
    def print_branches(commit_hash):
        if commit_hash in 



def topo_order_commits():
    git_dir = check_git_dir(os.getcwd())
    branches = get_branches(git_dir)
    visited = set()
    commit_graph = {}
    root_commits = set()




    print()

if __name__ == "__main__":
    topo_order_commits()
