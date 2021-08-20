const express = require('express');
const router = express.Router();
const { 
    createSession,
    verifyPay
} = require('../controllers/pay')




router.post('/create-checkout-session', createSession)
router.get('/payment_intents/:id/:userid?', verifyPay)


module.exports = router