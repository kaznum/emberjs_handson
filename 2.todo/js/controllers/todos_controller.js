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
    },

    clearCompleted: function () {
      var completed = this.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  remaining: function () {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  //@each: 各要素のisCompletedが変更になった時、remainingが再計算されることを明示(ArrayControllerやArrayに類する場合(enumerablesの場合)に@eachが使用できる)
  // ArrayすらEmberjsを読み込むとprototypeレベルで拡張される。
  // See http://emberjs.com/guides/enumerables/
  //     http://emberjs.com/api/classes/Ember.Enumerable.html

  inflection: function () {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function () {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allAreDone: function (key, value) {
    return !!this.get('length') && this.everyBy('isCompleted', true);
  }.property('@each.isCompleted')
})
