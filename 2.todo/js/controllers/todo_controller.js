Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function (key, value) {
    var model = this.get("model");
    // valueに値を設定しないで呼ばれた時には、get
    if (value === undefined) {
      // getter
      return model.get('isCompleted');
    } else {
      // setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property("model.isCompleted"),  // marked as 'computed property'

  actions: {
    editTodo: function () {
      this.set('isEditing', true);
    },

    acceptChanges: function () {
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    }
  },

  isEditing: false
});
