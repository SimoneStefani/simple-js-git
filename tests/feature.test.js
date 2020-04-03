const Git = require("../src/git");

test("3 commits multibranch test", () => {
  let repo = new Git("test");

  repo.commit("Initial commit");
  repo.commit("Change 1");
  expect(historyToIdMapper(repo.log())).toBe("1-0");

  repo.checkout("testing");
  repo.commit("Change 3");
  expect(historyToIdMapper(repo.log())).toBe("2-1-0");

  repo.checkout("master");
  expect(historyToIdMapper(repo.log())).toBe("1-0");

  repo.commit("Change 3");
  expect(historyToIdMapper(repo.log())).toBe("3-1-0");
});

/**
 * Maps the array of commits into a string of commit ids.
 * For [C2, C1, C3], it returns "2-1-0"
 *
 * @param {Array} history
 */
const historyToIdMapper = (history) => {
  let ids = history.map((commit) => commit.id);
  return ids.join("-");
};
