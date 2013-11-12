Todos.EditTodoView = Ember.TextField.extend({
  // このビューがテンプレート中に挿入されたタイミングでfireされるcallback
  didInsertElement: function () {
    // jQueryのfocusを実行する。（ダブルクリックした時に全選択状態になる)
    // this.$()はこのViewのjQueryオブジェクトが取得できる。
    this.$().focus();
  }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
// Viewを作ってテンプレートに差し込む方法は複数存在する。
// 1. Helperを定義する(ここで採用した方法）
// 2. {{#view "Todos.EditTodoView"}}
