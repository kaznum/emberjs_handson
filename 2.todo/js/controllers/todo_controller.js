Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function (key, value) {
    var model = this.get("model");

    if (value === undefined) {
      // getter
      return model.get('isCompleted');
    } else {
      // setter
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property("model.isCompleted")
});
