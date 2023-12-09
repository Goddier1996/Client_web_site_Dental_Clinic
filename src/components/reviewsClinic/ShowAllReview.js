import React from 'react'
import AddReviewLike from './AddReviewLike'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'


const ShowAllReview = ({ allReview }) => {


    const { _id, FirstName, User_Login, DatePublished, textReviews, Count_likes } = allReview;


    return (

        <div className="testimonial-box-container">

            <div key={_id} className="testimonial-box">

                <div className="box-top">

                    <div className="profileReviews">

                        <div className="nameInfo-userInfo">
                            <span>Name : {FirstName}</span>

                            <span>Login : @{User_Login}</span>
                        </div>
                    </div>

                    <div className="reviews">
                        <p>{DatePublished}</p>
                    </div>
                </div>

                <div className="client-comment">
                    <p>{textReviews}</p>
                </div>


                {/* add Like Review */}
                <div className='clickLike'>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Like ❤️</Tooltip>}>

                        <AddReviewLike FirstName={FirstName} id={_id} CountLikes={Count_likes} />

                    </OverlayTrigger>
                </div>
            </div>
        </div>
    )
}

export default ShowAllReview;