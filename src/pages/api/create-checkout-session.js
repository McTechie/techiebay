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

  const normalShippingRate = 'shr_1LITnqSBBKaXGd14nyEyqBUJ';
  const primeShippingRate = 'shr_1LI9XKSBBKaXGd14lJLCZD6p';

  const itemsHavePrimeDelivery = items.map(item => item.hasPrimeDelivery);
  const primeDeliveryEligible = itemsHavePrimeDelivery.every(Boolean);

  let shippingRates = [];

  if (primeDeliveryEligible) {
    shippingRates = [primeShippingRate];
  } else {
    shippingRates = [normalShippingRate];
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA', 'IN']
    },
    shipping_rates: shippingRates,
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