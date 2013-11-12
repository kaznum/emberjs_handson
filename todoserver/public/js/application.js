window.Todos = Ember.Application.create();

Todos.TodoSerializer = DS.RESTSerializer.extend({
  serialize: function(record, options) {
    var json = this._super(record, options);

    json.completed = json.isCompleted;
    delete json.isCompleted;

    return json;
  },

  normalizeHash: {
    todos: function(hash) {
      hash.isCompleted = hash.completed;
      delete hash.completed;
      return hash;
    }
  }

});

Todos.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://localhost:3000",
});

