import { useEffect, useState } from "react";
import styles from "../../styles/HashLoader.module.css";

export default function HashLoader({ isLoading, minTime = 2000, children }) {
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, minTime);

    return () => clearTimeout(timer);
  }, [minTime]);

  if (isLoading || !minTimePassed) {
    return (
      <div id={styles.story__hashloader__primary__primary_inner} data-name="Primary">
        <span id={styles.main_span}>
          <span id={styles.first_span}></span>
          <span id={styles.second_span}></span>
        </span>
      </div>
    );
  }

  return <>{children}</>;
}