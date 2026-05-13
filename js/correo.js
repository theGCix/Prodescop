const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/enviar", async (req, res) => {
    try {
        const { nombre, telefono, correo, mensaje } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_DESTINO,
            subject: "Nuevo mensaje desde la landing page",
            html: `
                <h2>Nuevo mensaje</h2>

                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Correo:</strong> ${correo}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `
        });

        res.json({
            ok: true,
            mensaje: "Correo enviado correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            mensaje: "Error enviando correo"
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});