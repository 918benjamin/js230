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
  }

  async getContact(id) {
    const resource = this.api + 'contacts/' + String(id);
    this.currentContact = await this.request(resource);

    if (!this.currentContact) {
      alert('Cannot find contact');
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
    } else {
      this.getAllContacts();
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
    this.getAllContacts();
  }
}

class View {
  constructor() {}
}

class Controller {
  constructor() {}
}

let model = new Model();