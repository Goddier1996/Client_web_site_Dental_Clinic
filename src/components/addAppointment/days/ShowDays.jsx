import React from 'react'
import { Button } from 'react-bootstrap';


const ShowDays = ({ showDay, funcLoadHoursThisDay }) => {

    return (
        <Button size="sm" variant="outline-secondary"
            onClick={() => funcLoadHoursThisDay(showDay.Serial_code, showDay.Day_date)}>
            {showDay.Day_date}
        </Button>
    )
}

export default ShowDays;