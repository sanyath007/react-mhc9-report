import React from 'react'
import { MapPin, Phone, Mail, Facebook, Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { title: 'หน้าแรก', href: '#' },
        { title: 'เกี่ยวกับเรา', href: '#' },
        { title: 'บริการของเรา', href: '#' },
        { title: 'ติดต่อเรา', href: '#' }
    ];

    const services = [
        { title: 'โปรแกรมพัฒนาทักษะ', href: '#' },
        { title: 'คำปรึกษาออนไลน์', href: '#' },
        { title: 'บทความและคู่มือ', href: '#' },
        { title: 'ลงทะเบียนเข้าใช้งาน', href: '#' }
    ];

    const relatedLinks = [
        { title: 'กรมสุขภาพจิต', href: 'https://www.dmh.go.th', external: true },
        { title: 'กระทรวงสาธารณสุข', href: 'https://www.moph.go.th', external: true },
        { title: 'ศูนย์สุขภาพจิตที่ 7', href: 'https://mhc7.dmh.go.th', external: true }
    ];

    return (
        <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Globe className="w-6 h-6" />
                            </div>
                                <h3 className="text-xl font-bold">ศูนย์สุขภาพจิตที่ 9</h3>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                ระบบสารสนเทศเพื่อการจัดการสำหรับการติดตาม
                                ให้ความช่วยเหลือกลุ่มผู้สัมผัสปัจจัยเสี่ยงสุขภาพจิตจาก
                                Mental Health Check In เขตสุขภาพที่ 9
                            </p>
                            <div className="flex space-x-3">
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Website"
                            >
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">ลิงก์ด่วน</h4>
                    <ul className="space-y-3">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <a 
                                    href={link.href}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                {/* <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">บริการของเรา</h4>
                    <ul className="space-y-3">
                        {services.map((service, index) => (
                            <li key={index}>
                                <a 
                                    href={service.href}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                                >
                                    {service.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div> */}

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-4 text-blue-400">ติดต่อเรา</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm leading-relaxed">
                            86 ถนนช้างเผือก ตำบลในเมือง<br />
                            อำเภอเมือง จังหวัดนครราชสีมา 30000
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            <a href="tel:043-236-111" className="text-gray-300 hover:text-white transition-colors text-sm">
                                0-4425-6729
                            </a>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                            <a href="mailto:mhc9dmh@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                                mhc9dmh@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
                </div>

                {/* Related Links Section */}
                {/* <div className="mt-12 pt-8 border-t border-gray-700">
                    <h4 className="text-sm font-semibold mb-4 text-gray-400">หน่วยงานที่เกี่ยวข้อง</h4>
                    <div className="flex flex-wrap gap-4">
                        {relatedLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 text-sm text-gray-300 hover:text-white"
                            >
                                <span>{link.title}</span>
                                {link.external && <ExternalLink className="w-3 h-3" />}
                            </a>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400 text-center md:text-left">
                            © {currentYear} ศูนย์สุขภาพจิตที่ 9 กรมสุขภาพจิต กระทรวงสาธารณสุข
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                นโยบายความเป็นส่วนตัว
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                เงื่อนไขการใช้งาน
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                แผนผังเว็บไซต์
                            </a>
                        </div>
                    </div>
                    {/* <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            เว็บไซต์นี้ได้รับการพัฒนาด้วย React และ Tailwind CSS เพื่อประสบการณ์การใช้งานที่ดีที่สุด
                        </p>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer