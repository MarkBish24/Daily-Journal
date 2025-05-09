const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const fs = require("fs");

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
    width: 500,
    height: 800,
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

app.whenReady().then(createMainWindow);
