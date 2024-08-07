import ExcelJS from 'exceljs';
import fs from 'fs';
import { asyncHandler } from '../../../utils/errorHandling.js';
import orderModel from '../../../../DB/models/order.Model.js';
import inventoryModel from '../../../../DB/models/inventory.Model.js';
import reservationModel from '../../../../DB/models/reservationModel.js';
import path from 'path';
import { fileURLToPath } from 'url';


// __filename equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);

// __dirname equivalent for ES modules
const __dirname = path.dirname(__filename);

// Create the Report folder if it doesn't exist
const reportDir = path.join(__dirname, '../Report');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir);
}

// Helper function to generate file name
const generateFileName = (prefix) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  return `${prefix}_${timestamp}.xlsx`;
};

// Helper function to format dates
const formatDate = (date) => {
    if (date instanceof Date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
    return ''; // Return empty string if date is invalid
  };
  

/**
 * Generate Sales Report
 * @desc Generate a report on user orders over a specific period
 * @route GET /api/reports/sales
 */
export const generateSalesReport = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  // Parse dates
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Query to fetch orders within the date range or all orders
  const query = {};
  if (start && end) {
    query.createdAt = { $gte: start, $lte: end };
  }

  const orders = await orderModel.find(query).populate('items.menuItem tableId createdBy');

  // Create Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sales Report');

  // Define columns
  worksheet.columns = [
    { header: 'Order ID', key: 'orderId', width: 20 },
    { header: 'Customer', key: 'customer', width: 30 },
    { header: 'Table Number', key: 'tableNumber', width: 15 },
    { header: 'Items', key: 'items', width: 50 },
    { header: 'Total Price', key: 'totalPrice', width: 15 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Date', key: 'date', width: 20 },
  ];

  // Add rows to worksheet
  orders.forEach((order) => {
    worksheet.addRow({
      orderId: order._id.toString(),
      customer: order.createdBy?.name || 'N/A',
      tableNumber: order.tableId?.number || 'N/A',
      items: order.items
        .map(
          (item) => `${item.menuItem?.name || 'Unknown'} (x${item.quantity})`
        )
        .join(', '),
      totalPrice: `$${order.totalPrice.toFixed(2)}`,
      status: order.status,
      date: formatDate(order.createdAt),
    });
  });

  // Generate filename and save Excel file
  const fileName = generateFileName('Sales_Report');
  const filePath = path.join(reportDir, fileName);
  await workbook.xlsx.writeFile(filePath);

  return res.status(200).json({
    message: 'Sales report generated successfully',
    filePath,
  });
});

/**
 * Generate Inventory Report
 * @desc Generate a report on current inventory levels and usage
 * @route GET /api/reports/inventory
 */
export const generateInventoryReport = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;

  // Parse dates
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Query to fetch inventory levels within the date range or all inventory
  const query = {};
  if (start && end) {
    query.createdAt = { $gte: start, $lte: end };
  }

  const inventoryItems = await inventoryModel.find(query);

  // Create Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Inventory Report');

  // Define columns
  worksheet.columns = [
    { header: 'Item ID', key: 'itemId', width: 20 },
    { header: 'Item Name', key: 'itemName', width: 30 },
    { header: 'Quantity', key: 'quantity', width: 15 },
    { header: 'Usage', key: 'usage', width: 15 },
    { header: 'Date', key: 'date', width: 20 },
  ];

  // Add rows to worksheet
  inventoryItems.forEach((item) => {
    worksheet.addRow({
      itemId: item._id.toString(),
      itemName: item.itemName,
      quantity: item.quantity,
      usage: item.usage,
      date: formatDate(item.createdAt),
    });
  });

  // Generate filename and save Excel file
  const fileName = generateFileName('Inventory_Report');
  const filePath = path.join(reportDir, fileName);
  await workbook.xlsx.writeFile(filePath);

  return res.status(200).json({
    message: 'Inventory report generated successfully',
    filePath,
  });
});

/**
 * Generate Reservation Report
 * @desc Generate a report on reservation trends and statistics
 * @route GET /api/reports/reservations
 */
export const generateReservationReport = asyncHandler(
  async (req, res, next) => {
    const { startDate, endDate } = req.query;

    // Parse dates
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Query to fetch reservations within the date range or all reservations
    const query = {};
    if (start && end) {
      query.createdAt = { $gte: start, $lte: end };
    }

    const reservations = await reservationModel.find(query).populate(
      'createdBy'
    );

    // Create Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reservation Report');

    // Define columns
    worksheet.columns = [
      { header: 'Reservation ID', key: 'reservationId', width: 20 },
      { header: 'Customer Name', key: 'customerName', width: 30 },
      { header: 'Contact', key: 'customerContact', width: 30 },
      { header: 'Number of Guests', key: 'numberOfGuests', width: 15 },
      { header: 'Table Number', key: 'tableNumber', width: 15 },
      { header: 'Reservation Time', key: 'reservationTime', width: 20 },
      { header: 'Created By', key: 'createdBy', width: 30 },
      { header: 'Date', key: 'date', width: 20 },
    ];

    // Add rows to worksheet
    reservations.forEach((reservation) => {
      worksheet.addRow({
        reservationId: reservation._id.toString(),
        customerName: reservation.customerName,
        customerContact: reservation.customerContact,
        numberOfGuests: reservation.numberOfGuests,
        tableNumber: reservation.tableNumber,
        reservationTime: formatDate(reservation.time),
        createdBy: reservation.createdBy?.name || 'N/A',
        date: formatDate(reservation.createdAt),
      });
    });

    // Generate filename and save Excel file
    const fileName = generateFileName('Reservation_Report');
    const filePath = path.join(reportDir, fileName);
    await workbook.xlsx.writeFile(filePath);

    return res.status(200).json({
      message: 'Reservation report generated successfully',
      filePath,
    });
  }
);