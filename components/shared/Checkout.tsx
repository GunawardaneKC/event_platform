// import React, { useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js';

// import { IEvent } from '@/lib/database/models/event.model';
// import { Button } from '../ui/button';
// import { checkoutOrder } from '@/lib/actions/order.actions';

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);
//     if (query.get('success')) {
//       console.log('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
//     }
//   }, []);

//   const onCheckout = async () => {
//     const order = {
//       eventTitle: event.title,
//       eventId: event._id,
//       price: event.price,
//       isFree: event.isFree,
//       buyerId: userId
//     }

//     await checkoutOrder(order);
//   }

//   return (
//     <form action={onCheckout} method="post">
//       <Button type="submit" role="link" size="lg" className="button sm:w-fit">
//         {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
//       </Button>
//     </form>
//   )
// }

// export default Checkout

import React, { useEffect } from 'react';
import { IEvent } from '@/lib/database/models/event.model';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    };

    const result = await checkoutOrder(order);

    if (result) {
      console.log('Order placed successfully!');
      // Redirect to profile or show a success message
      window.location.href = '/profile';
    } else {
      console.log('Failed to place the order.');
    }
  };

  return (
    <form onSubmit={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {event.isFree ? 'Get Ticket' : 'Buy Ticket'}
      </Button>
    </form>
  );
};

export default Checkout;