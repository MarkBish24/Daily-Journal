const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("../db/db.js");

// Create a table if it doesn't already exist
//

//Window

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron + React",
    width: 1100,
    height: 700,
    icon: path.join(__dirname, "../assets", "Note-Icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  mainWindow.loadURL(startUrl);
}

ipcMain.handle("open-text-editor", async (event, date) => {
  console.log("Opening text editor for date:", date);
  const textEditorWindow = new BrowserWindow({
    title: date,
    width: 600,
    height: 800,
    icon: path.join(__dirname, "../assets", "Note-Icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  textEditorWindow.loadURL(
    process.env.VITE_DEV_SERVER_URL || `http://localhost:5173/editor/${date}`
  );

  textEditorWindow.on("closed", () => {
    console.log("Closing Window");
  });
});

ipcMain.handle("check-entry", async (event, date) => {
  const stmt = db.prepare(`SELECT content FROM journals WHERE entry_date = ?`);
  const result = stmt.get(date);
  return result ? true : false;
});

ipcMain.handle("get-entry", async (event, date) => {
  const stmt = db.prepare(`SELECT content FROM journals WHERE entry_date = ?`);
  const result = stmt.get(date);
  return result ? result.content : null;
});

ipcMain.handle("save-entry", async (event, date, content) => {
  try {
    console.log("Saving entry:", date, content);
    const stmt = db.prepare(`
      INSERT INTO journals (entry_date, content)
      VALUES (?,?)
      ON CONFLICT(entry_date) DO UPDATE SET content = excluded.content
    `);
    stmt.run(date, content);
  } catch (err) {
    console.error("Failed to save entry:", err.message);
  }
});
app.whenReady().then(createMainWindow);
