let Commit = require("./commit");
let Branch = require("./branch");

class Git {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1;
    this.branches = [];
    let master = new Branch("master", null);
    this.branches.push(master);
    this.HEAD = master;
  }

  commit(message) {
    let commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
    this.HEAD.commit = commit;

    return commit;
  }

  log() {
    let commit = this.HEAD.commit;
    let history = [];

    while (commit) {
      history.push(commit);
      commit = commit.parent;
    }

    return history;
  }

  checkout(branchName) {
    for (const branch of this.branches) {
      if (branch.name === branchName) {
        console.log("Switched to existing branch: " + branchName);
        this.HEAD = branch;
        return this;
      }
    }

    // If branch was not found, create a new one.
    var newBranch = new Branch(branchName, this.HEAD.commit);
    // Store branch.
    this.branches.push(newBranch);
    // Update HEAD
    this.HEAD = newBranch;
    console.log("Switched to new branch: " + branchName);
    return this;
  }
}

module.exports = Git;
