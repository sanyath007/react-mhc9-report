import React from 'react'
import SocialIcons from './SocialIcons'

const Footer = () => {
    return (
        <footer>
            <div className="container pt-4 pb-1">
                <div className="text-white px-2">
                    <div className="flex md:flex-row max-md:flex-col justify-between">
                        <div className="w-[80%] md:w-full md:mb-2">
                            <h3 className="text-2xl">ศูนย์สุขภาพจิตที่ 9</h3>
                            <ul className="text-sm font-thin my-2">
                                <li>เลขที่ 86 ถ.ช้างเผือก ต.ในเมือง อ.เมือง จ.นครราชสีมา 30000</li>
                                <li>โทรศัพท์ 0-4425-6729</li>
                                <li>โทรสาร 0-4425-6730</li>
                                <li>อีเมล mhc9dmh@gmail.com</li>
                            </ul>
                        </div>
                        <div className="max-sm:mb-2">
                            <SocialIcons />
                        </div>
                    </div>
                    <ul className="flex md:flex-row max-md:flex-col md:justify-center max-sm:items-start gap-1 text-xs font-thin w-full">
                        <li className="md:after:content-['|']"><a href="" className="md:mr-1">นโยบายการคุ้มครองข้อมูล</a></li>
                        <li className="md:after:content-['|']"><a href="" className="md:mr-1">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a></li>
                        <li><a href="">นโยบายการรักษาความมั่นคงปลอดภัยของเว็บไซต์</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom text-white py-3 flex justify-center">
                <div className="flex md:flex-row max-md:flex-col md:justify-center max-md:items-center gap-1 text-sm">
                    <span className="md:after:content-['|']">
                        <span className="md:mr-1">©2020 ศูนย์สุขภาพจิตที่ 9 All Rights Reserved</span>
                    </span>
                    <span>
                        By 
                        <a href="https://www.query-studio.com" target="_blank" rel="noreferrer" className="ml-1">
                            Sanya Thammawong
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer