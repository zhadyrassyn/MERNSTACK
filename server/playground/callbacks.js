var getUser = function(id, success, error) {
  var user = {
    id: id,
    name: 'John'
  };

  setTimeout(function() {
    if (id <= 5) {
      error('Пользователь не существует')
    } else {
      success(user);
    }
  }, 5000);
};

getUser(4, function(user) {
  console.log('user ', user);
  //Дальше обрабатываем
}, function(error) {
  console.log(error);
});
