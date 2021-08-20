const { response, request } = require('express')
const stripe = require('stripe')('sk_test_51HHLG6EsJ3x3uVHkN7LBa2hGGJ0z2elGP24X3eQfkwwoybBsyLBXn1RJmWevLUIHdENKUijdt0wuXqchS01eo1PH00bY6pZRbM');
const Usuario = require('../models/usuario')


const createSession = async (req, res) => {
    const price = 100 *100;
    // const usuarioID = '610c15ccc0619a0ab07998d1'
    // const { usuarioID } = req.params
    const YOUR_DOMAIN = 'http://localhost:3000';
    const url = req.url;
    const b = url.split('=');
    const usuarioID =  b[1];
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'T-shirt',
                  },
                  unit_amount: price, 
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/public/checkout.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        // res.json(session)
        res.redirect(303, session.url);

        const  paymentIntentId = session.payment_intent
        console.log(paymentIntentId)
        //creamos un documentos y guardamos el payment_intent id y su status actual
        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
        );
        const statusPay = paymentIntent.status
        console.log(statusPay)
        
        await Usuario.findByIdAndUpdate(usuarioID, {paymentIntentId,statusPay})
        
        // const { id } = req.params
        // const { _id, password, google, correo, ...resto } = req.body
        //    const usuario = await Usuario.findByIdAndUpdate(usuarioID, {paymentIntentId,statusPay})
        // res.json({
        //     usuario
        // });
    } catch (error) {
        
    }
}

const verifyPay = async (req, res) => {
    const { id, userid } = req.params
    let data = []
    const paymentIntent = await stripe.paymentIntents.retrieve(
      id
    );
    const statusPay = paymentIntent.status
    if(statusPay === "succeeded"){
        // Actualizamos el documento de la BD a status succeeded con el payment_intent id
        data.push({
            status: paymentIntent.status,
            id:paymentIntent.id,
            amount : paymentIntent.amount,
            client_secret: paymentIntent.client_secret,
            charge: [
                {
                id: paymentIntent.charges.data[0].id,
                email:paymentIntent.charges.data[0].billing_details.email,
                name:paymentIntent.charges.data[0].billing_details.name,
                }
            ]
        })
      await Usuario.findByIdAndUpdate(userid, {statusPay,dataPay:data})
      res.json(data)
    }else{
      res.json({
        // balanceGeneral,
        msg:'El pago no fue aprobado',
        status: paymentIntent.status,
      })
    }

}




module.exports = {
    createSession,
    verifyPay
}