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
  }.property("model.isCompleted") // marked as 'computed property'
});
