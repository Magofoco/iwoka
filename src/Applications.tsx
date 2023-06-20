import React from "react";
import SingleApplication, { ApplicationProps } from "./SingleApplication";
import styles from "./Applications.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface ApplicationsProps {
  applications: ApplicationProps[] | undefined;
  isLoadingResults: boolean;
  isError: boolean;
}

const Applications = (props: ApplicationsProps) => {
  const { applications, isLoadingResults, isError } = props;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className={styles.Applications}>
      {applications?.map((application) => (
        <SingleApplication
          key={application.id}
          company={application.company}
          first_name={application.first_name}
          last_name={application.last_name}
          email={application.email}
          loan_amount={application.loan_amount}
          date_created={application.date_created}
          expiry_date={application.expiry_date}
          id={application.id}
          loan_type={application.loan_type}
          avatar={application.avatar}
          loan_history={[]}
        />
      ))}
      {isLoadingResults && (
        <div>
          <Skeleton count={5} />
        </div>
      )}
    </div>
  );
};

export default Applications;
