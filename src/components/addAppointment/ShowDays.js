import React from 'react'
import { Button } from 'react-bootstrap';


const ShowDays = ({ showDay, funcLoadHoursThisDay }) => {

    const { Serial_code, Day_date } = showDay;

    return (

        <Button size="sm" variant="outline-secondary"
            onClick={() => funcLoadHoursThisDay(Serial_code, Day_date)}>
            {Day_date}
        </Button>
    )
}

export default ShowDays