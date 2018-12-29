workflow "Linting & Testing" {
  on = "push"
  resolves = ["Run Prettier"]
}

action "Install dependencies" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Run Prettier" {
  uses = "actions/npm@e7aaefe"
  args = "format"
  needs = ["Install dependencies"]
}
