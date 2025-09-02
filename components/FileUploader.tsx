import React, { useState, useCallback, useRef } from 'react';
import { UploadCloudIcon } from './icons';

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files && files.length > 0) {
            onFilesSelected(files);
        }
    }, [onFilesSelected]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files && files.length > 0) {
            onFilesSelected(files);
        }
    };
    
    const onButtonClick = () => {
        fileInputRef.current?.click();
    };


    return (
        <div 
            className={`w-full p-8 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={onButtonClick}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="flex flex-col items-center text-center cursor-pointer">
                <UploadCloudIcon className="h-12 w-12 text-slate-400 dark:text-slate-500 mb-4" />
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    <span className="text-indigo-600 dark:text-indigo-400">Click to upload</span>, drag & drop, or paste
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Only JPEG files are accepted
                </p>
            </div>
        </div>
    );
};