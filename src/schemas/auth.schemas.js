import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }).min(5, {
        message: 'El nombre de usuario debe de tener al menos 5 caracteres'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Formato de Email inválido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6, {
        message: 'El password debe de tener al menos 6 caracteres'
    })
}); //Fin de registerSchema


export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido'
    }).email({
        message: 'Formato de Email inválido'
    }),
    password: z.string({
        required_error: 'Contraseña requerida'
    }).min(6, {
        message: 'El password debe de tener al menos 6 caracteres'
    })
}); //Fin de loginSchema