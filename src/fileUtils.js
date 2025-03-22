export const readCsvFile = async (filename) => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/${filename}`);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};