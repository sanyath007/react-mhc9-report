import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGetUserDetailsQuery } from '../features/services/authApi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    // const { user: currentUser } = useAuth();
    const { data: user, isFetching } = useGetUserDetailsQuery('userDetails', { pollingInterval: 900000 });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = ['หน้าแรก', 'บริการ', 'เกี่ยวกับเรา', 'ติดต่อ'];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ศูนย์สุขภาพจิตที่ 9
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Avatar Dropdown */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                            >
                                <img
                                    src={`${import.meta.env.VITE_IMG_URL}/uploads/${user?.employee?.avatar_url}`}
                                    alt={user?.name}
                                    className="w-10 h-10 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-400 transition-all duration-200 object-cover"
                                />
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                                <svg
                                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                                        isMenuOpen ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-right">
                                    <div className="p-4 border-b border-gray-100">
                                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                                    </div>
                                    
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                alert('เปิดหน้าโปรไฟล์');
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                        >
                                            <User className="w-5 h-5 mr-3" />
                                            โปรไฟล์
                                        </button>
                                        
                                        <button
                                            onClick={() => {
                                                alert('เปิดหน้าการตั้งค่า');
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                        >
                                            <Settings className="w-5 h-5 mr-3" />
                                            การตั้งค่า
                                        </button>
                                        
                                        <div className="border-t border-gray-100 my-2"></div>
                                        
                                        <button
                                            onClick={() => {
                                                alert('ออกจากระบบ');
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                                        >
                                            <LogOut className="w-5 h-5 mr-3" />
                                            ออกจากระบบ
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar