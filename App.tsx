import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { PreviewGrid } from './components/PreviewGrid';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { Modal } from './components/Modal';
import { ApiDocs } from './components/ApiDocs';

declare const jspdf: any;

const App: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

    const handleFilesSelected = useCallback((selectedFiles: File[]) => {
        setError(null);
        const jpegFiles = selectedFiles.filter(file => file.type === 'image/jpeg');
        const newFiles = [...files, ...jpegFiles];
        
        if (jpegFiles.length < selectedFiles.length) {
            setError("Some files were not JPEGs and were ignored.");
        }
        setFiles(newFiles);
    }, [files]);

    const handleRemoveFile = useCallback((index: number) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);
    
    const handleClearAll = useCallback(() => {
        setFiles([]);
    }, []);

    useEffect(() => {
        const handlePaste = (event: ClipboardEvent) => {
            if (!event.clipboardData?.items) {
                return;
            }

            const pastedFiles: File[] = [];
            for (let i = 0; i < event.clipboardData.items.length; i++) {
                const item = event.clipboardData.items[i];
                if (item.kind === 'file' && item.type.startsWith('image/')) {
                    const file = item.getAsFile();
                    if (file) {
                        // Create a new File object to give it a name and ensure it's handled correctly.
                        const extension = file.type.split('/')[1] || 'jpeg';
                        const newFile = new File(
                            [file],
                            `pasted-image-${Date.now()}.${extension}`,
                            { type: file.type }
                        );
                        pastedFiles.push(newFile);
                    }
                }
            }

            if (pastedFiles.length > 0) {
                event.preventDefault();
                handleFilesSelected(pastedFiles);
            }
        };

        window.addEventListener('paste', handlePaste);
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, [handleFilesSelected]);

    const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = (err) => {
                reject(err);
            };
            img.src = url;
        });
    };

    const handleGeneratePdf = async () => {
        if (files.length === 0) {
            setError("Please upload at least one JPEG image.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            const PDF = jspdf.jsPDF;
            const pdf = new PDF('p', 'mm', 'a4');
            const a4Width = 210;
            const a4Height = 297;
            const margin = 10;
            const imgMaxWidth = a4Width - margin * 2;
            const imgMaxHeight = a4Height - margin * 2;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const imageUrl = URL.createObjectURL(file);

                try {
                    const dimensions = await getImageDimensions(imageUrl);
                    const ratio = Math.min(imgMaxWidth / dimensions.width, imgMaxHeight / dimensions.height);
                    const imgWidth = dimensions.width * ratio;
                    const imgHeight = dimensions.height * ratio;

                    const x = (a4Width - imgWidth) / 2;
                    const y = (a4Height - imgHeight) / 2;

                    if (i > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(imageUrl, 'JPEG', x, y, imgWidth, imgHeight);
                } finally {
                    URL.revokeObjectURL(imageUrl);
                }
            }

            pdf.save('jpeg-to-pdf.pdf');
        } catch (e) {
            console.error(e);
            setError("An error occurred while generating the PDF. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans text-slate-800 dark:text-slate-200">
            {isLoading && (
                <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
                    <Spinner />
                    <p className="text-white text-lg mt-4 font-medium">Generating your PDF...</p>
                    <p className="text-slate-300 text-sm mt-1">This may take a moment for large images.</p>
                </div>
            )}
            <Header onOpenApiModal={() => setIsApiModalOpen(true)} />
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    <FileUploader onFilesSelected={handleFilesSelected} />

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md text-center">
                            {error}
                        </div>
                    )}
                    
                    {files.length > 0 && (
                        <>
                            <PreviewGrid files={files} onRemoveFile={handleRemoveFile} />
                            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                                <button
                                    onClick={handleGeneratePdf}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
                                    disabled={isLoading}
                                >
                                    Generate PDF ({files.length} {files.length === 1 ? 'Image' : 'Images'})
                                </button>
                                 <button
                                    onClick={handleClearAll}
                                    className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-8 rounded-lg shadow-sm transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
                                    disabled={isLoading}
                                >
                                    Clear All
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer />
            <Modal 
                isOpen={isApiModalOpen} 
                onClose={() => setIsApiModalOpen(false)}
                title="API Usage Guide"
            >
                <ApiDocs />
            </Modal>
        </div>
    );
};

export default App;