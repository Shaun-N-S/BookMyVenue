import { emailLayout } from './Layout';

export const resetPasswordTemplate = (name: string, resetLink: string): string => {
  const body = `
    <h2>Reset Password</h2>

    <p>Hello ${name},</p>

    <p>
      We received a request to reset your password.
    </p>

    <p>
      Click the button below to create a new password.
    </p>

    <div
      style="
        text-align:center;
        margin:30px 0;
      "
    >
      <a
        href="${resetLink}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 24px;
          text-decoration:none;
          border-radius:8px;
          display:inline-block;
        "
      >
        Reset Password
      </a>
    </div>

    <p>
      This link expires in
      <strong>15 minutes</strong>.
    </p>

    <p>
      If you didn't request this,
      please ignore this email.
    </p>
  `;

  return emailLayout('Reset Password', body);
};
