/*
  Testing it on a different port because of my local host. Should be visiting:

    "http://localhost:4200/welcome"
*/

describe("Welcome Page Testing", () => {
  it("Visits the welcome page of the applicaiton", () => {
    cy.visit("http://localhost:65072/welcome");
  });

  it("Contains welcome text", () => {
    cy.contains("Welcome");
  });

  it("Contains pawdoption image", () => {
    cy.get("#pawdoption-logo")
      .should("have.attr", "src")
      .should("include", "./assets/images/logo.svg");
  });

  it("Contains the authors names", () => {
    cy.contains("Javier Montero");
    cy.contains("Lucas Freitas");
    cy.contains("Eric Davenport, Jr.");
    cy.contains("CJ Garcia");
  });
});
