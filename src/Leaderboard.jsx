import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import './assets/css/Leaderboard.css';

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
        console.log('Usuario logueado: ' + userName + ' con uid: ' + uid);
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
            <div class="leaderboard-container">
                <h1 class="leaderboard-title">Leaderboard</h1>
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th class="leaderboard-header">Ranking</th>
                            <th class="leaderboard-header">Username</th>
                            <th class="leaderboard-header">Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((item, index) => (
                        <tr key={index} class={`leaderboard-row ${index === 0 ? 'gold' : (index === 1 ? 'silver' : (index === 2 ? 'bronze' : ''))}`}>
                            <td class="leaderboard-cell">{index + 1}</td>
                            <td class="leaderboard-cell">{item.userName}</td>
                            <td class="leaderboard-cell">{item.puntuacion}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Leaderboard;