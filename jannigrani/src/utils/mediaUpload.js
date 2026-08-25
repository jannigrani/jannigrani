import pb from '../config/pocketbase';
import i18n from '../i18n';

export const uploadMedia = async (file) => {
  if (!file) {
    throw new Error(i18n.t('noFileError', 'No file selected. Please select a photo.'));
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
    throw new Error(i18n.t('uploadError', 'Failed to upload photo. Please try again.'));
  }
};