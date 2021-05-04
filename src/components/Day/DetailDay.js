import React, {useState, useEffect} from 'react';

import styles from "./Day.module.css";
const DetailDay = ({ forecast, match }) => {

    const idItem = parseInt(match.params.id);
    console.log(idItem);
    console.log(forecast);
    const item = forecast.filter(item => {
        return item.id === idItem;
    })
    return (
        <div className={styles.Detail}>
            <div className={styles.Detail__Forecast}>
                <span className={styles.Detail__Time}>{item[0].today}</span>
                <div className={styles.Detail__Temp}>
                    <img 
                        src={`http://openweathermap.org/img/wn/${item[0].image}@2x.png`}
                        alt=""
                        className={styles.Detail__Icon}

                    />
                    <span className={styles.Detail__Degree}>{item[0].temp}°C</span>
                </div>
                <p className={styles.Detail__Des}>
                    This day maybe {item[0].description}
                </p>
                <p className={styles.Detail__Wind}>
                    Wind speed: 
                    <ion-icon name="leaf-outline" size="small"></ion-icon>
                    <span>{Math.round(item[0].windSpeed * 10) / 10} M/s</span>
                </p>


            </div>
            <div className={styles.Detail__Info}>
                <div className={styles.Detail__Period}>
                    <div className={styles.Detail__Suntime}>
                        <h2>Sunrise</h2>
                        <span>{item[0].sunrise}</span>
                    </div>

                    <div className={styles.Detail__Suntime}>
                        <h2>Sunset</h2>
                        <span>{item[0].sunset}</span>
                    </div>
                </div>
                <div className={styles.Detail__Rainy}>
                    <div className={styles.Detail__Cloud}>
                        <h3>Cloud</h3>
                        <div className={styles.Detail__Box}>
                            <ion-icon name="cloudy-outline"></ion-icon>
                            <span className="">{item[0].clouds} %</span>
                        </div>
                    </div>

                    <div className={styles.Detail__Cloud}>
                        <h3>Rain</h3>
                        <div className={styles.Detail__Box}>
                            <ion-icon name="rainy-outline"></ion-icon>
                            <span className="">{item[0].rain}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.Detail__RainChance}>
                    <h3>Pop</h3>
                    <div className={styles.Detail__Box}>
                            <ion-icon name="umbrella-outline"></ion-icon>
                            <span className="">{item[0].pops * 100}%</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default DetailDay;