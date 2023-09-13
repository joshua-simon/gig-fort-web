import React, { useState } from 'react';
import { format, addDays, startOfDay, getUnixTime, isSameDay } from "date-fns";
import { getNextSevenDays } from '../util/helperFunctions'
import { useSpring, animated } from 'react-spring';

const Carousel = ({ setSelectedDate, selectedDate }) => {

    const itemWidth = 80;
    const formattedDates = getNextSevenDays()
    const items = [...formattedDates, ...formattedDates, ...formattedDates];

    // Set the initial index to the middle of the duplicated array
    const initialIndex = formattedDates.length;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const [{ x }, set] = useSpring(() => ({
        x: -initialIndex * itemWidth
    }));

    const nextSlide = () => {
        set({ x: -(currentIndex + 1) * itemWidth });
        setCurrentIndex(prevIndex => {
            if (prevIndex >= items.length - 2) {
                set({ x: -formattedDates.length * itemWidth });
                return formattedDates.length;
            }
            return prevIndex + 1;
        });
    };

    const prevSlide = () => {
        set({ x: -(currentIndex - 1) * itemWidth });
        setCurrentIndex(prevIndex => {
            if (prevIndex <= 1) {
                set({ x: -2 * formattedDates.length * itemWidth });
                return 2 * formattedDates.length;
            }
            return prevIndex - 1;
        });
    };

    return (
        <div className='carousel-container'>
            <button style={styles.prevButton} onClick={prevSlide}>&lt;</button>
            <div style={{ ...styles.carousel, overflow: 'hidden' }}>
                <animated.div style={{
                    ...styles.slider,
                    display: 'flex',
                    transform: x.interpolate(x => `translateX(${x}px)`)
                }}>
                    {items.map((date, index) => (
                        <button key={index} style={styles.itemContainer} onClick={() => setSelectedDate(date)}>
                            <div style={{
                                ...styles.dateContainer,
                                backgroundColor: isSameDay(date, selectedDate) ? '#2596be' : 'rgb(55, 125, 138)'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", marginTop: '15%' }}>
                                    <p style={styles.date_header}>{format(date, "EEE")}</p>
                                    <p style={styles.date_subheader}>
                                        {format(date, "d")} {format(date, "MMM")}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </animated.div>
            </div>
            <button style={styles.nextButton} onClick={nextSlide}>&gt;</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
        position: 'absolute',
        left: 0
    },
    carousel: {
        width: 240,
        overflow: 'hidden',
    },
    slider: {
        display: 'flex',
        flexDirection: 'row',
    },
    itemContainer: {
        paddingLeft:0, 
        paddingRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        border:'none',
        backgroundColor:'transparent'
    },
    dateContainer: {
        borderRadius: '50%',
        width: 70,
        height: 70,
        backgroundColor: 'rgb(55, 125, 138)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // top:'10%',
    },
    date_header: {
        color: 'white',
        fontFamily: "NunitoSans",
        fontSize: 20,
        textAlign: 'center',
        margin:0,
        padding:0
    },
    date_subheader: {
        color: 'white',
        fontFamily: "NunitoSans",
        marginTop: -3,
        fontSize: 14,
        fontWeight: '600'
    },
    prevButton: {
        padding: 10,
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        background: 'transparent',
        border: 'none'
    },
    nextButton: {
        padding: 10,
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        background: 'transparent',
        border: 'none'
    }
};

export default Carousel;
