import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    //Obtenemos las cookies
    const { token } = req.cookies;

    if (!token) //Si no hay token en las cookies
        return res.status(401)
            .json({ message: ["No token, autorización denegada"] });

    //Verificar el token
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) //Si hay error 
            return res.status(403)
                .json({ message: ["Token Invalido"] });

        // Si no hay error en el token, imprimimos el usuario que inció sesión
        //en el objeto request
        req.user = user;
        next();
    })
}//Fin de authRequired