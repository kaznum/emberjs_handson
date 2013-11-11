// Router はどのテンプレートを使うか決める（という説明はあまり正しくないけど)
// ここでは、todos というテンプレートが使われるようになる
// どのモデルを使うかも決める
Todos.Router.map(function () {
  // URLをネストして定義できる
  // 第３引数に実装が空のfunction ()を定義するだけで、Routeが２段構造になった。
  // RouteがTodos と Todos.index が使えるようになった。（テンプレートは Todos, Todos/index)
  // Todosの{{outlet}}の部分にTodos/indexの結果が描画される
  // todos.active, todos.completedが追加できる
  this.resource('todos', { path: '/'}, function () {
    // resourceとは異なり、routeの下にはぶら下げることはできない。
    return this.route("active");
  });
});

// どんな振る舞いをするかを決める
// model のfunctionの戻り値をTodosControllerに返しTodosControllerがRouterで定義されたtodosテンプレートにthisとして返される
// templateの#each の引数（省略されている)に渡される( {{#each this}} )
// controllerを定義しないと、裏側で自動的にうまい具合にコントローラを生成してやってくれる。
// renderTemplate で出力先のoutlet名を指定することができる。
Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    // todo リストの全レコードを返す
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function () {
    // 指定した名前のrootのmodelを使う
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function () {
    // todo listから、iscompletedがfalseのものだけを出力する
    return this.store.filter('todo', function (todo) {
      return !todo.get("isCompleted");
    });
  },
  // renderTemplateを記載しない場合は、todos/activeを探しに行く。
  // 今回はactiveでも同じテンプレートを使用する。
  // { controller: controller }は不要のはず(?)
  renderTemplate: function (controller) {
    this.render('todos/index', { controller: controller });
  }
});
