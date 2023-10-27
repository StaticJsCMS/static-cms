import {
  login,
  validateObjectFieldsAndExit,
  validateNestedObjectFieldsAndExit,
  validateListFieldsAndExit,
  validateNestedListFieldsAndExit,
} from "../utils/steps";
import { setting1, setting2 } from "../utils/constants";

describe("Test Backend Editorial Workflow", () => {
  after(() => {
    cy.task("teardownBackend", { backend: "test" });
  });

  before(() => {
    Cypress.config("defaultCommandTimeout", 4000);
  });

  beforeEach(() => {
    cy.task("setupBackend", { backend: "test" });
  });

  it("can validate object fields", () => {
    login({ editorialWorkflow: true });

    cy.contains("a", "Posts").click();

    validateObjectFieldsAndExit(setting1);
  });

  it("can validate fields nested in an object field", () => {
    login({ editorialWorkflow: true });

    cy.contains("a", "Posts").click();

    validateNestedObjectFieldsAndExit(setting1);
  });

  it("can validate list fields", () => {
    login({ editorialWorkflow: true });

    cy.contains("a", "Posts").click();

    validateListFieldsAndExit(setting2);
  });

  it("can validate deeply nested list fields", () => {
    login({ editorialWorkflow: true });

    cy.contains("a", "Posts").click();

    validateNestedListFieldsAndExit(setting2);
  });
});
