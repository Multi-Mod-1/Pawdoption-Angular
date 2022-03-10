/*
  Testing it on a different port because of my local host. Should be visiting:

    "http://localhost:4200/dogs"
*/

describe("All Dog Page Testing", () => {
  it("Visits the dogs page of the applicaiton", () => {
    cy.visit("http://localhost:65072/dogs");
  });

  it("Table header has all the contexts needed", () => {
    // identify preset value expected for the table headers
    const tableHead = [
      " Show Image ",
      "Name",
      "Sex",
      "Breed",
      "Location",
      "Summary",
    ];

    // grabbing all info from each th
    cy.get(".table > thead > tr > th:nth-child(n)").each(
      ($el, index, $list) => {
        const txt = $el.text();

        expect(txt).to.equal(tableHead[index]);
      }
    );
  });

  it("Shows images when clicked", () => {
    cy.get(".show-button").click();

    // grabbing all info from each th
    cy.get(".table > tbody > tr > td:nth-child(1) > img").each(
      ($el, index, $list) => {
        cy.get($el).should("be.visible");
      }
    );
  });

  it("Hides images when clicked again", () => {
    cy.get(".show-button").click();
    // grabbing all info from each th
    cy.get(".table > tbody > tr > td:nth-child(1)").each(() => {
      cy.get("img").should("not.exist");
    });
  });
});
