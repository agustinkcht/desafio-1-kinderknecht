import Stripe from "stripe";
import environment from "../utils/env.util.js";
import dao from "../dao/dao.factory.js";
import CheckoutProductDTO from "../dto/checkoutProduct.dto.js";

const { cartManager } = dao

const stripe = new Stripe(environment.SECRET_STRIPE) 
// creo instancia de la clase Stripe, pasandole la clave secreta

// CREATE payment
const createRepository = async (user_id) => { 
    try {
        let productsOnCart = await cartManager.read(user_id) 
        productsOnCart = productsOnCart.map((each) => new CheckoutProductDTO(each));
            // recupero el carrito del usuario, mappeo los items y paso cada uno por el DTO
        const line_items = productsOnCart;
        const mode = "payment";
        const success_url = "http://localhost:8080/pages/thanks.html";
            // declaro las variables para el PAYMENT INTENT
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url
        });
            // creo el intent conectando con stripe y lo retorno
        return intent;
    } catch (err) {
        throw err;
    }
}

export { createRepository };