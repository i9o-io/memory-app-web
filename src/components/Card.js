import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";

import { db } from '../libs/firebase.js';

import "../css/Card.css"

function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function Card(props) {

    const [data, setData] = useState({})
    const id = getParam("id")

    useEffect(() => {
        if (!id) { return }

        const docRef = doc(db, "data", id);
        getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
                console.log(docSnap.data())
                setData(docSnap.data())
                const userRef = doc(db, "users", docSnap.data().user);
                getDoc(userRef).then((userSnap) => {
                    if (userSnap.exists()) {
                        setData(prev => ({ ...prev, user: userSnap.data() }))
                        console.log(data)
                    }
                })
            } else {
                console.log("No such document!");
                window.alert("No such document!")
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            window.alert("Error getting document:", error)
        }
        );
    }, [])

    if (!data.text || !id) {
        return <div className="card"><p>Loading...</p></div>
    }

    return (
        <div className="card">
            <div>
                <div className="displayName">@{data.user?.displayName || "anonymous"}</div>
                <div>
                    {
                        data.text.split("\n").map((line) => { return (<p className='no-margin'>{line}</p>) })
                    }
                </div>
                <div className="timestamp">{data.timestamp}</div>
            </div>
        </div>

    )
}