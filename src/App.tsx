import React, { useEffect, useState } from "react";
import "./App.css";
import Applications from "./Applications";
import Header from "./Header";
import { Button } from "./ui/Button/Button";
import styles from "./CreateApplicationForm/CreateApplicationForm.module.css";
import { useQuery } from "react-query";
import { ApplicationProps } from "./SingleApplication";

function App() {
  document.title = "iwoca | Application Portal";

  const [pageNumber, setPageNumber] = useState(1);
  const [limitNumber, setLimitNumber] = useState(5);
  const [isLoadingResults, setIsloadingResults] = useState(false);
  const [applications, setApplications] = useState<ApplicationProps[] | []>([]);

  const { isLoading, isError } = useQuery(
    ["results", pageNumber],
    () => fetchResults(pageNumber, limitNumber),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  useEffect(() => {
    setIsloadingResults(true);
    const fetchData = async () => {
      const results = await fetchResults(1, 5);
      setApplications(results);
    };

    fetchData();
    setIsloadingResults(false);
  }, []);

  const fetchResults = async (pageNumber: number, limitNumber: number) => {
    const response = await fetch(
      `http://localhost:3001/api/applications?_page=${pageNumber}&_limit=${limitNumber}`
    );
    if (!response.ok) {
      throw new Error("Error fetching results");
    }
    return response.json();
  };

  const handleLoadMore = async () => {
    const results = await fetchResults(pageNumber, limitNumber);
    setApplications((prevArray) => [...prevArray, ...results]);

    setPageNumber(pageNumber + 1);
  };

  return (
    <div className="App">
      <Header />
      <Applications
        applications={applications}
        isLoadingResults={isLoadingResults || isLoading}
        isError={isError}
      />
      <div className={styles.submitButtonDiv}>
        <Button
          className={styles.submitButton}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load more"}
        </Button>
      </div>
    </div>
  );
}

export default App;
