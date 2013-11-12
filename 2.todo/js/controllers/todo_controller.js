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

  isOutdated: function () {
    var model = this.get('model');
    var deadline = model.get('deadline');
    if (Ember.isEmpty(deadline))
      return false;

    return new Date(deadline) < new Date();
  }.property("deadline"),

  actions: {
    editTodo: function () {
      this.set('isEditing', true);
    },

    acceptChanges: function () {
      this.set('isEditing', false);

      // isEmptyは空文字、null、undefined等の時にtrue
      // model.titleでなくても、titleでも行けるはず
      if (Ember.isEmpty(this.get('model.title'))) {
        // controller内からactionを呼び出す時、send を使用する。
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    },

    removeTodo: function () {
      var todo = this.get("model");
      // Ember上から消す
      todo.deleteRecord();
      // Data Store上から消す
      todo.save();
    }
  },

  // ここで、isEditingにfalseでも初期値を定義しているのは、modelに移譲しないようにするため(?)
  isEditing: false
});
