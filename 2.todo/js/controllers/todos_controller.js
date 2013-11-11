Todos.TodosController = Ember.ArrayController.extend({
  // Userからのなにかを受け取って処理をする。
  actions: {
    createTodo: function () {
      var title = this.get('newTitle');

      // JSは空文字はfalse
      if (!title.trim()) { return; }

      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');

      todo.save();
    }
  },

  remaining: function () {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function () {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
})
