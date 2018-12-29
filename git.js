let Commit = require('./commit');

class Git {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1;
    this.HEAD = null;
  }

  commit(message) {
    let commit = new Commit(++this.lastCommitId, this.HEAD, message);
    this.HEAD = commit;

    return commit;
  }

  log() {
    let commit = this.HEAD;
    let history = [];

    while (commit) {
      history.push(commit);
      commit = commit.parent;
    }

    return history;
  }
}

module.exports = Git;
