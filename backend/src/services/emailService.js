const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmation = async ({ order, customer, items }) => {
  const itemsHtml = items
    .map(
      (item) =>
        `<li>${item.quantity} x ${item.name} — $${item.priceAtPurchase.toFixed(2)}</li>`,
    )
    .join("");

  const html = `
    <h1>Thank you for your order, ${customer.fullName}</h1>
    <p>Your order <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong> has been received.</p>
    <p>Total: <strong>$${order.totalPrice.toFixed(2)}</strong></p>
    <h2>Items</h2>
    <ul>${itemsHtml}</ul>
    <p>We will notify you when your watches ship.</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: customer.email,
    subject: `Order confirmation — #${order._id.toString().slice(-6).toUpperCase()}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOrderConfirmation,
};
