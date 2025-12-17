import mongoose, { Schema, model, models } from 'mongoose';

const InvoiceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    from: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    to: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    items: [{
        id: String,
        description: String,
        quantity: Number,
        rate: Number,
    }],
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Overdue'],
        default: 'Pending',
    },
    issueDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    taxRate: {
        type: Number,
        default: 0,
    },
    notes: {
        type: String,
        default: '',
    },
    logo: {
        type: String,
        default: null,
    },
    accentColor: {
        type: String,
        default: '#92487A',
    },
}, { timestamps: true });

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);

export default Invoice;
