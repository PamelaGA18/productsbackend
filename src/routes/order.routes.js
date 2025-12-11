import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    getUserOrders,
    getOrderByID,
    deleteOrder
} from '../controllers/order.controller.js';

//importamos el middleware para validar el esquema
import { validateSchema } from '../middlewares/validateSchemas.js';

//importamos el esquema de validación para crear una orden
import { orderSchema } from '../schemas/order.schema.js';

const router = Router();

//Ruta para crear una orden
router.post('/order', authRequired, validateSchema(orderSchema), createOrder);

//Ruta para actualizar el status de una orden por Id
router.put('/order/:id', authRequired, updateOrderStatus);

//Obtener todas las ordenes para el administrador
router.get('/order/', authRequired, isAdmin, getAllOrders);

//Obtener todas las ordenes para un usuario
router.get('/order/getuserorders', authRequired, getUserOrders)

//Obtener una orden por id
router.get('/order/:id', authRequired, getOrderByID);

//Eliminar una orden
router.delete('/order/:id', authRequired, isAdmin, deleteOrder);

export default router;