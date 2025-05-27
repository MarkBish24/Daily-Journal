export const handleOpenTextEditor = async (targetDate) => {
  try {
    await window.electronAPI.openTextEditor(targetDate);
  } catch (error) {
    console.error("Failed to open text editor:", error);
  }
};

export const handleCheckEntry = async (targetDate) => {
  try {
    const entry = await window.electronAPI.checkEntry(targetDate);
    return entry;
  } catch (error) {
    console.error("Failed to find date in DataBase:", error);
    return false;
  }
};

export const handleGetEntry = async (targetDate) => {
  try {
    const entry = await window.electronAPI.getEntry(targetDate);
    return entry;
  } catch (error) {
    console.error("Failed to find date in DataBase:", error);
    return null;
  }
};

export const handleSaveEntry = async (targetDate, content) => {
  try {
    await window.electronAPI.saveEntry(targetDate, content);
    console.log("Entry saved successfully");
  } catch (error) {
    console.error("Failed to save entry to database:", error);
  }
};

export const handleGetPrevEntryDate = async (targetDate) => {
  try {
    const prevDate = await window.electronAPI.getPrevEntryDate(targetDate);
    console.log("Found Previous Entry");
    return prevDate;
  } catch (error) {
    console.error("Failed to get previous entry from database:", error);
  }
};

export const handleGetNextEntryDate = async (targetDate) => {
  try {
    const nextDate = await window.electronAPI.getNextEntryDate(targetDate);
    console.log("Found Next Entry");
    return nextDate;
  } catch (error) {
    console.error("Failed to get next entry from database:", error);
  }
};

export const formatDate = (dateObj) => {
  const offsetDate = new Date(
    dateObj.getTime() - dateObj.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString().split("T")[0]; // Keeps local date
};
