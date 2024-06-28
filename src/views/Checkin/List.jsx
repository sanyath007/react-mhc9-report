import { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap';
import { FaHandsHelping, FaPhoneSquareAlt, FaRegTimesCircle } from 'react-icons/fa'
import api from '../../api'
import { toShortTHDate, generateQueryString } from '../../utils'
import Pagination from '../../components/Pagination';
import moment from 'moment';
import FilteringInputs from './FilteringInputs';

const initialFilters = {
    changwat: '',
    amphur: '',
    tambon: '',
    sdate: '',
    edate: '',
    age_range: '',
};

const CheckinList = () => {
    const [patients, setPatients] = useState([]);
    const [pager, setPager] = useState(null);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

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
        <div className="container py-3 px-4 w-full bg-white border">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/checkins">
                    Mental Health Checkin
                </Breadcrumb.Item>
                <Breadcrumb.Item active>รายการติดตาม</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-2xl font-bold mb-2">รายการติดตาม</h1>

                <FilteringInputs initialFilters={initialFilters} onFilter={(queryStr) => setParams(queryStr)} />

                <table className="table table-bordered text-xs">
                    <thead>
                        <tr>
                            <th className="w-[4%] text-center">#</th>
                            <th className="w-[4%] text-center">ช่วยเหลือ</th>
                            <th className="w-[8%] text-center">วันที่ประเมิน</th>
                            <th>ชื่อ-สกุล</th>
                            <th className="w-[4%] text-center">อายุ</th>
                            <th className="w-[4%] text-center">เพศ</th>
                            <th className="w-[25%] text-center">ที่อยู่</th>
                            <th className="w-[20%] text-center">กลุ่มรายงาน</th>
                            <th className="w-[4%] text-center">c_trace</th>
                            <th className="w-[4%] text-center">trace</th>
                            <th className="w-[4%] text-center">ok</th>
                            <th className="w-[6%] text-center">ติดตาม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((patient, index) => (
                            <tr className="font-thin" key={patient.id}>
                                <td className="text-center">{pager.from+index}</td>
                                <td className="text-center">
                                    <div className="flex justify-center">
                                        {patient.ok === '1'
                                            ? <span className="text-success"><FaHandsHelping size={'20px'} /></span>
                                            : <span className="text-danger"><FaRegTimesCircle size={'16px'} /></span>
                                        }
                                    </div>
                                </td>
                                <td className="text-center">
                                    {toShortTHDate(moment(patient.reg_date).format('YYYY-MM-DD'))} {moment(patient.reg_date).format('HH:MM')} น.
                                </td>
                                <td>
                                    {patient.risk_name+ ' ' +patient.risk_surname}
                                    <p className="flex flex-row gap-1 items-center"><FaPhoneSquareAlt size={'12px'} /> {patient.risk_tel}</p>
                                </td>
                                <td className="text-center">{patient.age}</td>
                                <td className="text-center">{patient.gender}</td>
                                <td>{patient.address+ ' อ.' +patient.name_amphure+ ' จ.' +patient.name_province}</td>
                                <td>{getRiskGroup(patient)}</td>
                                <td className="text-center">{patient.c_trace}</td>
                                <td className="text-center">{patient.trace}</td>
                                <td className="text-center">{patient.ok}</td>
                                <td className="text-center">
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

                {pager && (
                    <div className="flex flex-row items-center justify-between">
                        <div className="text-xs font-thin">หน้าที่ {pager.currentPage} / {pager.lastPage}</div>
                        <div className="text-xs font-thin">จำนวน {pager.total} รายการ</div>
                        <Pagination pager={pager} onPageClick={(url) => setEndpoint(url)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckinList