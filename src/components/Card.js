import React, { useEffect } from 'react'
import "./Card.css"


export default function Card({ pair, imageURL, isFlipped, isWrong, onClick }) {

    return (
        <div className="card-container" onClick={onClick} >

            <div className={"card" + (isWrong ? " wrong" : "")}>
                <img className={"side front " + (isFlipped ? " hide " : " ")} src={imageURL} alt={pair} />
                {/* <div className={"side back " + (isFlipped ? "" : " hide")} /> */}
            </div>
        </div >
    )

}