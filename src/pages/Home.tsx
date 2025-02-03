import { useState, useEffect } from 'react'
import '../App.css'
import Item from "./Item"
import api from "../api-requests"



function Home() {

    const [top, setTop] = useState([]);
    const [recent, setRecent] = useState([]);
    const [exclusive, setExclusive] = useState([]);

    const [topPointer, setTopPointer] = useState(0)
    const [exclusivePointer, setExclusivePointer] = useState(0)
    const [recentPointer, setRecentPointer] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const fetchedTopItems = await api.fetchProducts("top", topPointer * 6, 6);
            const fetchedRecentItems = await api.fetchProducts("recent", recentPointer * 6, 6);
            const fetchedExclusiveItems = await api.fetchProducts("exclusive", exclusivePointer * 6, 6);

            setTop(fetchedTopItems)
            setExclusive(fetchedExclusiveItems)
            setRecent(fetchedRecentItems)
            console.log("use effect")
        }

        fetchData();
    }, [topPointer, exclusivePointer, recentPointer]);


    const clickRight = (section: number) => {
        if (section > 0) {
            if (topPointer == 9) setTopPointer(0)
            else setTopPointer(topPointer + 1)
        } else if (section === 0) {
            if (exclusivePointer == 9) setExclusivePointer(0)
            else setExclusivePointer(exclusivePointer + 1)
        } else {
            if (recentPointer == 9) setRecentPointer(0)
            else setRecentPointer(recentPointer + 1)
        }
    };

    const clickLeft = (section: number) => {
        if (section > 0) {
            if (topPointer === 0) setTopPointer(9);
            else setTopPointer(topPointer - 1);
        } else if (section === 0) {
            if (exclusivePointer === 0) setExclusivePointer(9);
            else setExclusivePointer(exclusivePointer - 1);
        } else {
            if (recentPointer === 0) setRecentPointer(9);
            else setRecentPointer(recentPointer - 1);
        }
    };

    console.log(top)
    console.log(exclusive)
    console.log(recent)

    return (
        <>
            <div className='top products'>
                <h1>Top</h1>
                <div className='row'>
                    <div className='items'>
                        {top.map((element) => {
                            return <Item item={element} />
                        })}
                    </div>
                    <div className='arrows'>
                        <div onClick={() => clickLeft(1)} className='arrow'>{"<"}</div>
                        <div onClick={() => clickRight(1)} className='arrow'>{">"}</div>
                    </div>
                </div>
            </div>
            <div className='exclusive products'>
                <h1>Exclusive</h1>
                <div className='row'>
                    <div className='items'>
                        {exclusive.map((element) => {
                            return <Item item={element} />
                        })}
                    </div>
                    <div className='arrows'>
                        <div onClick={() => clickLeft(0)} className='arrow'>{"<"}</div>
                        <div onClick={() => clickRight(0)} className='arrow'>{">"}</div>
                    </div>
                </div>
            </div>
            <div className='recent products'>
                <h1>Recent</h1>
                <div className='row'>
                    <div className='items'>
                        {recent.map((element) => {
                            return <Item item={element} />
                        })}
                    </div>
                    <div className='arrows'>
                        <div onClick={() => clickLeft(-1)} className='arrow'>{"<"}</div>
                        <div onClick={() => clickRight(-1)} className='arrow'>{">"}</div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Home