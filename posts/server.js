const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// todo el codigo del servidor vive dentro de la función app.prepare
app.prepare().then(() => {

    const server = express();

    // la ruta paar todos los blogs sirve el archivo index.js
    server.get('/blog', (req, res) => app.render(req, res, '/'));
    server.get('/', (req, res) => res.redirect(301, '/blog'));

    // la ruta para cada blog especifico
    /* 
    podemos configurar esta ruta para enviar el ID de cada publicación utilizando el 
    objeto de consulta de solicitud. Al cablear esta llamada object.assign, pasaremos 
    con éxito el parámetro id dentro del objeto req, cada vez que este enrutador reciba una id.
    */
    server.get('/blog/:id', (req, res) => {
        return app.render(req, res, '/post', Object.assign({id: req.params.id}, req.query ))
    })

    server.get('/post', (req, res) => {
        if(req.query.id) return res.redirect(`/blog/${req.query.id}`);   
        res.redirect(301, '/blog')
    }

    // nos aseguramos que nuestro servidor maneje todas las rutas
    server.get('/*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if(err) throw err
        console.log(`>.!. Read on Http://localhost:${port}`)
    });
})