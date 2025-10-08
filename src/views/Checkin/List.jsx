import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { FaHandsHelping, FaPhoneSquareAlt, FaRegTimesCircle } from 'react-icons/fa'
import { User, Settings, LogOut, Menu, X, MapPin, Phone, Mail, Facebook, Globe, ExternalLink, Activity, Users, TrendingUp, AlertTriangle, Heart, Brain, Smile, Calendar, BarChart3, PieChart, Download, Filter } from 'lucide-react'
import moment from 'moment';
import api from '../../api'
import { toShortTHDate, generateQueryString } from '../../utils'
import Pagination from '../../components/Pagination';
import FilteringInputs from './FilteringInputs';
import Assessment from './Assessment';

const initialFilters = {
    changwat: '',
    amphur: '',
    tambon: '',
    sdate: '',
    edate: '',
    age_range: '',
};

const CheckinList = () => {
    const { amphur, changwat, sdate, edate } = useParams();
    const [patients, setPatients] = useState([]);
    const [pager, setPager] = useState(null);
    const [filters, setFilters] = useState(changwat ? { ...initialFilters, amphur: amphur != '-' ? amphur : '', changwat, sdate, edate } : initialFilters);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(filters));

    useEffect(() => {
        getCheckins(endpoint == '' ? `/api/checkins?page=${params}` : `${endpoint}${params}`);
    }, [endpoint]);

    useEffect(() => {
        getCheckins(`/api/checkins?page=${params}`);
    }, [params]);

    const getCheckins = async (url) => {
        try {
            const res = await api.get(url);
            const { data, ...paginated } = res.data;

            setPatients(data);
            setPager(paginated);
        } catch (error) {
            console.log(error);
        }
    };

    const getRiskGroup = (patient) => {
        if (patient.risk_group3 === 3 && [1,2,5].includes(patient.type_eng)) return "2.กลุ่มติดเชื้อ";
        else if (patient.risk_group4 === 4 && [1,2,5].includes(patient.type_eng)) return "3.กลุ่มถูกกักตัวที่บ้าน";
        else if (patient.risk_group5 === 5 && [1,2,5].includes(patient.type_eng)) return "4.ญาติของกลุ่มเสี่ยง/ญาติกลุ่มติดเชื้อ/ญาติกลุ่มกักกัน";
        else if (patient.type_eng === 4) return "5.กลุ่มบุคคลากรทางการแพทย์";
        else if (patient.type_eng === 3) return "6.กลุ่มอสม.";
        else if (patient.people_type === 'ผู้สัมผัสเสี่ยงสูง') return "ผู้สัมผัสเสี่ยงสูง";
        else if ((patient.risk_group8 === 8 || patient.risk_group1 === 1 || patient.risk_group2 === 2) && [1,2,5].includes(patient.type_eng)) return "7.1 ตกงาน/รายได้น้อย/ธุรกิจประสบปัญหา \n (กลุ่มเปราะบางทางสังคม)"
        else if ((patient.risk_group7 === 7 || patient.risk_group13 === 13 || patient.risk_group13_1 === 131 || patient.risk_group13_2 === 132 || patient.risk_group13_3 === 133 || patient.risk_group13_4 === 134) && [1,2,5].includes(patient.type_eng)) return "7.2 กลุ่มปัญหาสุขภาพจิตเดิม สุรา ยาเสพติด \n (กลุ่มเปราะบางทางสังคม)"
        else if ((patient.risk_group14 === 14 || patient.risk_group15 === 15 || patient.risk_group16  === 16) && [1,2,5].includes(patient.type_eng)) return "8.ครอบครัวมีผู้พึ่งพิง";
        else if (patient.risk_group6 === 6 && [1,2,5].includes(patient.type_eng)) return "9.ผู้ป่วยเรื้อรัง";
        else if (patient.age >= 60 && [1,2,5].includes(patient.type_eng)) return "7.3 ผู้สูงอายุ \n (กลุ่มเปราะบางทางสังคม)";
        else if ([1,2,5].includes(patient.type_eng)) return "7.4 ผู้พิการทางกาย \n (กลุ่มเปราะบางทางสังคม)";
        else return "1.ประชาชนทั่วไป";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/checkins">
                            Mental Health Checkin
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>รายการติดตาม</Breadcrumb.Item>
                    </Breadcrumb> */}

                    <h1 className="text-center text-2xl font-bold mb-3">รายการติดตาม</h1>

                    <FilteringInputs initialFilters={filters} onFilter={(queryStr) => setParams(queryStr)} />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-green-600" />
                        รายชื่อผู้ประเมินสุขภาพจิต
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="w-[4%] text-center py-3 px-1 text-sm font-semibold text-gray-700">#</th>
                                    <th className="w-[4%] text-center py-3 px-1 text-sm font-semibold text-gray-700">ช่วยเหลือ</th>
                                    <th className="w-[10%] text-center py-3 px-1 text-sm font-semibold text-gray-700">วันที่ประเมิน</th>
                                    <th>ชื่อ-สกุล</th>
                                    <th className="w-[4%] text-center py-3 px-1 text-sm font-semibold text-gray-700">อายุ</th>
                                    <th className="w-[4%] text-center py-3 px-1 text-sm font-semibold text-gray-700">เพศ</th>
                                    <th className="w-[20%] text-center py-3 px-1 text-sm font-semibold text-gray-700">ที่อยู่</th>
                                    <th className="w-[15%] text-center py-3 px-1 text-sm font-semibold text-gray-700">กลุ่มรายงาน</th>
                                    <th className="w-[15%] text-center py-3 px-1 text-sm font-semibold text-gray-700">ผลการประเมิน</th>
                                    <th className="w-[6%] text-center py-3 px-1 text-sm font-semibold text-gray-700">ติดตาม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients && patients.map((patient, index) => (
                                    <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-2 px-1 text-center">{pager.from+index}</td>
                                        <td className="py-2 px-1 text-center">
                                            <div className="flex justify-center">
                                                {patient.ok === '1'
                                                    ? <span className="text-success"><FaHandsHelping size={'20px'} /></span>
                                                    : <span className="text-danger"><FaRegTimesCircle size={'16px'} /></span>
                                                }
                                            </div>
                                        </td>
                                        <td className="py-2 px-1 text-center text-sm">
                                            {toShortTHDate(moment(patient.reg_date).format('YYYY-MM-DD'))} {moment(patient.reg_date).format('HH:MM')} น.
                                        </td>
                                        <td className="py-2 px-1 text-sm">
                                            <p className="font-bold">{patient.risk_name+ ' ' +patient.risk_surname}</p>
                                            <p className="flex flex-row gap-1 items-center text-primary"><FaPhoneSquareAlt size={'12px'} /> {patient.risk_tel}</p>
                                        </td>
                                        <td className="py-2 px-1 text-center text-sm">{patient.age}</td>
                                        <td className="py-2 px-1 text-center text-sm">{patient.gender}</td>
                                        <td className="py-2 px-1 text-sm">{patient.address+ ' อ.' +patient.name_amphure+ ' จ.' +patient.name_province}</td>
                                        <td className="py-2 px-1 text-sm">{getRiskGroup(patient)}</td>
                                        <td className="py-2 px-1 text-center text-sm">
                                            <Assessment assessment={patient} />
                                        </td>
                                        <td className="py-2 px-1 text-center">
                                            <a 
                                                href={`https://checkin.dmh.go.th/trace/index.php?id=${patient.id}&date_data=2024-02-07%2020:51:07&risk_name=${patient.risk_name}&risk_surname=${patient.risk_surname}&address=${patient.address}&amp_name=${patient.name_amphure}&dis_name_th=${patient.name_district}&province=${patient.name_province}&age=${patient.age}&risk_group=${getRiskGroup(patient)}&risk_tel=${patient.risk_tel}&2q=&9q=&8q=&burnout=`}
                                                className="btn btn-primary btn-sm text-xs"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                ติดตาม
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pager && (
                        <div className="flex flex-row items-center justify-between mt-3">
                            <div className="text-sm font-thin">หน้าที่ {pager.currentPage} / {pager.lastPage}</div>
                            <div className="text-sm font-thin">จำนวน {pager.total} รายการ</div>
                            <Pagination pager={pager} onPageClick={(url) => setEndpoint(url)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckinList