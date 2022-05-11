var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      // $("#order_date").text(date.toUTCString()); // ORIGINAL
      document.getElementById('order_date').textContent = date.toUTCString();
    },

    cacheTemplate: function() {
      // var $iTmpl = $("#inventory_item").remove(); // ORIGINAL
      var iTmpl = document.getElementById('inventory_item');

      // this.template = $iTmpl.html(); // ORIGINAL
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },

    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },

    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },

    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },

    update: function(itemNode) {
      var id = this.findID(itemNode);
      var item = this.get(id);

      // item.name = $item.find("[name^=item_name]").val(); // ORIGINAL
      item.name = itemNode.querySelector("[name^=item_name]").value;

      // item.stock_number = $item.find("[name^=item_stock_number]").val(); // ORIGINAL
      item.stock_number = itemNode.querySelector("[name^=item_stock_number]").value;

      // item.quantity = $item.find("[name^=item_quantity]").val(); // ORIGINAL
      item.quantity = itemNode.querySelector("[name^=item_quantity]").value;
    },

    newItem: function(e) {
      e.preventDefault();
      var item = this.add();
      // $item = $(this.template.replace(/ID/g, item.id)); // ORIGINAL
      var htmlString = this.template(item);

      // $("#inventory").append($item); // ORIGINAL
      document.getElementById('inventory').insertAdjacentHTML("beforeend", htmlString);
    },

    findParent: function(e) {
      // return $(e.target).closest("tr"); // ORIGINAL
      return e.target.closest("tr");
    },

    findID: function(item) {
      // return +$item.find("input[type=hidden]").val(); // ORIGINAL
      return +item.querySelector('input[type=hidden]').value;
    },

    deleteItem: function(e) {
      e.preventDefault();
      // var $item = this.findParent(e).remove(); // ORIGINAL
      var item = this.findParent(e);

      this.remove(this.findID(item));
      item.remove();
    },

    updateItem: function(e) {
      // var $item = this.findParent(e); // ORIGINAL
      var item = this.findParent(e);

      this.update(item);
    },

    bindEvents: function() {
      // $("#add_item").on("click", $.proxy(this.newItem, this)); // ORIGINAL
      document.getElementById("add_item").addEventListener("click", this.newItem.bind(this));

      // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this)); // ORIGINAL
      document.getElementById('inventory').addEventListener('click', e => {
        if (e.target.tagName === 'A') {
          e.preventDefault();
          this.deleteItem.call(this, e)
        }
      });

      // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this)); // ORIGINAL
      document.getElementById('inventory').addEventListener('focusout', e => {
        if (e.target.tagName === 'INPUT') {
          this.updateItem.call(this, e);
        }
      });
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

// $($.proxy(inventory.init, inventory)); // ORIGINAL
document.addEventListener('DOMContentLoaded', () => {
  inventory.init();
});