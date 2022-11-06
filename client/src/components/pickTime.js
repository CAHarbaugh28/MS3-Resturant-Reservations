import React, {useState} from 'react';

export default function PickTime() {
    let times = [

    ]

    let [time, setTime] = useState("Select a time")

    let handleTimeChange = (e) => {
        setTime(e.target.value)
    }

        return (
            <div className="selectTime">
                {time}
                <br/>

                <select onChange={handleTimeChange}>
                    <option value="Select a time"> -- Select a time -- </option>

                    {times.map((time) => <option value={time.value}>{time.label}</option>)}
                </select>
            </div>
        )
};

