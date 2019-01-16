const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',
  {useNewUrlParser: true}, function(error) {
    if (error) {
      console.log('Cannot connect to mongodb');
      process.exit(0);
    } else {
      console.log('Mongodb started on port 27017');
    }
  });

var Cat = mongoose.model('Cat',
  {
    name: String,
    age: Number
  });

var kitty = new Cat({
  name: 'Daisy',
  age: 3
});

// kitty.save().then(function(newCat) {
//   console.log(newCat);
// }).catch(function(error) {
//   console.log(error);
// });

//ВЫТАЩИТЬ ВСЕ ЭЛЕМЕНТЫ ИЗ БАЗЫ
// Cat.find().then(function(success) {
//   console.log(success);
// }).catch(function(error) {
//   console.log(error);
// });

//ВЫТАЩИТЬ ЭЛЕМЕНТ ПО ID
// Cat.findById("5c3df1fe0b93451947849079").then(function(success) {
//   console.log(success);
// }).catch((error) => {
//   console.log(error);
// });
//

//Удалить ЭЛЕМЕНТ ПО ID
// Cat.findByIdAndDelete('5c15118de5359014d371f1b8').then((deletedCat) => {
//   console.log('Из базы удалилась кошка ', deletedCat);
// }).catch((e) => {
//   console.log('Ошибка ', e);
// });

// Обновление Элемента
// Cat.findByIdAndUpdate('5c15118de5359014d371f1b8', {$set: {
//   name: 'NewName',
// }}, {new: true})
//   .then(function(updatedCat) {
//     console.log('updatedCat', updatedCat);
//   }).catch(function(error) {
//     console.log(error);
//   });
