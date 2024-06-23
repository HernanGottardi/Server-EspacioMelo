import express from "express";
import cors from "cors";
import {MercadoPagoConfig, Preference} from "mercadopago"

import dotenv from "dotenv";
dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCES_TOKEN,
})

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el SERVER :D")
});

app.post("/create_preference", async (req, res) =>{
    try 
    {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                },
            ],
            back_urls: {
                success: "https://espacio-melo-toiv.vercel.app/",
                failure: "https://espacio-melo-toiv.vercel.app/",
                pending: "https://espacio-melo-toiv.vercel.app/"
            },
            auto_return: "approved",
            "payer": {
            "id": 123,
            "nickname": "NORA"
        },
        };    

        const preference = new Preference(client);
        const result = await preference.create({body})
        res.json({id:result.id}); 
    } 
    catch (error) 
    {
        res.status(500).json({error: "Error al crear la preferencia :("})
    }
});

app.listen(port, ()=>{
    console.log(`El sevidor esta corriendo en el puerto ${port} 👀`)
})