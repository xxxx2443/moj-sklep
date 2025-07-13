const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'blik'],
    line_items: [{
      price_data: {
        currency: 'pln',
        product_data: { name: 'Plik cyfrowy' },
        unit_amount: 1000,
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: process.env.URL + '/success.html',
    cancel_url: process.env.URL + '/cancel.html',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id }),
  };
};