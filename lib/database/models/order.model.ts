// import { Schema, model, models, Document } from 'mongoose'

// export interface IOrder extends Document {
//   createdAt: Date
//   stripeId: string
//   totalAmount: string
//   event: {
//     _id: string
//     title: string
//   }
//   buyer: {
//     _id: string
//     firstName: string
//     lastName: string
//   }
// }

// export type IOrderItem = {
//   _id: string
//   totalAmount: string
//   createdAt: Date
//   eventTitle: string
//   eventId: string
//   buyer: string
// }

// const OrderSchema = new Schema({
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   stripeId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   totalAmount: {
//     type: String,
//   },
//   event: {
//     type: Schema.Types.ObjectId,
//     ref: 'Event',
//   },
//   buyer: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
// })

// const Order = models.Order || model('Order', OrderSchema)

// export default Order


import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  eventTitle: string;
  eventId: string;
  price: number;
  isFree: boolean;
  buyerId: string;
  stripeId?: string; // Make stripeId optional
}

const OrderSchema: Schema = new Schema({
  eventTitle: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  price: { type: Number, required: true },
  isFree: { type: Boolean, required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stripeId: { type: String, required: false }, // Make stripeId optional
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);