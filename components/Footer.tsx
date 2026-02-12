import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="py-8 px-6 text-center text-gray-400 text-xs border-t border-gray-100 mt-auto">
            <p className="mt-2">&copy; {new Date().getFullYear()} ProShot AI by <a href="https://starterdev.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">starterdev.io</a>. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
                <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-gray-600">Terms of Service</Link>
            </div>
        </footer>
    );
};
