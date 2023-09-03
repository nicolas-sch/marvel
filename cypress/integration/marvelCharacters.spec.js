describe('Página de Personagens Marvel', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/');
    });
  
    it('exibe a barra superior', () => {
      cy.get('.top-bar').should('be.visible');
    });
  
    it('exibe personagens', () => {
      cy.get('.character-card').should('have.length.gt', 0);
    });
  
    it('filtra os personagens ao selecionar uma opção', () => {
      cy.get('#characterSelect').select('Abyss');
      cy.get('.character-card').should('have.length', 1);
    });
  
    it('navega para os detalhes de um personagem', () => {
      cy.get('.character-card:first').click();
      cy.url().should('include', '/character/');
    });
  });
  