import nodemailer from "nodemailer";

function sendMail(mailOption, cb) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mail = transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      return cb(error);
    } else {
      cb("Message sent: %s", info.messageId);
    }
  });
}

export const mail = function MailOptions(
  type = "default",
  name = "admin",
  email = "support@aerclothingbrand.ng",
  subject,
  message,
  items
) {
  let mailOption = {
    from: '"Arusi Ego Republic" <support@aerclothingbrand.ng>',
    to: `${email}`,
    subject: `${subject}`,
    text: "New message",
    html: EmailTemplate.render(type, {
      subject,
      name,
      message,
      items,
    }),
  };
  sendMail(mailOption, (response) => {
    console.log(response);
  });
};

class EmailTemplate {
  /* =========================
     Public API
  ========================= */
  static render(type = "default", data = {}) {
    switch (type) {
      case "order":
        return this.orderTemplate(data);
      default:
        return this.defaultTemplate(data);
    }
  }

  /* =========================
     Base Layout (Shared)
  ========================= */
  static baseLayout({ subject, content }) {
    return `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#efefef; font-family:Helvetica Neue, Helvetica, Arial, sans-serif; color:#000;">

  <!-- Header -->
  <div style="text-align:center; padding:25px 10px;">
    <h1 style="margin:0; color:#ccc; font-size:28px; font-weight:700;">
      Arusi Ego Republic
    </h1>
  </div>

  <!-- Email Container -->
  <div style="max-width:600px; margin:auto; padding:0 15px;">

    <!-- Content Card -->
    <div style="
      background:#ffffff;
      padding:30px;
      border-radius:12px;
      border:1px solid #dcdcdc;
      box-shadow:0 2px 6px rgba(0,0,0,0.05);
    ">

      <h2 style="font-size:22px; text-align:center; margin-top:0; margin-bottom:20px;">
        ${subject}
      </h2>

      ${content}

      <p style="margin-top:25px; line-height:1.6;">
        Best Regards,<br>
        <strong>Management</strong><br>
        Arusi Ego Republic
      </p>

      <div style="text-align:center; margin-top:30px;">
        <a href="https://aershoppingbrand.ng"
          style="display:inline-block; padding:12px 25px; background:#000; color:#fff;
          text-decoration:none; font-weight:bold; border-radius:6px;">
          Visit Website
        </a>
      </div>

    </div>

    <!-- Support Footer -->
    <div style="text-align:center; font-size:14px; padding:12px; margin-top:20px; background:#e5e7e9; border-radius:6px;">
      Have a problem? Contact us.<br>
      <span style="display:block; margin-top:5px;">
        Mondays–Fridays: 8am–5pm<br>
        Saturdays: 10am–4pm
      </span>
    </div>

    <!-- Copyright -->
    <div style="text-align:center; font-size:13px; color:#555; padding:10px 0;">
      © 2025 Arusi Ego Republic. All rights reserved.
    </div>

  </div>

</body>
</html>
    `;
  }

  /* =========================
     Default Email Template
  ========================= */
  static defaultTemplate({ subject, name, message }) {
    const content = `
      <p style="margin-top:0;">From Arusi Ego Republic,</p>

      <p>Hello, <strong>${name}</strong></p>

      <div style="margin:15px 0; line-height:1.6;">
        ${message}
      </div>
    `;

    return this.baseLayout({ subject, content });
  }

  /* =========================
     Order Email Template
  ========================= */
  static orderTemplate({ subject, name, items }) {
    const itemsHtml = items
      .map(
        ({ product, quantity }) => `
        <tr>
          <td style="padding:10px; border-bottom:1px solid #eee;">
            <img
              src="${product.images[0].url}"
              alt="${product.name}"
              width="70"
              style="border-radius:6px; display:block;"
            />
          </td>
          <td style="padding:10px; border-bottom:1px solid #eee;">
            <strong>${product.name}</strong><br>
            Price: $${product.price}
          </td>
          <td style="padding:10px; border-bottom:1px solid #eee; text-align:center;">
            ${quantity}
          </td>
        </tr>
      `
      )
      .join("");

    const content = `
      <p>Hello, <strong>${name}</strong></p>

      <p>Thank you for your order. Below are your order details:</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:15px;">
        <thead>
          <tr>
            <th align="left" style="padding-bottom:8px;">Product</th>
            <th align="left"></th>
            <th align="center" style="padding-bottom:8px;">Qty</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    `;

    return this.baseLayout({ subject, content });
  }
}
