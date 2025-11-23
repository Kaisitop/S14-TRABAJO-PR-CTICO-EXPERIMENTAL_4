import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Usuario ya existe" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async(req,res) => {
    const user = await User.findOne({email: req.body.email})

    if(!user) return res.status(400).json({message: 'User no encontrado'})
    
    const passwordVerify = await bcrypt.compare(req.body.password,user.password)
    if(!passwordVerify) return res.status(400).json({message: 'Contra no valida'})

  
    const token = jwt.sign({name: user.name, id: user._id},"tokensecreto",{expiresIn: "1h"})

    res.header('auth-token', token).json({
        message:`Bienvenido ${user.name}`,
        error:null,
        data:{token}
    })
}