export function prepareImageForUpload(
  dataUrl: string,
  fieldName: string = "file",
): FormData {
  // Create FormData
  const formData = new FormData();

  // Get MIME type from Data URL
  const mimeType = dataUrl.split(";")[0].split(":")[1]; // For example, 'image/jpeg' or 'image/png'

  // Get binary data from Data URL
  const base64 = dataUrl.split(",")[1];
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Create Blob from binary data
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  // Append Blob to FormData
  formData.append(fieldName, blob, `avatar.${mimeType.split("/")[1]}`); // The file name will be 'avatar.jpg' or 'avatar.png'

  return formData;
}
