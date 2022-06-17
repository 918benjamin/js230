document.addEventListener('DOMContentLoaded', () => {
  
})

class Model {
  constructor() {
    this.api = 'http://localhost:3000/api/';
  }

  async getAllContacts() {
    const response = await fetch(this.api + 'contacts');
    const json = await response.json();
    this.contacts = json;
  }

  async getContact(id) {
    try {
      const response = await fetch(this.api + 'contacts/' + String(id));
      if (response.ok) {
        const json = await response.json();
        debugger;
        this.currentContact = json;
      } else {
        alert('Cannot find contact');
      }
    } catch (error) {
      console.log('hi');
      console.log(error);
    }
  }

}

class View {
  constructor() {}
}

class Controller {
  constructor() {}
}

let model = new Model();