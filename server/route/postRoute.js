var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');

var uploadDir = path.join(__dirname, "../uploads");
var upload = multer({ dest: uploadDir });

var base64Img = require('base64-img');

var Post = require('./../db/model/post.js');

async function generatePosts() {
  for (var i = 1; i <= 30; i++) {
    var newPost = new Post({
      title: 'Title: ' + i,
      content: 'Content: '+ i,
    });

    await newPost.save();
  }
}

router.get('/api/posts', async function(request, response, next) {
  const perPage = request.query.perPage; //String
  const currentPage = request.query.currentPage;
  const searchText = request.query.searchText || "";

  const skipAmount = (parseInt(currentPage) - 1) * parseInt(perPage);
  const regex = new RegExp(searchText, 'gi');
  try {
      // const posts = await Post.find({
      //   $or: [
      //     {title: regex},
      //     {content: regex}
      //   ]
      // })
      //     .skip(skipAmount)
      //     .limit(parseInt(perPage));

    const posts = await Post.aggregate([
      {
        $lookup: {
          'from': 'users',
          'localField': 'author',
          'foreignField': '_id',
          'as': 'author'
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          createdAt: 1,
          author: {
            $arrayElemAt: ['$author', 0]
          }
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          createdAt: 1,
          'author.firstName': 1,
          'author.lastName': 1
        }
      },
      {
        $match: {
          $or: [
            {title: regex},
            {content: regex},
            {'author.firstName': regex},
            {'author.lastName': regex}
          ]
        }
      },
      {
        $skip: skipAmount
      },
      {
        $limit: parseInt(perPage)
      }
    ]);

      // const total = await Post.count({
      //   $or: [
      //     {title: regex},
      //     {content: regex}
      //   ]
      // });

    const total = await Post.aggregate([
      {
        $lookup: {
          'from': 'users',
          'localField': 'author',
          'foreignField': '_id',
          'as': 'author'
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          createdAt: 1,
          author: {
            $arrayElemAt: ['$author', 0]
          }
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          image: 1,
          createdAt: 1,
          'author.firstName': 1,
          'author.lastName': 1
        }
      },
      {
        $match: {
          $or: [
            {title: regex},
            {content: regex},
            {'author.firstName': regex},
            {'author.lastName': regex}
          ]
        }
      },
      {
        $count: 'total'
      }
    ]);

      response.send({
          posts: posts,
          total: total[0].total
      });
  } catch(err) {
    console.log(err);
    next(err);
  }
});

// {
//   title: 'Good day',
//     author: 'Jacob M.',
//   content: 'Today is perfect day'
// }



//localhsot:3000/api/posts/1234




router.get('/api/posts/:postId', (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId).populate({
    path: 'comments',
    select: 'createdAt user text',
    populate: {
      path: 'user',
      select: 'firstName lastName avaPath'
    }
  }).then((post) => {
    res.send({
      post: post
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
});

module.exports = router;