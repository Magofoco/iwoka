import React from "react";
import styles from "./SingleApplication.module.css";

export interface ApplicationProps {
  id: number;
  first_name: string;
  last_name: string;
  loan_amount: number;
  loan_type: string;
  email: string;
  company: string;
  date_created: string;
  expiry_date: string;
  avatar: string;
  loan_history: LoanHistory[];
}

export interface LoanHistory {
  loan_started: string;
  loan_ended: string;
  principle: number;
  interest_rate: number;
  interest: number;
}

const SingleApplication = (props: ApplicationProps) => {
  const {
    company,
    first_name,
    last_name,
    email,
    loan_amount,
    date_created,
    expiry_date,
  } = props;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {first_name} {last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {loan_amount.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {formatDate(date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {formatDate(expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
