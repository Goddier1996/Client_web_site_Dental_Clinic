import React from 'react'
import '../../../css/appointment.css'
import { Row } from 'react-bootstrap';
import NoQueusesToday from '../NoQueusesToday';
import LoadingDaysHour from '../../loading/LoadingDaysHour';
import NotFoundPage from '../../tools/NotFoundPage'
import ShowHours from './ShowHours';
import { GetTime, GetDayWeekFromArray } from '../tools/AlertUserHaveTurnToday'
import ShowWhatDayToday from '../days/ShowWhatDayToday';
import { useQueryDataLoadingRefetchAutoData } from "../../../customHook/customQueryHook"
import { LoadHour } from '../../../Api/LoadDataFromApi'



const LoadingAllFuncShowHours = ({ showPopUpReCAPTCHA }) => {


    const dayFromArray = GetDayWeekFromArray(new Date);
    const hoursAndMinutes = GetTime(new Date);

    let takeDayAndCodeDayInResultHour = JSON.parse(sessionStorage.getItem("day"));

    const { isLoading: LoadingHours, data: Hours, isError: ErrorHours } =
        useQueryDataLoadingRefetchAutoData('HourDayId', null, LoadHour, takeDayAndCodeDayInResultHour);


    return (
        <>
            <div className='borderPlace'></div>

            <div className='chioseDayAndDay'>

                <ShowWhatDayToday takeDayAndCodeDayInResultHour={takeDayAndCodeDayInResultHour} />

                <div id="results" className="search-results">

                    {/* show Loading */}
                    {(LoadingHours) ?
                        <LoadingDaysHour />
                        :
                        (ErrorHours) ?
                            <NotFoundPage />
                            :
                            <>
                                {dayFromArray == takeDayAndCodeDayInResultHour.Day ?
                                    <>
                                        {hoursAndMinutes > "19:00" ?
                                            <NoQueusesToday />
                                            :
                                            <>
                                                <Row xs={2} md={4} lg={4}>
                                                    {Hours.map(hourThisDay => {

                                                        return (
                                                            <>
                                                                {hourThisDay.Hour_day > hoursAndMinutes ?

                                                                    <div key={hourThisDay._id}>
                                                                        <ShowHours hours={hourThisDay} ShowPopUpReCAPTCHA={() => showPopUpReCAPTCHA(hourThisDay.Hour_day, hourThisDay._id)} />
                                                                    </div>
                                                                    :
                                                                    ""
                                                                }
                                                            </>
                                                        )
                                                    }
                                                    )
                                                    }
                                                </Row>
                                            </>
                                        }
                                    </>
                                    :
                                    <Row xs={2} md={4} lg={4}>
                                        {Hours.map(hour => {
                                            return (
                                                <>
                                                    <div key={hour._id}>
                                                        <ShowHours hours={hour} ShowPopUpReCAPTCHA={() => showPopUpReCAPTCHA(hour.Hour_day, hour._id)} />
                                                    </div>
                                                </>
                                            )
                                        }
                                        )}
                                    </Row>
                                }
                            </>
                    }
                </div>
            </div>
        </>
    )
}


export default LoadingAllFuncShowHours;