const {buildSchema} = require( "graphql");
const {ProductoType} = require ("./types/Producto.type");
const {CarritoType}= require ("./types/Carrito.type.js");
const {GetAllCarritosQuery} = require("./queries/GetAllCarritos.query.js");
const {GetAllProductosQuery} = require("./queries/GetAllProductos.query.js");
const {CreateCarritoMutation} = require("./mutations/CreateCarrito.mutation.js");
const {DeleteCarritoByIdMutation} = require ("./mutations/DeleteCarritoById.mutation.js");
const {GetAllProductsFromCartByIdQuery} = require ("./queries/GetAllProductsFromCartById.query.js");
const {SaveProductToCartMutation} = require ("./mutations/SaveProductToCart.mutation.js");
const {DeleteProductFromCartMutation} = require ("./mutations/DeleteProductFromCart.mutation.js");
const {GetProductByIdQuery} = require ("./queries/GetProductById.query.js");
const {ProductoNewInput} = require ("./inputs/ProductoNew.input.js");
const {CreateProductoMutation} = require( "./mutations/CreateProducto.mutation.js");
const {ProductoUpdateInput} = require ("./inputs/ProductoUpdate.input.js");
const {UpdateProductByIdMutation} = require ("./mutations/UpdateProductById.mutation.js");
const {DeleteProductByIdMutation} = require ("./mutations/DeleteProductById.mutation.js");

const schema = buildSchema(`
  ${ProductoType}
  ${ProductoNewInput}
  ${CarritoType}
  ${ProductoUpdateInput}
  
  type Query {
    ${GetAllCarritosQuery}
    ${GetProductByIdQuery}
    ${GetAllProductosQuery}
    ${GetAllProductsFromCartByIdQuery}  
  }
  
  type Mutation {
    ${DeleteCarritoByIdMutation}
    ${CreateCarritoMutation}
    ${SaveProductToCartMutation}
    ${DeleteProductFromCartMutation}
    ${CreateProductoMutation}
    ${UpdateProductByIdMutation}
    ${DeleteProductByIdMutation}
  }
`);

module.exports = {schema};