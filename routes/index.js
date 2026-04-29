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
    console.error('Error loading page:', error);
    return res.render('landing', {title: 'Downtown Donuts', errMessage: 'Unable to load page.'});
    }
});

router.get('/about',function(req,res,next){
  try {
  res.render('about',{title: 'About Us'});
  } catch (error) {
    console.error('Error loading About Us:', error);
    return res.render('about', {title: 'About Us', errMessage: 'Unable to load About Us.'});
    }
});

router.get('/comments',function(req,res,next){
  const TOTAL_COMMENTS = 10;
  const currentPage = Math.max(1, parseInt(req.query.page) || 1);
  const offset = (currentPage - 1) * TOTAL_COMMENTS;

  try {
    req.db.query('SELECT COUNT(*) AS total FROM todos;', (err, results) => {
      if (err) {
        console.error('Error counting comments:', err);
        return res.render('comments', {
          title: 'Comments', 
          todos: [], 
          errMessage: 'Unable to load comments.', 
          currentPage: 1, 
          totalPages: 1
        });
      }

      const totalComments = results[0].total;
      const totalPages = Math.ceil(totalComments / TOTAL_COMMENTS);

      req.db.query('SELECT task, birthday FROM todos ORDER BY birthday DESC LIMIT ? OFFSET ?;',[TOTAL_COMMENTS, offset], (err, results) => {
        if (err){
        console.error('Error loading comments:', err);
        return res.render('comments', {
          title: 'Comments', 
          todos: [], 
          errMessage: 'Unable to load comments.', 
          currentPage: 1, 
          totalPages: 1
        });
        }
        const todos = results.map(row => {
          const diffMs = Date.now() - new Date(row.birthday).getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);
          const diffDays = Math.floor(diffHours / 24);

          let diffTime;
          if (diffMins < 1) diffTime = 'just now';
          else if (diffMins < 60) diffTime = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
          else if (diffHours < 24) diffTime = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
          else diffTime = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

          return { task: row.task, diffTime };
      });

        res.render('comments',{title: 'Comments', todos, currentPage, totalPages});
      }
      )
    });
  } catch (error) {
    console.error('Error loading comments:', error);
        return res.render('comments', {
          title: 'Comments', 
          todos: [], 
          errMessage: 'Unable to load comments.', 
          currentPage: 1, 
          totalPages: 1
        });
      }
});

router.get('/menu',function(req,res,next){
  try {
  res.render('menu',{title: 'Menu'});
  } catch (error) {
    console.error('Error loading menu:', error);
        return res.render('menu', {title: 'Menu', errMessage: 'Unable to load menu.'});
    }
});

router.post('/comment', function (req, res, next) {
    const MAX_LENGTH = 500;
    const { comment } = req.body;

    if (!comment) {
      return res.render('comments',{
        title:'Comments', 
        todos: [], 
        errMessage: `Comment cannot be empty.`, 
        currentPage: 1, 
        totalPages: 1
      });
    }
    if (comment.length > MAX_LENGTH) {
        return res.render('comments', {
            title: 'Comments',
            todos: [],
            errorMessage: `Comment cannot be larger than ${MAX_LENGTH} characters`,
            currentPage: 1,
            totalPages: 1
        });
    }

    const birth = new Date();

    try {
      req.db.query('INSERT INTO todos (task, birthday) VALUES (?,?);', [comment, birth], (err, results) => {
        if (err) {
        console.error('Error posting comment:', err);
        return res.render('comments', {
          title: 'Comments', 
          todos: [], 
          errMessage: 'Unable to post comment.', 
          currentPage: 1, 
          totalPages: 1
        });
        }
        console.log('Comment added successfully:', results);
        res.redirect('/comments');
      });
    } catch (error) {
      console.error('Error posting comment:', err);
        return res.render('comments', {
          title: 'Comments', 
          todos: [], 
          errMessage: 'Unable to post comment.', 
          currentPage: 1, 
          totalPages: 1});
      }
});

module.exports = router;