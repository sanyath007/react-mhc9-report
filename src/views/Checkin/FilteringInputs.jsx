import React, { useState } from 'react'
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
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const _filters = { ...filters, [name]: value };

        setFilters(_filters);
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(initialFilters));
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
                        onChange={handleInputChange}
                        className="form-control text-xs"
                    >
                        <option>-- เลือกจังหวัด --</option>
                    </select>
                </Col>
                <Col md={4} className="text-sm">
                    <label htmlFor="">อำเภอ :</label>
                    <select
                        name="amphur"
                        value={filters.amphur}
                        onChange={handleInputChange}
                        className="form-control text-xs"
                    >
                        <option>-- เลือกอำเภอ --</option>
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
                        <option value="13-15">13-15 ปี</option>
                        <option value="16-18">16-18 ปี</option>
                        <option value="19-22">19-22 ปี</option>
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