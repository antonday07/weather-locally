import React, { useState, useEffect } from "react";

import {Link} from "react-router-dom";

import Day from "../Day/Day";
import styles from "./Days.module.css";

const Days = ({ forecast }) => {

  return (
     <div className={styles.list}>
        {forecast.map(day => {
           return (
              <Link to={`/day/${day.id}`}> 
                <Day key={day.id} {...day} />
              </Link>
            ) 
        })}
    </div>
  )
 
};

export default Days;
