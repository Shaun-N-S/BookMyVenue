import { emailLayout } from './Layout';

export const otpVerificationTemplate = (name: string, otp: string): string => {
  const body = `
    <h2>
      Email Verification
    </h2>

    <p>
      Hello ${name},
    </p>

    <p>
      Thank you for registering with
      BookMyVenue.
    </p>

    <p>
      Use the following OTP to verify
      your email address:
    </p>

    <div
      style="
        text-align:center;
        margin:30px 0;
      "
    >
      <span
        style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          color:#2563eb;
        "
      >
        ${otp}
      </span>
    </div>

    <p>
      This OTP is valid for
      <strong>5 minutes</strong>.
    </p>

    <p>
      If you did not request this,
      please ignore this email.
    </p>
  `;

  return emailLayout('Email Verification', body);
};
