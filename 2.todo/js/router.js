// Router はどのテンプレートを使うか決める（という説明はあまり正しくないけど)
// ここでは、todos というテンプレートが使われるようになる
// どのモデルを使うかも決める
Todos.Router.map(function () {
  this.resource('todos', { path: '/'} );
});

// どんな振る舞いをするかを決める
// model のfunctionの戻り値がRouterで定義されたtodosテンプレートに返される
// templateの#each の引数（省略されている)に渡される( {{#each this}} )
Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    // todo リストの全レコードを返す
    return this.store.find('todo');
  }
});

