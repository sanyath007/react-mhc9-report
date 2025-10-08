import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { FaRegArrowAltCircleLeft, FaBatteryEmpty, FaCloudRain, FaCommentDots, FaRegSmile, FaRegUser, FaUserInjured } from 'react-icons/fa'
import { User, Settings, LogOut, Menu, X, MapPin, Phone, Mail, Facebook, Globe, ExternalLink, Activity, Users, TrendingUp, AlertTriangle, Heart, Brain, Smile, Calendar, BarChart3, PieChart, Download, Filter } from 'lucide-react'
import moment from 'moment'
import api from '../../api'
import { numberToCurrency } from '../../utils'
import { useGetInitialFormDataQuery } from '../../features/services/checkinApi'

const CheckinSummary = () => {
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [filters, setFilters] = useState({ sdate: moment().startOf('month').add(-1, "month").format('YYYY-MM-DD'), edate: moment().endOf('month').format('YYYY-MM-DD') });
    const [sum, setSum] = useState({ st5: 0, depression: 0, sucide: 0, burnout: 0, total: 0, helped: 0 })
    const [areas, setAreas] = useState([]);
    const [areaName, setAreaName] = useState('');
    const [areaType, setAreaType] = useState(''); // PROVINCE, AMPHUR    

    useEffect(() => {
        onFetchCheckin()
    }, []);

    const getCheckins = async (url) => {
        try {
            const res = await api.get(url);

            setAreas(res.data);
            sumData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAreaWithId = (name, type) => {
        const area = formData && formData[type].find(item => item.name.includes(name));

        return `${area?.id}-${area?.name}`;
    };

    const sumData = (data) => {
        let total = 0;
        let st5 = 0;
        let depression = 0;
        let sucide = 0;
        let burnout = 0;
        let helped = 0;

        data.forEach(item => {
            total       = total + item.total;
            st5         = st5 + item.st5;
            depression  = depression + item.depression;
            sucide      = sucide + item.sucide;
            burnout     = burnout + item.burnout;
            helped      = helped + item.helped;
        });

        setSum({ total, st5, depression, sucide, burnout, helped });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };

        setFilters(newFilters);
    };

    const handleClearInputs = () => {
        setFilters({ sdate: moment().startOf('month').format('YYYY-MM-DD'), edate: moment().endOf('month').format('YYYY-MM-DD') });
        setAreaName('');
    };

    const onFetchCheckin = async () => {
        if (areaName == '') {
            getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/changwats`);
        } else {
            getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/${areaName}/amphurs`);
        }
    };

    const onFetchCheckinWithAmphurs = async (changwat) => {
        getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/${changwat}/amphurs`);
        setAreaName(changwat);
        setAreaType('PROVINCE');
    };

    const onFetchCheckinWithTambons = async (changwat, amphur) => {
        getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/${changwat}/${amphur}/tambons`);
        setAreaName(amphur);
        setAreaType('AMPHUR');
    };

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
                    {/* <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Mental Health Checkin</Breadcrumb.Item>
                    </Breadcrumb> */}

                    <h1 className="text-center text-2xl font-bold mb-3">{areaName == '' ? 'เขตสุขภาพที่ 9' : areaName}</h1>

                    {/* Filtering Box */}
                    <Row className="flex justify-center w-full">
                        <Col md={4} className="text-sm mb-2">
                            <label htmlFor="">จากวันที่ :</label>
                            <input
                                type="date"
                                name="sdate"
                                value={filters.sdate}
                                onChange={handleInputChange}
                                className="form-control text-xs"
                            />
                        </Col>
                        <Col md={4} className="text-sm">
                            <label htmlFor="">ถึงวันที่ :</label>
                            <input
                                type="date"
                                name="edate"
                                value={filters.edate}
                                onChange={handleInputChange}
                                className="form-control text-xs"
                            />
                        </Col>
                        <Col md={1} className="flex flex-row gap-1 pl-0">
                            <div>
                                <div className="h-[20px]"></div>
                                <button type="button" className="btn btn-outline-primary btn-sm text-sm py-[3px]" onClick={onFetchCheckin}>
                                    ตกลง
                                </button>
                            </div>
                            <div>
                                <div className="h-[20px]"></div>
                                <button type="button" className="btn btn-outline-danger btn-sm text-sm py-[3px]" onClick={handleClearInputs}>
                                    เคลียร์
                                </button>
                            </div>
                        </Col>
                    </Row>
                    {/* End Filtering Box */}
                </div>

            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stat Card */}
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
                {/* <Row className='my-3'>
                    <Col md={6} className="mb-3">
                        <div className="rounded-md bg-blue-500 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">ทั้งหมด</p>
                                <h2 className="text-3xl font-extrabold">{sum.total}</h2>
                                <span className="text-xs font-thin"></span>
                            </div>
                            <FaRegUser size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="rounded-md bg-green-400 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">ช่วยเหลือแล้ว</p>
                                <h2 className="text-3xl font-extrabold">{sum.helped}</h2>
                                <span className="text-xs font-thin">{((sum.helped*100)/sum.total).toFixed(1)}%</span>
                            </div>
                            <FaRegSmile size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                </Row>
                <Row className='my-3'>
                    <Col md={3} className="mb-3">
                        <div className="rounded-md bg-cyan-300 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">เครียดสูง</p>
                                <h2 className="text-3xl font-extrabold">{sum.st5}</h2>
                                <span className="text-xs font-thin">{((sum.st5*100)/sum.total).toFixed(1)}%</span>
                            </div>
                            <FaCloudRain size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="rounded-md bg-amber-200 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">เสี่ยงซึมเศร้า</p>
                                <h2 className="text-3xl font-extrabold">{sum.depression}</h2>
                                <span className="text-xs font-thin">{((sum.depression*100)/sum.total).toFixed(1)}%</span>
                            </div>
                            <FaCommentDots size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="rounded-md bg-red-400 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">เสี่ยงฆ่าตัวตาย</p>
                                <h2 className="text-3xl font-extrabold">{sum.sucide}</h2>
                                <span className="text-xs font-thin">{((sum.sucide*100)/sum.total).toFixed(1)}%</span>
                            </div>
                            <FaUserInjured size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                    <Col md={3} className="mb-3">
                        <div className="rounded-md bg-gray-300 w-full h-[120px] p-4 flex flex-row justify-between items-center">
                            <div className="flex flex-col justify-center items-center gap-2 w-[60%]">
                                <p className="text-gray-700">มีภาวะหมดไฟ</p>
                                <h2 className="text-3xl font-extrabold">{sum.burnout}</h2>
                                <span className="text-xs font-thin">{((sum.burnout*100)/sum.total).toFixed(1)}%</span>
                            </div>
                            <FaBatteryEmpty size={'50px'} className="opacity-20" />
                        </div>
                    </Col>
                </Row> */}
                {/* End Stat Card */}

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

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                        สถิติการประเมินแยกตาม{areaName == '' ? 'จังหวัด' : 'ตำบล'}
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">{areaName == '' ? 'เขตสุขภาพที่ 9' : areaName}</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">จำนวนผู้ประเมิน</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">ช่วยเหลือแล้ว</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">เครียดสูง</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">เสี่ยงซึมเศร้า</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">เสี่ยงฆ่าตัวตาย</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">มีภาวะหมดไฟ</th>
                                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">ติดตาม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areas.map((data, index) => {
                                    let linkParams = ('province' in data)
                                                        ? `${getAreaWithId(data.area, 'amphurs')}/${getAreaWithId(data.province, 'changwats')}`
                                                        : `-/${getAreaWithId(data.area, 'changwats')}`;
                                    linkParams += `/${filters.sdate}/${filters.edate}`

                                    return (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4">
                                            {areaName == ''
                                                ? <button type="button" onClick={() => onFetchCheckinWithAmphurs(data.area)}>{data.area}</button>
                                                : <button type="button" onClick={() => onFetchCheckinWithTambons(areaName, data.area)}>{areaType === 'PROVINCE' ? data.area : data.tambon}</button>
                                            }
                                        </td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.total)}</td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.helped)}</td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.st5)}</td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.depression)}</td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.sucide)}</td>
                                        <td className="py-3 px-4 text-center">{numberToCurrency(data.burnout)}</td>
                                        <td className="py-3 px-4 text-center">
                                            <Link
                                                to={`/checkins/follow-up/${linkParams}`}
                                                className="btn btn-danger btn-sm text-xs">
                                                ติดตาม
                                            </Link>
                                        </td>
                                    </tr>
                                )})}
                                <tr className="font-bold">
                                    <td className="py-2 px-4">รวม</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.total)}</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.helped)}</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.st5)}</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.depression)}</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.sucide)}</td>
                                    <td className="py-2 px-4 text-center">{numberToCurrency(sum.burnout)}</td>
                                    <td className="py-2 px-4 text-center"></td>
                                </tr>
                            </tbody>
                        </table>

                        {areaName != '' && (
                            <button type="button" className="btn btn-outline-secondary btn-sm text-xs flex flex-row items-center gap-1" onClick={() => setAreaName('')}>
                                <FaRegArrowAltCircleLeft />เขตสุขภาพที่ 9
                            </button>
                        )}
                    </div>
                </div>
                {/* End Data Table */}

            </div>
        </div>
    )
}

export default CheckinSummary