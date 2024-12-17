const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin Schema
const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3, // Minimum length for `id`
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum length for `password`
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Hash the password before saving
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Compare passwords for authentication
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Admin model
const Admin = mongoose.model('AdminAuth', adminSchema);
module.exports = Admin;
