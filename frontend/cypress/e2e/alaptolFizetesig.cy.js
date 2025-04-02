describe("Alaptól fizetésig", () => {
  it("Kezdő betöltése", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(1000);
    cy.get('button[class="landingbtn"]').should("exist");
    cy.wait(1000);
    cy.get('button[class="landingbtn"]').click();
    cy.wait(1000);
    cy.get('input[type="text"]').type("user@gmail.com");
    cy.wait(1000);
    cy.get('div[class="input-container"]')
      .get('input[type="password"]')
      .type("123");
    cy.wait(1000);
    cy.get('div[class="loginbtn"]')
      .get('button[class="btn btn-primary"]')
      .click();
    cy.wait(1000);
    cy.get('div[class="search row"]').should("exist");
    cy.wait(1000);
    cy.get('div[class="search row"]').get(
      'div[class="rangepickerdiv col-md-4"]'
    );
    cy.get(".rangepickerdiv .ant-picker").click();
    cy.wait(1000);
    cy.get(".ant-picker-cell").contains("25").click();
    cy.wait(1000);
    cy.get(".ant-picker-cell").contains("30").click();
    cy.wait(1000);
    cy.get(
      'button[class="ant-btn css-dev-only-do-not-override-142vneq ant-btn-default ant-btn-color-default ant-btn-variant-outlined"]'
    ).click();
    cy.wait(1000);
    cy.get(".dropdown-list-kontener").contains("Wifi").click();
    cy.get(".dropdown-list-kontener").contains("Reggeli").click();
    cy.get(".dropdown-list-kontener").contains("Minibár").click();
    cy.wait(1000);
    cy.contains("Foglalás").click();
    cy.wait(1000);
    cy.get('button[class="cta"]').click();
  });
});
