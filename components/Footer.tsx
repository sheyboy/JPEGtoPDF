
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-800/50 mt-12 py-6 border-t border-slate-200 dark:border-slate-700/50">
            <div className="container mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} JPEG to PDF. All rights reserved.</p>
                <p className="text-sm mt-1">Powered by React, Tailwind CSS, and jsPDF.</p>
            </div>
        </footer>
    );
};
