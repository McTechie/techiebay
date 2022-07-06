const { buffer } = require('micro');
const { initializeApp, cert, getApp, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

// Connect to Firebase via Backend
const app = !getApps().length ? initializeApp({
  credential: cert({
    projectId: process.env.FB_PERM_PROJECT_ID,
    clientEmail: process.env.FB_PERM_CLIENT_EMAIL,
    privateKey: process.env.FB_PERM_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
}) : getApp();

const db = getFirestore();

// Connect to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  return db
    .collection('users').doc(session.metadata.email)
    .collection('orders').doc(session.id).set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`)
    });
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;

    // Verify that the EVENT came from Stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log('ERROR: ' + err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch(err => res.status(400).send(`WEBHOOK ERROR: ${err.message}`))
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}