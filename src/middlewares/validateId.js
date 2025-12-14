import mongoose from "mongoose";
function idMongoDbValidator(id) {

    //Validacion básica que no esté vacio
    // y su longitud sea de 24 caracteres
    if (!id || id.trim().length !== 24)
        return false;

    //Validar formato hexadecimal
    const isValidHex = /^[0-9a-fA-F]{24}$/.test(id.trim());
    if (!isValidHex)
        return false;

    return true;
};//Fin de idMongoDbValidator

export const validateId = (req, res, next) => {
    try {
        const { id } = req.params;

        //Validaciones básicas de vacío, longitud y hex
        const validateId = idMongoDbValidator(id);

        if (!validateId)
            return res.status(400)
                .json({ message: ['ID inválido o longitud incorrecta'] });

        //Limpiamos el id de espacios en blanco
        const cleanId = id.trim();

        //Validar con mongoose
        if (!mongoose.isValidObjectId(cleanId))
            return res.status(400)
                .json({ message: ['Formato de ID no válido para MongoDB'] });


        //Validar si es posible crear un ObjectId con los datos del id
        const objectId = mongoose.Types.ObjectId.createFromHexString(cleanId);

        //Verificar que la compra fue exitosa
        if (objectId.toString() !== cleanId.toLowerCase())
            return res.status(400)
                .json({ message: ['Error al procesar el ID'] });

        //Validar ID "especiales reservados para mongodb
        // o IDs sospechosos para testing de ataques
        // o secuencias que nunca generará mongoDB en un id
        const reservedOrSuspiciousObjectsIds = [
            '000000000000000000000000',
            'ffffffffffffffffffffffff',

            //Patrones de testing comunes
            'aaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbbbbb',
            'cccccccccccccccccccccccc',

            //secuencias obvias
            '0123456789abcdef01234567',
            '123456789abcdef12345678',

            //Palabras/conceptos en hex
            'deadbeefdeadbeefdeadbeef', //"dead beef"
            'cafebabecafebabecafebabe', //"cafe babe"
            'badc0ffebadc0ffebadc0ffe', //"bad coffe"
        ];
        if (reservedOrSuspiciousObjectsIds.includes(cleanId.toLowerCase()))
            return res.status(400)
                .json({ message: ['Error ID reservado'] });

        next();

    } catch (error) {
        return res.status(400)
            .json({ message: ['El ID no es ObjectId válido'] });
    }//Fin de catch
};//Fin de validateId