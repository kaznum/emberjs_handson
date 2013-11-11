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

      // isEmptyは空文字、null、undefined等の時にtrue
      // model.titleでなくても、titleでも行けるはず
      if (Ember.isEmpty(this.get('model.title'))) {
        // controller内からactionを呼び出す時、send を使用する。
        this.send('removeTodo');
      } else {
        this.get('model').save();
      }
    }
  },

  // ここで、isEditingにfalseでも初期値を定義しているのは、modelに移譲しないようにするため(?)
  isEditing: false
});
