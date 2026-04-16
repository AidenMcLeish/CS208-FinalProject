var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('landing', { title: 'Downtown Donuts', todos: results });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/about',function(req,res,next){
  try {
  res.render('about',{title: 'About Us'});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/comments',function(req,res,next){
  try {
    req.db.query('SELECT * FROM todos;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
    res.render('comments',{title: 'Comments', todos: results});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/menu',function(req,res,next){
  try {
  res.render('menu',{title: 'Menu'});
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.post('/comment', function (req, res, next) {
    const { comment } = req.body;
    try {
      req.db.query('INSERT INTO todos (task) VALUES (?);', [comment], (err, results) => {
        if (err) {
          console.error('Error posting comment:', err);
          return res.status(500).send('Error posting comment');
        }
        console.log('Todo added successfully:', results);
        // Redirect to the home page after adding
        res.redirect('/comments');
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).send('Error posting comment');
    }
});

module.exports = router;