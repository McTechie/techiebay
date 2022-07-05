const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map(item => ({
    description: item.description,
    quantity: item.count,
    price_data: {
      currency: 'inr',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image]
      }
    }
  }));

  // Does not work since only one shipping rate is allowed

  // const primeShippingRate = 'shr_1LI9XKSBBKaXGd14lJLCZD6p';
  // const freeShippingRate = 'shr_1LI9XKSBBKaXGd14lJLCZD6p';
  // const normalShippingRate = 'shr_1LI9XKSBBKaXGd14lJLCZD6p';

  // const checkoutSubtotal = items.reduce((total, item) => total + (item.price * item.count), 0);
  // const freeDeliveryEligible = checkoutSubtotal > 1000 ? freeShippingRate : normalShippingRate;

  // const itemsHavePrimeDelivery = items.map(item => item.hasPrimeDelivery);
  // const primeDeliveryEligible = itemsHavePrimeDelivery.every(Boolean);

  // let shippingRates = [];

  // if (primeDeliveryEligible) {
  //   shippingRates = [freeDeliveryEligible, primeShippingRate];
  // } else {
  //   shippingRates = [freeDeliveryEligible];
  // }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA', 'IN']
    },
    shipping_rates: ['shr_1LI9F9SBBKaXGd141pjTLCS9'],
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map(item => item.image))
    }
  });

  res.status(200).json({ id: session.id });
}