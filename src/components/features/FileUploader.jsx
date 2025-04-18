// src/components/features/FileUploader.jsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Upload, File, X } from 'lucide-react';
import Button from '../common/Button';
import { useToast } from '../common/Toast';

const FileUploader = ({ onUpload }) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  
  const onDrop = useCallback((acceptedFiles) => {
    // In a real app, you would handle the file upload to your backend
    // For this example, we'll just simulate it
    
    // Validate files
    const validFiles = acceptedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      return validTypes.includes(file.type);
    });
    
    if (validFiles.length !== acceptedFiles.length) {
      showToast({
        type: 'error',
        message: 'Some files have invalid format'
      });
    }
    
    if (validFiles.length === 0) return;
    
    // Process files
    const processedFiles = validFiles.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading',
      file
    }));
    
    // Notify parent component
    onUpload(processedFiles);
    
    // Simulate upload progress
    processedFiles.forEach(file => {
      const interval = setInterval(() => {
        file.progress += 10;
        
        onUpload((prev) => 
          prev.map(f => 
            f.id === file.id ? { ...f, progress: file.progress } : f
          )
        );
        
        if (file.progress >= 100) {
          clearInterval(interval);
          
          // Simulate processing time
          setTimeout(() => {
            onUpload((prev) => 
              prev.map(f => 
                f.id === file.id ? { ...f, status: 'completed' } : f
              )
            );
            
            showToast({
              type: 'success',
              message: `${file.name} uploaded successfully!`
            });
          }, 1000);
        }
      }, 300);
    });
  }, [onUpload, showToast]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {t('import.dropzone')}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t('import.supported')}
        </p>
      </div>
    </div>
  );
};

export const FileUploadList = ({ files, onRemove }) => {
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) {
      return "📄";
    } else if (fileType.includes('word')) {
      return "📝";
    } else if (fileType.includes('text')) {
      return "📑";
    }
    return "📁";
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  if (files.length === 0) return null;
  
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded files</h3>
      
      <div className="space-y-3">
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="mr-3 text-xl">{getFileIcon(file.type)}</div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(file.size)}
              </p>
              
              {file.status === 'uploading' && (
                <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            
            <div className="ml-4">
              {file.status === 'completed' ? (
                <button
                  onClick={() => onRemove(file.id)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X size={16} className="text-gray-500 dark:text-gray-400" />
                </button>
              ) : (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {file.progress}%
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;