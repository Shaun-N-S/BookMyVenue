export const emailLayout = (title: string, body: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f4f4;
      font-family:Arial, Helvetica, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding:40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
            "
          >
            <!-- HEADER -->
            <tr>
              <td
                align="center"
                style="
                  background:#2563eb;
                  color:white;
                  padding:24px;
                "
              >
                <h1 style="margin:0;">
                  BookMyVenue
                </h1>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:32px;">
                ${body}
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td
                align="center"
                style="
                  padding:20px;
                  background:#f8fafc;
                  color:#64748b;
                  font-size:13px;
                "
              >
                © ${new Date().getFullYear()} BookMyVenue

                <br />

                This is an automated email.
                Please do not reply.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
