import User from '../models/user.models.js';
import Role from '../models/roles.models.js';
import bcrypt from 'bcryptjs';
import { connectDB } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const createNewAdmin = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Datos del nuevo administrador
        const newAdminData = {
            username: 'SuperAdmin',
            email: 'superadmin@productos.com',
            password: 'Super.2025#'
        };

        console.log('Creando nuevo administrador...');
        console.log('Username:', newAdminData.username);
        console.log('Email:', newAdminData.email);
        console.log('Password:', newAdminData.password);

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email: newAdminData.email });
        if (existingUser) {
            console.log('❌ Error: El usuario con ese email ya existe');
            process.exit(1);
        }

        // Obtener el rol de administrador
        const adminRole = await Role.findOne({ role: 'admin' });
        if (!adminRole) {
            console.log('❌ Error: No se encontró el rol de administrador');
            process.exit(1);
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(newAdminData.password, 10);

        // Crear el nuevo usuario administrador
        const newAdmin = new User({
            username: newAdminData.username,
            email: newAdminData.email,
            password: hashedPassword,
            role: adminRole._id
        });

        await newAdmin.save();

        console.log('✅ Administrador creado exitosamente!');
        console.log('═══════════════════════════════════════');
        console.log('Credenciales del nuevo administrador:');
        console.log('Email:', newAdminData.email);
        console.log('Password:', newAdminData.password);
        console.log('═══════════════════════════════════════');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al crear el administrador:', error);
        process.exit(1);
    }
};

createNewAdmin();
