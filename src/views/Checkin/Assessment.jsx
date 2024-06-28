import React from 'react'

const Assessment = ({ assessment }) => {
    const renderRQ = (sumRQ) => {
        let bg = '';
        let msg = '';

        if (sumRQ >= 1 && sumRQ <= 14) {
            msg = 'พลังใจระดับน้อย';
            bg = 'bg-red-600';
        } else if (sumRQ >= 15 && sumRQ <= 23) {
            msg = 'พลังใจระดับกลาง';
            bg = 'bg-orange-400';
        } else if (sumRQ >= 24 && sumRQ <= 30) {
            msg = 'พลังใจระดับมาก';
            bg = 'bg-green-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    const renderST5 = (st5) => {
        let bg = '';
        let msg = '';

        if (st5 >= 0 && st5 <= 4) {
            msg = 'น้อย';
            bg = 'bg-green-600';
        } else if (st5 >= 5 && st5 <= 7) {
            msg = 'ปานกลาง';
            bg = 'bg-blue-500';
        } else if (st5 >= 8 && st5 <= 9) {
            msg = 'มาก';
            bg = 'bg-orange-400';
        } else if (st5 >= 10 && st5 <= 15) {
            msg = 'มากที่สุด';
            bg = 'bg-red-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    const render2Q = (_2q) => {
        let bg = '';
        let msg = '';

        if (_2q == 0) {
            msg = 'ไม่เสี่ยง';
            bg = 'bg-green-600';
        } else {
            msg = 'เสี่ยง';
            bg = 'bg-red-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    const render9Q = (depression) => {
        let bg = '';
        let msg = '';

        if (depression < 7) {
            msg = 'ไม่มี';
            bg = 'bg-green-600';
        } else if (depression >= 7 && depression <= 12) {
            msg = 'น้อย';
            bg = 'bg-blue-500';
        } else if (depression >= 13 && depression <= 18) {
            msg = 'ปานกลาง';
            bg = 'bg-orange-400';
        } else if (depression >= 19) {
            msg = 'รุนแรง';
            bg = 'bg-red-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    const render8Q = (sucide) => {
        let bg = '';
        let msg = '';

        if (sucide <= 0) {
            msg = 'ไม่มี';
            bg = 'bg-green-600';
        } else if (sucide >= 1 && sucide <= 8) {
            msg = 'น้อย';
            bg = 'bg-blue-500';
        } else if (sucide >= 9 && sucide <= 16) {
            msg = 'ปานกลาง';
            bg = 'bg-orange-400';
        } else if (sucide >= 17) {
            msg = 'รุนแรง';
            bg = 'bg-red-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    const renderBurnout = (sumBurnout) => {
        let bg = '';
        let msg = '';

        if (sumBurnout < 7) {
            msg = 'เสี่ยงระดับน้อย';
            bg = 'bg-green-600';
        } else if (sumBurnout >= 7 && sumBurnout < 9) {
            msg = 'เสี่ยงระดับกลาง';
            bg = 'bg-orange-400';
        } else if (sumBurnout >= 9) {
            msg = 'เสี่ยงระดับมาก';
            bg = 'bg-red-600';
        }

        return <span className={`badge rounded-pill ${bg} text-[8px]`}>{msg}</span>;
    };

    return (
        <div className="flex flex-row justify-between">
            <div>
                <div className="flex flex-row items-center justify-start gap-1"><b>RQ</b> {renderRQ(assessment.rq1 + assessment.rq2 + assessment.rq3)}</div>
                <div className="flex flex-row items-center justify-start gap-1"><b>ST5</b> {renderST5(assessment.st_5)}</div>
                <div className="flex flex-row items-center justify-start gap-1"><b>2Q</b> {render2Q(assessment._2q)}</div>
            </div>
            <div>
                <div className="flex flex-row items-center justify-start gap-1"><b>9Q</b> {render9Q(assessment.depression)}</div>
                <div className="flex flex-row items-center justify-start gap-1"><b>8Q</b> {render8Q(assessment.sucide)}</div>
                <div className="flex flex-row items-center justify-start gap-1"><b>BO</b> {renderBurnout(assessment.burnout1 + assessment.burnout2 + assessment.burnout3)}</div>
            </div>
        </div>
    )
}

export default Assessment