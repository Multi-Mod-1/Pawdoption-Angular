describe("Welcome Page Testing", () => {
  it("Visits the welcome page of the applicaiton", () => {
    cy.visit("http://localhost:51192/welcome");
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
