// cypress/integration/articleList.spec.js

describe("ArticleList Component", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("http://localhost:3000");
  });

  it("should display the title", () => {
    cy.get('[data-testid="article-title"]').should(
      "contain",
      "New York Times Most Popular Articles"
    ); // Adjust based on your constants
    cy.get('[data-testid^="article-card-container"]').should(
      "have.length.at.least",
      1
    );
  });

  it("opens article details on button click", () => {
    cy.get('[data-testid^="article-card-detail-button"]').first().click();
    cy.get('[data-testid="article-detail-modal"]').should("be.visible");
  });

  it("closes the modal when clicking close button", () => {
    cy.get('[data-testid^="article-card-detail-button"]').first().click();
    cy.get('[data-testid="article-detail-close-button"]').click();
    cy.get('[data-testid="article-detail-modal"]').should("not.exist");
  });

  it("should allow selecting a period", () => {
    cy.get('[data-testid="article-period-select-item-select"]').click();
    cy.get('[data-testid="article-period-select-item-menu-7"]').click();
    cy.get('[data-testid="article-period-select-item-select"]').should(
      "contain",
      "Last 7 Days"
    );
  });

  it("shows a loading spinner while fetching articles", () => {
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=l9SYumVdD2UGhcECoNyjTAPIiKhzyw1H",
      { delay: 1000 }
    ).as("getArticles");
    cy.get('[data-testid="article-load-progress"]').should("exist");
    cy.wait("@getArticles");
    cy.get('[data-testid="article-load-progress"]').should("not.exist");
  });

  it("displays an error message if the API call fails", () => {
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=l9SYumVdD2UGhcECoNyjTAPIiKhzyw1H",
      { statusCode: 500 }
    ).as("getArticles");
    cy.get('[data-testid="article-error-alert"]').should("exist");
  });

  it("should display an empty message when there are no articles", () => {
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=l9SYumVdD2UGhcECoNyjTAPIiKhzyw1H",
      { body: [] }
    ).as("getArticlesEmpty");
    cy.get('[data-testid="article-empty"]').should(
      "contain",
      "No articles available."
    );
  });
});
