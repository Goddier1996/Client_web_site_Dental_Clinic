import React from "react";
import InfoCounts from "./InfoModelCount";
import data from "../../../Json_date/date.json";
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
    return data.work.length;
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
                  img={"https://i.postimg.cc/LsT2SpnV/11.webp"}
                  loading={LoadingDoctors}
                />
                <InfoCounts
                  type={"Our Range of Dental Care Services"}
                  count={countServiceOurWork}
                  img={"https://i.postimg.cc/zXgNBWyv/22.webp"}
                  loading={LoadingServiceOurWork}
                />
                <InfoCounts
                  type={"Our Customer's"}
                  count={countUsers}
                  img={"https://i.postimg.cc/j2npD0dm/33.webp"}
                  loading={LoadingUsers}
                />
                <InfoCounts
                  type={"Customer's Review"}
                  count={countReviews}
                  img={"https://i.postimg.cc/MpwGJt9q/44.webp"}
                  loading={LoadingReviews}
                />
          </div>
        </m.div>
      )}
    </>
  );
};


export default ShowCountInfoClinic;