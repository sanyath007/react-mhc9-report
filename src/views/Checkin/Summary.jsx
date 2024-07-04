import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { FaRegArrowAltCircleLeft, FaBatteryEmpty, FaCloudRain, FaCommentDots, FaRegSmile, FaRegUser, FaUserInjured } from 'react-icons/fa'
import api from '../../api'
import moment from 'moment'

const CheckinSummary = () => {
    const [filters, setFilters] = useState({ sdate: moment().startOf('month').format('YYYY-MM-DD'), edate: moment().endOf('month').format('YYYY-MM-DD') });
    const [sum, setSum] = useState({ st5: 0, depression: 0, sucide: 0, burnout: 0, total: 0, helped: 0 })
    const [areas, setAreas] = useState([]);
    const [areaName, setAreaName] = useState('');

    useEffect(() => {
        if (areaName == '') {
            getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/changwats`);
        } else {
            getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/${areaName}/amphurs`);
        }
    }, [filters, areaName]);

    const getCheckins = async (url) => {
        try {
            const res = await api.get(url);

            setAreas(res.data);
            sumData(res.data);
        } catch (error) {
            console.log(error);
        }
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

    const onFetchCheckinWithAmphurs = async (changwat) => {
        getCheckins(`/api/checkins/${filters.sdate}/${filters.edate}/${changwat}/amphurs`);
        setAreaName(changwat);
    };

    const sumData = (data) => {
        let total = 0;
        let st5 = 0;
        let depression = 0;
        let sucide = 0;
        let burnout = 0;
        let helped = 0;

        data.forEach(item => {
            total   = total + item.total;
            st5     = st5 + item.st5;
            depression = depression + item.depression;
            sucide  = sucide + item.sucide;
            burnout = burnout + item.burnout;
            helped = helped + item.helped;
        });

        setSum({ total, st5, depression, sucide, burnout, helped });
    };

    return (
        <div className="container py-3 px-4 w-full bg-white border">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Mental Health Checkin</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-2xl font-bold mb-2">Mental Health Checkin</h1>

                <div className="border rounded-md p-3 my-2 flex justify-center">
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
                        <Col md={1} className="pl-0">
                            <div className="h-[20px]"></div>
                            <button type="button" className="btn btn-outline-danger btn-sm text-sm py-[3px]" onClick={handleClearInputs}>
                                เคลียร์
                            </button>
                        </Col>
                    </Row>
                </div>

                <Row className='my-3'>
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
                </Row>
                <Row>
                    <Col>
                        <table className="table table-bordered table-striped text-sm">
                            <thead>
                                <tr>
                                    <th className="text-center">{areaName == '' ? 'เขตสุขภาพที่ 9' : areaName}</th>
                                    <th className="w-[12%] text-center">จำนวนผู้ประเมิน</th>
                                    <th className="w-[10%] text-center">ช่วยเหลือแล้ว</th>
                                    <th className="w-[10%] text-center">เครียดสูง</th>
                                    <th className="w-[10%] text-center">เสี่ยงซึมเศร้า</th>
                                    <th className="w-[12%] text-center">เสี่ยงฆ่าตัวตาย</th>
                                    <th className="w-[10%] text-center">มีภาวะหมดไฟ</th>
                                    <th className="w-[10%] text-center">ติดตาม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {areas.map(data => (
                                    <tr className="font-thin" key={data.area}>
                                        <td className="text-center">
                                            {areaName == ''
                                                ? <button type="button" onClick={() => onFetchCheckinWithAmphurs(data.area)}>{data.area}</button>
                                                : data.area
                                            }
                                        </td>
                                        <td className="text-center">{data.total}</td>
                                        <td className="text-center">{data.helped}</td>
                                        <td className="text-center">{data.st5}</td>
                                        <td className="text-center">{data.depression}</td>
                                        <td className="text-center">{data.sucide}</td>
                                        <td className="text-center">{data.burnout}</td>
                                        <td className="text-center">
                                            <Link to={`/checkins/follow-up/${('province' in data) ? `${data.area}/${data.province}` : `''/${data.area}`}`} className="btn btn-danger btn-sm text-xs">
                                                ติดตาม
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="font-bold">
                                    <td className="text-center">รวม</td>
                                    <td className="text-center">{sum.total}</td>
                                    <td className="text-center">{sum.helped}</td>
                                    <td className="text-center">{sum.st5}</td>
                                    <td className="text-center">{sum.depression}</td>
                                    <td className="text-center">{sum.sucide}</td>
                                    <td className="text-center">{sum.burnout}</td>
                                    <td className="text-center"></td>
                                    </tr>
                            </tbody>
                        </table>

                        {areaName != '' && (
                            <button type="button" className="btn btn-outline-secondary btn-sm text-xs flex flex-row items-center gap-1" onClick={() => setAreaName('')}>
                                <FaRegArrowAltCircleLeft />เขตสุขภาพที่ 9
                            </button>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CheckinSummary