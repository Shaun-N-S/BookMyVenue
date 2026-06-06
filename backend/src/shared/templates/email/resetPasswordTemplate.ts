import { emailLayout } from './Layout';

export const resetPasswordTemplate = (name: string, otp: string): string => {
  const body = `
    <h2>
      Reset Password
    </h2>

    <p>
      Hello ${name},
    </p>

    <p>
      We received a request to reset
      your password.
    </p>

    <p>
      Use this OTP:
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
      This OTP expires in
      <strong>5 minutes</strong>.
    </p>
  `;

  return emailLayout('Reset Password', body);
};
