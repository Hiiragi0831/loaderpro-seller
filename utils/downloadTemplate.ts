export const downloadTemplate = async (
  templatePath: string,
  fileName?: string,
) => {
  const response = await fetch(templatePath);
  if (!response.ok) {
    // обработка ошибки
    return;
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "template.xlsx";
  link.click();
  window.URL.revokeObjectURL(url);
};
