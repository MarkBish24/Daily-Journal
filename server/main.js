const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("../db/db.js");

let textEditorWindow = null;
let mainWindow = null;

function createMainWindow() {
  mainWindow = new BrowserWindow({
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
//Opens a text editor
ipcMain.handle("open-text-editor", async (event, date) => {
  console.log("Opening text editor for date:", date);

  if (textEditorWindow && !textEditorWindow.isDestroyed()) {
    await new Promise((resolve) => {
      textEditorWindow.once("closed", resolve);
      textEditorWindow.close();
    });
    textEditorWindow = null;
  }

  textEditorWindow = new BrowserWindow({
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
    textEditorWindow = null;
    console.log("Closing Window");
  });
});

//checks if an entry exits returns a true or false
ipcMain.handle("check-entry", async (event, date) => {
  const stmt = db.prepare(`SELECT content FROM journals WHERE entry_date = ?`);
  const result = stmt.get(date);
  return result ? true : false;
});

//gets the entry if it does exist
ipcMain.handle("get-entry", async (event, date) => {
  const stmt = db.prepare(`SELECT content FROM journals WHERE entry_date = ?`);
  const result = stmt.get(date);
  return result ? result.content : null;
});

//saves the entry into the database
ipcMain.handle("save-entry", async (event, date, content) => {
  try {
    console.log("Saving entry:", date, content);
    const stmt = db.prepare(`
      INSERT INTO journals (entry_date, content)
      VALUES (?,?)
      ON CONFLICT(entry_date) DO UPDATE SET content = excluded.content
    `);
    stmt.run(date, content);
    if (textEditorWindow && !textEditorWindow.isDestroyed()) {
      textEditorWindow.close();
    }
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.reload();
    }
  } catch (err) {
    console.error("Failed to save entry:", err.message);
  }
});

ipcMain.handle("get-prev-entry-date", async (event, date) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM journals
      WHERE entry_date < ?
      ORDER BY entry_date DESC
      LIMIT 1
    `);
    const result = stmt.get(date);
    return result ? result.entry_date : null;
  } catch (err) {
    console.error("Failed to find previous date entry:", err.message);
  }
});

ipcMain.handle("get-next-entry-date", async (event, date) => {
  try {
    const stmt = db.prepare(`
      SELECT * FROM journals 
      WHERE entry_date > ?
      ORDER BY entry_date ASC
      LIMIT 1
      `);

    const result = stmt.get(date);
    return result ? result.entry_date : null;
  } catch (err) {
    console.error("Failed to find next entry:", err.message);
  }
});

app.whenReady().then(createMainWindow);
