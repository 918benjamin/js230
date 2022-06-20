document.addEventListener('DOMContentLoaded', () => {
  
})

class Model {
  constructor() {
    this.api = 'http://localhost:3000/api/contacts/';
    this.contacts = null;
    this.currentContact = null;
  }

  async request(resource, init, expectedDataType='json') {
    try {
      const response = await fetch(resource, init);

      if (response.ok) {
        switch (expectedDataType) {
          case 'json':
            return response.json();
          default:
            return response.text();
        }
      } else {
        console.log(`Something went wrong: ${response.status}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAllContacts() {
    this.contacts = await this.request(this.api);
    return this.contacts;
  }

  async getContact(id) {
    const resource = this.api + id;
    this.currentContact = await this.request(resource);

    if (!this.currentContact) {
      alert('Cannot find contact');
    } else {
      return this.currentContact;
    }
  }

  async saveContact(contact) {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }

    this.currentContact = await this.request(this.api, init);

    if (!this.currentContact) {
      alert('Cannot find contact');
    }
  }

  async updateContact(contact) {
    const resource = this.api + String(contact.id);
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    }

    this.currentContact = await this.request(resource, init);

    if (!this.currentContact) {
      alert('Cannot find contact');
    }
  }

  async deleteContact(id) {
    const resource = this.api + String(id);
    const init = { method: "DELETE" };

    await this.request(resource, init, "text");
  }

  filterContacts(query) {
    const filteredResults = this.contacts.filter(contact => {
        return contact.full_name.toLowerCase().startsWith(query.toLowerCase());
    });

    return {
      contacts: filteredResults,
      query: query
    }
  }
}

class View {
  constructor() {
    this.templates = {};
    this.compileTemplates();
    this.registerPartials();

    this.app = document.querySelector('#app');
  }

  compileTemplates() {
    document.querySelectorAll('[type="text/x-handlebars"]').forEach(template => {
      this.templates[template.id] = Handlebars.compile(template.innerHTML)
    });
  }

  registerPartials() {
    document.querySelectorAll('[data-type="partial"]').forEach(partial => {
      Handlebars.registerPartial(partial.id, partial.innerHTML);
    });
  }

  displayContacts(contacts) {
    this.app.innerHTML = this.templates.main(contacts);
  }

  displaySearchResults(results) {
    this.contactsContainer = document.querySelector('#contacts');
    this.contactsContainer.innerHTML = this.templates.searchResults(results);
  }

  displayCreateContactForm() {
    this.app.innerHTML = this.templates.createContact();
  }

  displayEditForm(contact) {
    this.app.innerHTML = this.templates.editContact(contact);
  }

  formToObject(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }

  bindButtonClick(handleCancel, handleEdit, handleSubmitNew, handleSubmitEdit, handleDelete) {
    document.addEventListener("click", e => {
      const target = e.target;
      if (target.tagName !== "BUTTON") return;

      if (target.classList.contains('createContact')) {
        this.displayCreateContactForm();
      } else if (target.classList.contains('submit')) {
        const form = target.parentNode;
        const data = this.formToObject(form);

        if (target.classList.contains('edit')) {
          handleSubmitEdit(data);
        } else {
          handleSubmitNew(data);
        }
      } else if (target.classList.contains('cancel')) {
        handleCancel();
      } else if (target.classList.contains('edit')) {
        handleEdit(target.parentNode.dataset.id);
      } else if (target.classList.contains('delete')) {
        const message = "Do you want to delete the contact?";
        if (confirm(message)) {
          handleDelete(target.parentNode.dataset.id);
        }
      }
    })
  }

  bindFilterBasedOnSearch(handler) {
    document.addEventListener("input", e => {
      const target = e.target;

      if (target.tagName === "INPUT" && target.id === "search") {
        handler(target.value);
      }
    })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindFilterBasedOnSearch(this.handleSearch.bind(this));
    this.view.bindButtonClick(
      this.handleCancel.bind(this),
      this.handleEdit.bind(this),
      this.handleSubmitNew.bind(this),
      this.handleSubmitEdit.bind(this),
      this.handleDelete.bind(this)
    );

    this.onContactsChanged();
  }

  async onContactsChanged() {
    const contacts = await this.model.getAllContacts();
    this.view.displayContacts(contacts);
  }

  onSearchResultsChanged(results) {
    this.view.displaySearchResults(results);
  }

  handleSearch(query) {
    this.onSearchResultsChanged(this.model.filterContacts(query));
  }

  async handleCancel() {
    this.view.displayContacts(await this.model.getAllContacts());
  }

  async handleEdit(id) {
    this.view.displayEditForm(await this.model.getContact(id));
  }

  async handleSubmitNew(json) {
    await this.model.saveContact(json);
    this.onContactsChanged();
  }

  async handleSubmitEdit(json) {
    await this.model.updateContact(json);
    this.onContactsChanged();
  }

  async handleDelete(id) {
    await this.model.deleteContact(id);
    this.onContactsChanged();
  }
}

let app = new Controller(new Model(), new View());