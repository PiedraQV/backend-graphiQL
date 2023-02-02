const express = require('express');
const { Server: HttpServer } = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const passport = require('passport');
//const parseArgs = require('minimist');
//const args = parseArgs(process.argv.slice(2));
const PORT = process.env.PORT || 1111;
const logger = require ('./middlewares/logguer/logguer')
const {graphqlHTTP} = require ( "express-graphql");
const {schema} = require ( "./graphql/Schema");
const {CarritoService} = require("./persistence/services/carrito.service.js");
const {ProductoService} = require ("./persistence/services/producto.service.js");
const router = require('./routes/router');
require('./middlewares/auth');

const app = express();

const httpserver = new HttpServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
	session({
		secret: process.env.secret,
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 100000,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('views'));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(cors());

async function getAllCarritos() {
    return CarritoService.getInstance().getAll();
}

async function getAllProductos() {
    return ProductoService.getInstance().getAll();
}

async function createCarrito() {
    return CarritoService.getInstance().create();
}

async function deleteCarritoById({id}) {
    return CarritoService.getInstance().deleteById(id);
}

async function getAllProductsFromCartById({id}) {
    return CarritoService.getInstance().getAllProductsFromCart(id);
}

async function saveProductToCart({id, idProd}) {
    return CarritoService.getInstance().saveProductToCart(id, idProd);
}

async function deleteProductFromCart({id, idProd}) {
    return CarritoService.getInstance().deleteProductFromCart(id, idProd);
}

async function getProductById({id}) {
    return ProductoService.getInstance().getProductById(id);
}

async function createProduct({data}) {
    return ProductoService.getInstance().create(data);
}

async function updateProductById({id, data}) {
    return ProductoService.getInstance().updateProductById(id, data);
}

async function deleteProductById({id}) {
    return ProductoService.getInstance().deleteById(id);
}

app.use(
    '/graphql',
    graphqlHTTP({
            schema,
            rootValue: {
                getAllCarritos,
                getAllProductos,
                createCarrito,
                deleteCarritoById,
                getAllProductsFromCartById,
                saveProductToCart,
                deleteProductFromCart,
                getProductById,
                createProduct,
                updateProductById,
                deleteProductById
            },
            graphiql: true
        }
    )
);


app.use(router);




const server = httpserver.listen(PORT, () => {
	mongoose.connect(process.env.MONGODBURL), (err)=>{
		err
		? logger.error("⛔ Error al conectarse a MongoDB")
        : logger.info("🆗 Conectaste a MongoDB")
	};
	console.log(`Server running on port ${PORT}`);
	logger.info("🆗 Conectaste a MongoDB")
});
server.on('error', err => console.log(`Error: ${err}`));