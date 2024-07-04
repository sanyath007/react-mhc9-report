import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { generateQueryString } from '../../utils'
import { useGetInitialFormDataQuery } from '../../features/services/checkinApi';

const initialFormData = {
    changwats: [],
    amphurs: [],
    tambons: [],
};

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const [filters, setFilters] = useState(initialFilters);
    const [filteredAmphurs, setFilteredAmphurs] = useState([]);
    const [filteredTambons, setFilteredTambons] = useState([]);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (formData && filters.changwat != '') {
            const [id, name] = filters.changwat.split('-');
            const amphurs = formData?.amphurs.filter(amp => amp.chw_id == id);

            setFilteredAmphurs(amphurs);
        }
    }, [formData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };

        setFilters(newFilters);
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(initialFilters));
    };

    const filterAmphursByChangwat = (changwat) => {
        const [id, name] = changwat.split('-');
        const amphurs = formData?.amphurs.filter(amp => amp.chw_id == id);

        setFilteredAmphurs(amphurs);
        setFilters(prevState => ({ ...prevState, amphur: '', tambon: '' }));
    };

    const filterTambonsByAmphur = (amphur) => {
        const [id, name] = amphur.split('-');
        const tambons = formData?.tambons.filter(tam => tam.amp_id == id);

        setFilteredTambons(tambons);
        setFilters(prevState => ({ ...prevState, tambon: '' }));
    };

    return (
        <div className="border rounded-md p-3 my-2">
            <p className="font-bold mb-2">กรองข้อมูล</p>
            <Row className="mb-2">
                <Col md={4} className="text-sm mb-2">
                    <label htmlFor="">จังหวัด :</label>
                    <select
                        name="changwat"
                        value={filters.changwat}
                        onChange={(e) => {
                            handleInputChange(e);
                            filterAmphursByChangwat(e.target.value);
                        }}
                        className="form-control text-xs"
                    >
                        <option value="">-- เลือกจังหวัด --</option>
                        {(!isLoading && formData) && formData.changwats?.map(chw => (
                            <option key={chw.id} value={`${chw.id}-${chw.name}`}>{chw.name}</option>
                        ))}
                    </select>
                </Col>
                <Col md={4} className="text-sm">
                    <label htmlFor="">อำเภอ :</label>
                    <select
                        name="amphur"
                        value={filters.amphur}
                        onChange={(e) => {
                            handleInputChange(e);
                            filterTambonsByAmphur(e.target.value);
                        }}
                        className="form-control text-xs"
                    >
                        <option>-- เลือกอำเภอ --</option>
                        {filteredAmphurs.map(amp => (
                            <option key={amp.id} value={`${amp.id}-${amp.name}`}>{amp.name}</option>
                        ))}
                    </select>
                </Col>
                <Col md={4} className="text-sm">
                    <label htmlFor="">ตำบล :</label>
                    <select
                        name="tambon"
                        value={filters.tambon}
                        onChange={handleInputChange}
                        className="form-control text-xs"
                    >
                        <option>-- เลือกตำบล --</option>
                        {filteredTambons.map(tam => (
                            <option key={tam.id} value={`${tam.id}-${tam.name}`}>{tam.name}</option>
                        ))}
                    </select>
                </Col>
                <Col md={4} className="text-sm">
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
                <Col md={4} className="text-sm">
                    <label htmlFor="">ช่วงอายุ :</label>
                    <select
                        name="age_range"
                        value={filters.age_range}
                        onChange={handleInputChange}
                        className="form-control text-xs"
                    >
                        <option value="">-- เลือกช่วงอายุ --</option>
                        <option value="<20">น้อยกว่า 20 ปี</option>
                        <option value="20-29">20-29 ปี</option>
                        <option value="30-39">30-39 ปี</option>
                        <option value="40-49">40-49 ปี</option>
                        <option value="50-59">50-59 ปี</option>
                        <option value="60>">60 ปีขึ้นไป</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col md={12} className="flex justify-center">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleFilter}>
                        ตกลง
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-sm ml-1" onClick={handleClearInputs}>
                        เคลียร์
                    </button>
                </Col>
            </Row>
        </div>
    )
}

export default FilteringInputs