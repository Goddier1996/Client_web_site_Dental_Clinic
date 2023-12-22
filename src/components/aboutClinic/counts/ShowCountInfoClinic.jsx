import React from "react";
import InfoCounts from "./InfoModelCount";
import date from "../../../Json_date/date.json";
import {
  LoadCountDoctors,
  LoadCountUsers,
  LoadCountReviews,
} from "../../../Api/LoadDataFromApi";
import { useQueryLoadingAllData } from "../../../customHook/customQueryHook";
import NotFoundPage from "../../tools/pageNotFound/NotFoundPage";
import { motion as m } from "framer-motion/dist/framer-motion";



const ShowCountInfoClinic = () => {


  const getLengthDataOurWorkFromJsonFile = () => {
    return date.work.length;
  };


  // use custom hook , useQuery Loading Data
  const {
    isLoading: LoadingReviews,
    data: countReviews,
    isError: ErrorReviews,
  } = useQueryLoadingAllData("CountReviews", LoadCountReviews);

  const {
    isLoading: LoadingUsers,
    data: countUsers,
    isError: ErrorUsers,
  } = useQueryLoadingAllData("CountUsers", LoadCountUsers);

  const {
    isLoading: LoadingDoctors,
    data: countDoctors,
    isError: ErrorDoctors,
  } = useQueryLoadingAllData("CountDoctors", LoadCountDoctors);

  const {
    isLoading: LoadingServiceOurWork,
    data: countServiceOurWork,
    isError: ErrorOurWork,
  } = useQueryLoadingAllData(
    "CountServiceOurWork",
    getLengthDataOurWorkFromJsonFile,
    null
  );

    
  return (
    <>
      {ErrorReviews || ErrorUsers || ErrorDoctors || ErrorOurWork ? (
        <NotFoundPage />
      ) : (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="cardsInfoAbout">

                <InfoCounts
                  type={"Doctor's"}
                  count={countDoctors}
                  img={"https://i.postimg.cc/TP3RsfDx/12.png"}
                  loading={LoadingDoctors}
                />
                <InfoCounts
                  type={"Types Of Dental Care Service"}
                  count={countServiceOurWork}
                  img={"https://i.postimg.cc/R0hBRdkV/ourworkservice.png"}
                  loading={LoadingServiceOurWork}
                />
                <InfoCounts
                  type={"Our Customer's"}
                  count={countUsers}
                  img={"https://i.postimg.cc/nVBt0CP7/users.png"}
                  loading={LoadingUsers}
                />
                <InfoCounts
                  type={"Customer Review's"}
                  count={countReviews}
                  img={"https://i.postimg.cc/rm47nPQc/reviewuser.png"}
                  loading={LoadingReviews}
                />
              
          </div>
        </m.div>
      )}
    </>
  );
};


export default ShowCountInfoClinic;