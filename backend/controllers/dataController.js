const { PrismaClient } = require('@prisma/client');
const googleSheets = require('../services/googleSheets');
const prisma = new PrismaClient();
const { io } = require('../app');

// SYNC: Google Sheets to DB
const syncSheetToDb = async (req, res) => {
  const sheetData = await googleSheets.fetchSheetData();
  
  for (const [index, row] of sheetData.entries()) {
    await prisma.sheetData.upsert({
      where: { id: row.id },
      update: { ...row, sheetRow: index + 1 },
      create: { ...row, sheetRow: index + 1 },
    });
  }

  req.io.emit('db_update', { status: 'Database Updated from Google Sheets' });
  res.json({ message: 'Database updated from Google Sheets' });
};

// SYNC: DB to Google Sheets
const syncDbToSheet = async () => {
  const dbData = await prisma.sheetData.findMany({ orderBy: { sheetRow: 'asc' } });
  await googleSheets.updateSheetData(dbData);
};

const sync = async(req,res) => {
  const dbData = await prisma.sheetData.findMany({ orderBy: { sheetRow: 'asc' } });
  await googleSheets.updateSheetData(dbData);
 
  req.io.emit('db_update', { status: 'Google Sheets Updated' });
  res.json({ message:"Google sheets updated from Database" });
}

// CREATE: Add new data
const createData = async (req, res) => {
  const { name, role, team, status, age, avatar, email } = req.body;

  const lastRow = await prisma.sheetData.findFirst({ orderBy: { sheetRow: 'desc' } });
  const sheetRow = lastRow ? lastRow.sheetRow + 1 : 1;

  const newData = await prisma.sheetData.create({
    data: { name, role, team, status, age: parseInt(age), avatar, email, sheetRow },
  });

  await syncDbToSheet();
  req.io.emit('db_update', { status: 'New data added' });
  res.json(newData);
};

// READ: Get all data
const getAllData = async (req, res) => {
  const data = await prisma.sheetData.findMany({ orderBy: { sheetRow: 'asc' } });
  req.io.emit('db_update', { status: 'Data fetched and Google Sheets updated' });
  res.json(data);
};

// READ: Get single data
const getDataById = async (req, res) => {
  const { id } = req.params;
  const data = await prisma.sheetData.findFirst({ where: { id: parseInt(id) } });

  if (!data) return res.status(404).json({ error: 'Data not found' });
  req.io.emit('db_update', { status: 'Single data fetched and Google Sheets updated' });
  res.json(data);
};

// UPDATE: Update data by ID
const updateData = async (req, res) => {
  const { id } = req.params;
  const { name, role, team, status, age, avatar, email, sheetRow } = req.body;

  const updatedData = await prisma.sheetData.update({
    where: { id: parseInt(id) },
    data: { name, role, team, status, age: parseInt(age), avatar, email, sheetRow },
  });

  await syncDbToSheet();
  req.io.emit('db_update', { status: 'Data updated' });
  res.json(updatedData);
};

// DELETE: Remove data by ID
const deleteData = async (req, res) => {
  const { id } = req.params;
  const rowToDelete = await prisma.sheetData.findFirst({ where: { id: parseInt(id) } });

  await prisma.sheetData.delete({ where: { id: parseInt(id) } });

  if (rowToDelete) {
    await prisma.$executeRaw`UPDATE "SheetData" SET "sheetRow" = "sheetRow" - 1 WHERE "sheetRow" > ${rowToDelete.sheetRow}`;
  }

  await syncDbToSheet();
  req.io.emit('db_update', { status: 'Data deleted and re-ordered' });
  res.json({ message: 'Deleted and rows re-ordered' });
};

module.exports = { syncSheetToDb, sync, createData, getAllData, getDataById, updateData, deleteData };