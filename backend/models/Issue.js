import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  issueDate: { type: Date, default: Date.now },
  returnDate: Date,
  returned: { type: Boolean, default: false },
  fine: { type: Number, default: 0 },
});

export default mongoose.model('Issue', issueSchema);