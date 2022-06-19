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
    const resource = this.api + 'contacts/' + String(id);
    this.currentContact = await this.request(resource);

    if (!this.currentContact) {
      alert('Cannot find contact');
    }
  }

  findContact(id) {
    for (let i = 0; i < this.contacts.length; i += 1) {
      if (String(this.contacts[i].id) === String(id)) {
        return this.contacts[i];
      }
    }

    console.log('No contact found matching that id');
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
    } else {
      this.getAllContacts();
    }
  }

  async deleteContact(id) {
    const resource = this.api + String(id);
    const init = { method: "DELETE" };

    this.request(resource, init, "text");
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
    // TODO: What if there are no contacts? Handling empty array, not handling undefined arg
    this.app.innerHTML = this.templates.main(contacts);
  }

  displayCreateContactForm() {
    this.app.innerHTML = this.templates.createContact();
  }

  displayEditForm(contact) {
    this.app.innerHTML = this.templates.editContact(contact);
  }

  // TODO: Does this cross the line to doing data-related functionality in View?
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
        handleDelete(target.parentNode.dataset.id);
      }
    })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindButtonClick(
      this.handleCancel.bind(this),
      this.handleEdit.bind(this),
      this.handleSubmitNew.bind(this),
      this.handleSubmitEdit.bind(this),
      this.handleDelete.bind(this)
    );
    
    this.onContactsChanged(this.model.getAllContacts());
  }

  async onContactsChanged(contacts) {
    this.view.displayContacts(await contacts);
  }

  handleCancel() {
    this.view.displayContacts(this.model.contacts);
  }

  handleEdit(id) {
    this.view.displayEditForm(this.model.findContact(id));
  }

  async handleSubmitNew(json) {
    await this.model.saveContact(json);
    this.onContactsChanged(this.model.getAllContacts());
  }

  async handleSubmitEdit(json) {
    this.model.updateContact(json);
    this.onContactsChanged(this.model.getAllContacts());
  }

  async handleDelete(id) {
    await this.model.deleteContact(id);
    this.onContactsChanged(this.model.getAllContacts());
  }
}

let app = new Controller(new Model(), new View());