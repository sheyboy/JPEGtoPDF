
import React from 'react';
import { FilePdfIcon, CodeIcon } from './icons';

interface HeaderProps {
    onOpenApiModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenApiModal }) => {
    return (
        <header className="bg-white/80 dark:bg-slate-800/50 shadow-md backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <FilePdfIcon className="h-10 w-10 text-indigo-500 mr-4" />
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            JPEG to PDF Converter
                        </h1>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
                            Combine your JPEG images into a single PDF document effortlessly.
                        </p>
                    </div>
                </div>
                <button 
                    onClick={onOpenApiModal}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 px-4 py-2 rounded-lg transition-colors"
                >
                    <CodeIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">API Usage</span>
                </button>
            </div>
        </header>
    );
};
