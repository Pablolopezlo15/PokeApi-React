import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import '../assets/css/Leaderboard.css';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    const [user, setUser] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
    });
    }, []);
    if (auth.currentUser) {
        let uid = auth.currentUser.uid;
        let userName = auth.currentUser.displayName;
    }

    async function datosLeaderboard() {
        const db = getFirestore();
        const leaderboard = collection(db, "leaderboard");

        const querySnapshot = await getDocs(leaderboard);
        let data = [];

        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            data.push({
                puntuacion: docData.puntuacion,
                uid: docData.uid,
                userName: docData.userName
            });
        });

        // Ordena los datos por puntuación en orden descendente
        data.sort((a, b) => b.puntuacion - a.puntuacion);
        console.log(data);
        setLeaderboardData(data);
    }

    useEffect(() => {
        datosLeaderboard();
    }, []);

    return (
        <>
            <div className="leaderboard-container">
                <h1 className="leaderboard-title">Leaderboard</h1>
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th className="leaderboard-header"># Ranking</th>
                            <th className="leaderboard-header">Username</th>
                            <th className="leaderboard-header">Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((item, index) => (
                        <tr key={index} className={`leaderboard-row ${index === 0 ? 'gold' : (index === 1 ? 'silver' : (index === 2 ? 'bronze' : ''))}`}>
                            <td className="leaderboard-cell">{index + 1}</td>
                            <td className="leaderboard-cell">{item.userName}</td>
                            <td className="leaderboard-cell">{item.puntuacion}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Leaderboard;