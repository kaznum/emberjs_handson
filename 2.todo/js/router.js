// Router はどのテンプレートを使うか決める（という説明はあまり正しくないけど)
// ここでは、todos というテンプレートが使われるようになる
// どのモデルを使うかも決める
Todos.Router.map(function () {
  this.resource('todos', { path: '/'}, function () {
  });
});

// どんな振る舞いをするかを決める
// model のfunctionの戻り値をTodosControllerに返しTodosControllerがRouterで定義されたtodosテンプレートにthisとして返される
// templateの#each の引数（省略されている)に渡される( {{#each this}} )
// controllerを定義しないと、裏側で自動的にうまい具合にコントローラを生成してやってくれる。
Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    // todo リストの全レコードを返す
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('todos');
  }
});

