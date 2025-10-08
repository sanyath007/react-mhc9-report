import React, { useEffect, useState } from 'react'
import { User, Settings, LogOut, Menu, X, MapPin, Phone, Mail, Facebook, Globe, ExternalLink, Activity, Users, TrendingUp, AlertTriangle, Heart, Brain, Smile, Calendar, BarChart3, PieChart, Download, Filter } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import StatCard from '../components/StatCard'
import api from '../api'
import { numberToCurrency } from '../utils'
// import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('month');

    // Mock data
    const monthlyData = [
        { month: 'ม.ค.', total: 1250, normal: 850, mild: 280, moderate: 90, severe: 30 },
        { month: 'ก.พ.', total: 1380, normal: 920, mild: 310, moderate: 110, severe: 40 },
        { month: 'มี.ค.', total: 1520, normal: 1050, mild: 330, moderate: 105, severe: 35 },
        { month: 'เม.ย.', total: 1450, normal: 980, mild: 320, moderate: 115, severe: 35 },
        { month: 'พ.ค.', total: 1680, normal: 1150, mild: 360, moderate: 130, severe: 40 },
        { month: 'มิ.ย.', total: 1750, normal: 1200, mild: 380, moderate: 125, severe: 45 }
    ];

    const severityData = [
        { name: 'ปกติ', value: 68.5, color: '#10b981' },
        { name: 'เล็กน้อย', value: 21.7, color: '#fbbf24' },
        { name: 'ปานกลาง', value: 7.1, color: '#f97316' },
        { name: 'รุนแรง', value: 2.7, color: '#ef4444' }
    ];

    const provinceData = [
        { province: 'นครราชสีมา', count: 3850, risk: 12.5 },
        { province: 'บุรีรัมย์', count: 2980, risk: 15.2 },
        { province: 'สุรินทร์', count: 2640, risk: 13.8 },
        { province: 'ชัยภูมิ', count: 1820, risk: 11.3 }
    ];

    const stats = [
        {
            title: 'ผู้เข้าประเมินทั้งหมด',
            value: '11,030',
            change: '+12.5%',
            icon: Users,
            color: 'bg-blue-500',
            trend: 'up'
        },
        {
            title: 'สุขภาพจิตดี',
            value: '7,551',
            change: '+15.3%',
            icon: Heart,
            color: 'bg-green-500',
            trend: 'up'
        },
        {
            title: 'ความเสี่ยงสูง',
            value: '1,092',
            change: '+8.2%',
            icon: AlertTriangle,
            color: 'bg-red-500',
            trend: 'up'
        },
        {
            title: 'ช่วยเหลือแล้ว',
            value: '85.7%',
            change: '+3.1%',
            icon: TrendingUp,
            color: 'bg-purple-500',
            trend: 'up'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด Mental Health Check-in เขตสุขภาพที่ 9</h1>
                            <p className="mt-2 text-gray-600 flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                เขตสุขภาพที่ 9 (นครราชสีมา, บุรีรัมย์, สุรินทร์, ชัยภูมิ)
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-3">
                            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <Filter className="w-4 h-4 mr-2" />
                                กรองข้อมูล
                            </button>
                            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Download className="w-4 h-4 mr-2" />
                                ดาวน์โหลดรายงาน
                            </button>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className="mt-6 flex space-x-2">
                        {['week', 'month', 'quarter', 'year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                timeRange === range
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {range === 'week' && 'สัปดาห์นี้'}
                                {range === 'month' && 'เดือนนี้'}
                                {range === 'quarter' && 'ไตรมาสนี้'}
                                {range === 'year' && 'ปีนี้'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change} จากเดือนที่แล้ว
                                    </p>
                                </div>
                                <div className={`${stat.color} p-4 rounded-xl`}>
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Alert Summary */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
                    <div className="flex items-start space-x-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-red-900 mb-2">ผู้ประเมินที่ต้องติดตามเร่งด่วน</h3>
                            <p className="text-red-700 text-sm mb-3">
                                พบผู้ประเมิน <span className="font-bold">15 ราย</span> ที่มีความเสี่ยงสูงและต้องติดตามอย่างใกล้ชิด
                            </p>
                            <button className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                ดูรายละเอียด
                            </button>
                        </div>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Monthly Trend */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                                แนวโน้มการประเมินรายเดือน
                            </h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#fff', 
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="normal" name="ปกติ" fill="#10b981" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="mild" name="เล็กน้อย" fill="#fbbf24" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="moderate" name="ปานกลาง" fill="#f97316" radius={[8, 8, 0, 0]} />
                                <Bar dataKey="severe" name="รุนแรง" fill="#ef4444" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Severity Distribution */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                            สัดส่วนระดับความรุนแรง
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RePieChart>
                                <Pie
                                    data={severityData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name} ${value}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {severityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {severityData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="font-semibold text-gray-900">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Province Statistics */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                        สถิติการประเมินแยกตามจังหวัด
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">จังหวัด</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">จำนวนผู้ประเมิน</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">อัตราความเสี่ยง</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {provinceData.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4">
                                            <span className="font-medium text-gray-900">{item.province}</span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className="text-gray-700">{item.count.toLocaleString()}</span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className={`font-semibold ${
                                                item.risk > 14 ? 'text-red-600' : 
                                                item.risk > 12 ? 'text-orange-600' : 
                                                'text-green-600'
                                            }`}>
                                                {item.risk}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                item.risk > 14 ? 'bg-red-100 text-red-700' : 
                                                item.risk > 12 ? 'bg-orange-100 text-orange-700' : 
                                                'bg-green-100 text-green-700'
                                            }`}>
                                                {item.risk > 14 ? 'ต้องติดตาม' : item.risk > 12 ? 'เฝ้าระวัง' : 'ปกติ'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                        <Activity className="w-8 h-8 mb-3" />
                        <h4 className="text-lg font-semibold mb-2">เริ่มการประเมิน</h4>
                        <p className="text-blue-100 text-sm mb-4">เริ่มต้นการประเมินสุขภาพจิตใหม่</p>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                            เริ่มเลย
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                        <Calendar className="w-8 h-8 mb-3" />
                        <h4 className="text-lg font-semibold mb-2">จัดการนัดหมาย</h4>
                        <p className="text-purple-100 text-sm mb-4">ดูและจัดการนัดหมายให้คำปรึกษา</p>
                        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                            ดูปฏิทิน
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                        <Smile className="w-8 h-8 mb-3" />
                        <h4 className="text-lg font-semibold mb-2">ทรัพยากรสุขภาพจิต</h4>
                        <p className="text-green-100 text-sm mb-4">บทความและคู่มือดูแลสุขภาพจิต</p>
                        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                            เข้าชม
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard