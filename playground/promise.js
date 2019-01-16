var getUser = function(id) {
  var user = {
    id: id,
    name: 'John'
  };

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (id <= 5) {
        reject('ID пользователя <= 5')

      } else {
        resolve(user);
      }
    }, 5000);
  });
};

getUser(6).then(function(user) {
  console.log(user);
  return getUser(20);
}).then(function(user) {
  console.log(user);
}).catch(function(error) {
  console.log(error);
});