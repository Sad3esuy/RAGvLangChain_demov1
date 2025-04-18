// src/pages/ImportPage.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileUploader, { FileUploadList } from '../components/features/FileUploader';
import Card from '../components/common/Card';

const ImportPage = () => {
  const { t } = useTranslation();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('import.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Upload documents to analyze and query
        </p>
      </div>
      
      <Card>
        <FileUploader onUpload={setUploadedFiles} />
        <FileUploadList files={uploadedFiles} onRemove={handleRemoveFile} />
      </Card>
    </div>
  );
};

export default ImportPage;