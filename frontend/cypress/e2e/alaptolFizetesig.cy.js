describe("Alaptól fizetésig", () => {
  it("Kezdő betöltése", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
    cy.get('button[class="landingbtn"]').should("exist");
    cy.wait(2000);
    cy.get('button[class="landingbtn"]').click();
    cy.wait(2000);
    cy.get('input[type="text"]').type("user@gmail.com");
    cy.wait(2000);
    cy.get('div[class="input-container"]')
      .get('input[type="password"]')
      .type("123");
    cy.wait(2000);
    cy.get('div[class="loginbtn"]')
      .get('button[class="btn btn-primary"]')
      .click();
    cy.wait(2000);
    cy.get('div[class="search row"]').should("exist");
    cy.wait(2000);
    cy.get('div[class="search row"]')
      .get('div[class="rangepickerdiv col-md-4"]')
      .get('')
    
  });
});
