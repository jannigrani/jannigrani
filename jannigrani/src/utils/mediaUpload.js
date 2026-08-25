import pb from '../config/pocketbase';

export const uploadMedia = async (file, t) => {
  if (!file) {
    throw new Error(t('noFileError', 'No file selected. Please select a photo.'));
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    // Send the actual file to the PocketBase attachments database
    const record = await pb.collection('attachments').create(formData);

    // Create the final public web link to view the saved photo
    const fileUrl = `${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${record.file}`;

    return fileUrl;
  } catch (error) {
    console.error(error);
    throw new Error(t('uploadError', 'Failed to upload photo. Please try again.'));
  }
};