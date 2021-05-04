import React from "react";
import styles from "./Day.module.css";

const Day = ({ title, image, temp }) => {
  return (
    <div className={styles.day}>
      <h3 className={styles.title}>{title}</h3>
      <img
        src={`http://openweathermap.org/img/wn/${image}@2x.png`}
        alt="Monday"
        className={styles.image}
      />
      <span className={styles.temperature}>{temp}°C</span>
    </div>
  );
};

export default Day;
