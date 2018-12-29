const Git = require("../src/git");

test("Git.commit() test", () => {
  let repo = new Git("test");

  let firstCommit = repo.commit("Initial commit");

  expect(firstCommit.id).toBe(0);
  expect(firstCommit.parent).toBe(null);
  expect(firstCommit.message).toBe("Initial commit");

  let secondCommit = repo.commit("Second commit");

  expect(secondCommit.id).toBe(1);
  expect(secondCommit.parent).toBe(firstCommit);
  expect(secondCommit.message).toBe("Second commit");
});

test("Git.log() test", () => {
  let repo = new Git("test");

  repo.commit("Initial commit");
  repo.commit("Change 1");
  let log = repo.log();

  expect(log.length).toBe(2);
  expect(!!log[0] && log[0].id).toBe(1);
  expect(!!log[1] && log[1].id).toBe(0);
});

test("Git.checkout() test", () => {
  let repo = new Git("test");

  repo.commit("Initial commit");
  expect(repo.HEAD.name).toBe("master");

  repo.checkout("testing");
  expect(repo.HEAD.name).toBe("testing");

  repo.checkout("master");
  expect(repo.HEAD.name).toBe("master");

  repo.checkout("testing");
  expect(repo.HEAD.name).toBe("testing");
});
