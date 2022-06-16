// 1. get the handlebars template from the DOM
// 1. fetch the handlebars templates from the templates folder
// compile those templates (get the function)
// use them

document.addEventListener('DOMContentLoaded', () => {
  async function getTemplate(templateName) {
    let url = `./templates/${templateName}.hbs`;
    let response = await fetch(url);
    let template = await response.text();
    return template;
  }

  async function compileTemplates() {
    let ingredientsTemplate = await getTemplate('ingredients');
    let recipesTemplate = await getTemplate('recipes');

    let templates = {};

    templates['ingredients'] = Handlebars.compile(ingredientsTemplate);
    templates['recipes'] = Handlebars.compile(recipesTemplate);

    Handlebars.registerPartial('ingredients', ingredientsTemplate);

    return templates;
  }

  async function app() {
    let templates = await compileTemplates();

    let recipe = {
      title: 'Soup',
      ingredients: ['broth', 'carrots', 'salt']
    }

    document.body.insertAdjacentHTML('beforeend', templates.recipes(recipe));
  }

  app();
})