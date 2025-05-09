const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const dbPath = path.join(__dirname, "../db/journal.db");
const db = new Database(dbPath);

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS entries (
        date TEXT PRIMARY KEY,
        content TEXT
    );
  `
).run();

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

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  textEditorWindow.loadURL(
    process.env.VITE_DEV_SERVER_URL || `http://localhost:5173/editor/${date}`
  );

  textEditorWindow.on("closed", () => {
    console.log("Closing Window");
  });
});

app.whenReady().then(createMainWindow);
