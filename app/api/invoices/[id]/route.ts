import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // In a real application, you would fetch the sale data from your database
  // For this example, we'll create a simple HTML invoice

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invoice #${id}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .invoice-title {
          font-size: 28px;
          color: #1a1a1a;
        }
        .invoice-details {
          margin-bottom: 40px;
        }
        .invoice-details-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        .invoice-table th, .invoice-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        .invoice-table th {
          background-color: #f8f8f8;
        }
        .invoice-total {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
        }
        .footer {
          margin-top: 60px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <div>
          <h1 class="invoice-title">INVOICE</h1>
          <p>Luxury Watch Store</p>
        </div>
        <div>
          <p><strong>Invoice #:</strong> ${id}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div class="invoice-details">
        <div class="invoice-details-row">
          <div>
            <h3>From:</h3>
            <p>Luxury Watch Store</p>
            <p>123 Timepiece Avenue</p>
            <p>London, UK</p>
            <p>info@luxurywatchstore.com</p>
          </div>
          <div>
            <h3>To:</h3>
            <p>Customer Name</p>
            <p>Customer Address</p>
            <p>customer@example.com</p>
          </div>
        </div>
      </div>
      
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Luxury Watch Purchase</td>
            <td>1</td>
            <td>$10,000.00</td>
            <td>$10,000.00</td>
          </tr>
          <tr>
            <td>Watch Service</td>
            <td>1</td>
            <td>$500.00</td>
            <td>$500.00</td>
          </tr>
        </tbody>
      </table>
      
      <div class="invoice-total">
        <p>Subtotal: $10,500.00</p>
        <p>Tax (20%): $2,100.00</p>
        <p>Total: $12,600.00</p>
      </div>
      
      <div class="footer">
        <p>Thank you for your business!</p>
        <p>Payment is due within 30 days.</p>
      </div>
    </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

