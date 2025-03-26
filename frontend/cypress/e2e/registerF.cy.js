describe("Regisztráció", () => {
  it("Register", () => {
    cy.visit("http://localhost:5173/register");
    cy.get('input[placeholder="Név"]').type("teszt");
    cy.get('input[placeholder="Email"]').type("teszt@gmail.com");
    cy.get('input[placeholder="Jelszó"]').type("123");
    cy.get('input[placeholder="Jelszó megerősítése"]').type("1234");
    cy.get('div[class="registerbtn"]')
      .get('button[class="btn btn-primary w-100"]')
      .click();
  });
});