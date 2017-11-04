const express   =   require('express')
    , app       =   express();

app.set('port',	(process.env.PORT	||	33333));


// MAIN PAGE LOGIN
app.use(
    '/',
    express.static('./distDeveloper/', {
        'index' : 'index.html'
    })
);


app.listen(
    app.get('port'),
    function()	{
        console.log('Server	started: http://localhost:' + app.get('port') + '/');
    }
);