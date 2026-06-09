export function applicationReceivedHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application received.</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;padding:48px 48px 40px;">
          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.2em;color:#999999;text-transform:uppercase;">CANDACE</p>
            </td>
          </tr>
          <!-- Headline -->
          <tr>
            <td style="padding-bottom:32px;">
              <h1 style="margin:0;font-size:28px;font-weight:400;color:#111111;letter-spacing:-0.02em;">Application received.</h1>
            </td>
          </tr>
          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:20px;">
              <p style="margin:0;font-size:15px;color:#333333;line-height:1.6;">Hi ${firstName},</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;color:#555555;line-height:1.7;">Your application for the Candace 2026 cohort has been recorded. Our placement team will review your responses.</p>
            </td>
          </tr>
          <!-- What happens next -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:15px;color:#333333;font-weight:500;">What happens next:</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0;font-size:14px;color:#555555;line-height:1.7;"><span style="color:#999999;margin-right:12px;">1.</span>If selected, you will receive an invitation to reserve a courier slot.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0;font-size:14px;color:#555555;line-height:1.7;"><span style="color:#999999;margin-right:12px;">2.</span>The $29.99 courier fee is only charged when you accept that invitation.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:14px;color:#555555;line-height:1.7;"><span style="color:#999999;margin-right:12px;">3.</span>The dishwasher arrives for a 7-day supervised trial — and stays with you permanently.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- No charge -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-size:14px;color:#555555;line-height:1.7;">No charge has been made to your card today.</p>
            </td>
          </tr>
          <!-- 72 hours -->
          <tr>
            <td style="padding-bottom:48px;">
              <p style="margin:0;font-size:14px;color:#555555;line-height:1.7;">We will be in touch within 72 hours.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f0f0f0;padding-top:24px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.15em;color:#bbbbbb;text-transform:uppercase;">CANDACE &nbsp;·&nbsp; A PRIVATE TECHNOLOGY &nbsp;·&nbsp; 2026</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
