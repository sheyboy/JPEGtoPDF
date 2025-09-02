
import React from 'react';
import { XIcon } from './icons';

interface PreviewGridProps {
    files: File[];
    onRemoveFile: (index: number) => void;
}

const PreviewCard: React.FC<{ file: File; onRemove: () => void }> = ({ file, onRemove }) => {
    const objectUrl = React.useMemo(() => URL.createObjectURL(file), [file]);

    React.useEffect(() => {
        return () => URL.revokeObjectURL(objectUrl);
    }, [objectUrl]);

    return (
        <div className="relative group aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
            <img src={objectUrl} alt={file.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 p-1.5 bg-white/70 dark:bg-slate-900/70 rounded-full text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-white"
                    aria-label="Remove image"
                >
                    <XIcon className="h-5 w-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs font-mono truncate">{file.name}</p>
                    <p className="text-slate-300 text-xs">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
            </div>
        </div>
    );
};


export const PreviewGrid: React.FC<PreviewGridProps> = ({ files, onRemoveFile }) => {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Your Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {files.map((file, index) => (
                    <PreviewCard key={index} file={file} onRemove={() => onRemoveFile(index)} />
                ))}
            </div>
        </div>
    );
};
