// src/pages/ImportPage.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import FileUploader, { FileUploadList } from '../components/features/FileUploader'; // Removed
import Card from '../components/common/Card';

const API_BASE_URL = 'http://127.0.0.1:8000';

const ImportPage = () => {
  const { t } = useTranslation();
  // const [uploadedFiles, setUploadedFiles] = useState([]); // Removed
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(t('import.status.noPdfUploaded')); // Default status

  /* // Removed
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };
  */

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files[0]) {
      setStatusMessage(`Selected file: ${event.target.files[0].name}`);
    } else {
      setStatusMessage(t('import.status.noPdfUploaded'));
    }
  };

  const handleUploadPdf = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    setIsLoading(true);
    setStatusMessage('Uploading and processing PDF...');
  
    try {
      // Thêm headers rõ ràng và không thiết lập Content-Type (FormData sẽ tự động thiết lập)
      const response = await fetch(`${API_BASE_URL}/upload_pdf`, {
        method: 'POST',
        body: formData,
        credentials: 'omit' // Thay đổi này có thể giúp với các vấn đề CORS
      });
  
      // Kiểm tra text response trước khi parse JSON
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON:', text);
        throw new Error('Invalid response format from server');
      }
  
      if (response.ok) {
        setStatusMessage(result.message || 'PDF processed successfully.');
        setSelectedFile(null);
        const fileInput = document.getElementById('pdf-upload-input');
        if (fileInput) {
          fileInput.value = '';
        }
      } else {
        setStatusMessage(`Error: ${result.detail || 'Failed to upload PDF.'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setStatusMessage(`Network error: ${error.message || 'Could not connect to server.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('import.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {t('import.description', 'Upload a PDF document to build a knowledge base. Each new PDF replaces the previous one.')}
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <div>
            <label htmlFor="pdf-upload-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('import.selectPdfLabel', 'Select PDF file')}
            </label>
            <input
              id="pdf-upload-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleUploadPdf}
            disabled={isLoading || !selectedFile}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('import.button.uploading', 'Uploading...') : t('import.button.upload', 'Upload PDF')}
          </button>
          {statusMessage && (
            <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm text-gray-700 dark:text-gray-300">
              <p>Status: {statusMessage}</p>
            </div>
          )}
        </div>
        {/* <FileUploader onUpload={setUploadedFiles} /> // Removed */}
        {/* <FileUploadList files={uploadedFiles} onRemove={handleRemoveFile} /> // Removed */}
      </Card>
    </div>
  );
};

export default ImportPage;