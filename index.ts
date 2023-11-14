import { users } from './routes/user/index';
import { posts } from './routes/post/index';

var express = require('express')
var app = express()

app.use('/users', users);
app.use('/posts', posts);


app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})