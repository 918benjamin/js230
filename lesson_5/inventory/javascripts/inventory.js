var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      // $("#order_date").text(date.toUTCString()); // REPLACE w/ JS
      document.getElementById('order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      var $iTmpl = $("#inventory_item").remove(); // REPLACE w/ handlebars
      this.template = $iTmpl.html(); // REPLACE w/ JS
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
    update: function($item) { // REPLACE w/ JS
      var id = this.findID($item),
          item = this.get(id);

      // REPLACE
      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          $item = $(this.template.replace(/ID/g, item.id)); // REPLACE

      $("#inventory").append($item); // REPLACE
    },
    findParent: function(e) {
      return $(e.target).closest("tr"); // REPLACE
    },
    findID: function($item) {
      return +$item.find("input[type=hidden]").val(); // REPLACE
    },
    deleteItem: function(e) {
      debugger;
      e.preventDefault();
      var $item = this.findParent(e).remove(); // REPLACE

      this.remove(this.findID($item));
    },
    updateItem: function(e) {
      var $item = this.findParent(e); // REPLACE

      this.update($item);
    },
    bindEvents: function() { // REPLACE ALL THREE
      // $("#add_item").on("click", $.proxy(this.newItem, this));
      // $("#add_item").on("click", this.newItem.bind(this));
      document.getElementById("add_item").addEventListener("click", this.newItem.bind(this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      // document.getElementById('inventory').addEventListener(e => {
      //   if (e.target.tagName === 'A') {
      //     // e.preventDefault();
      //     this.deleteItem(e).call(this)
      //   }
      // });
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

$($.proxy(inventory.init, inventory));