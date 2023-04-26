const Leaderboard = props => {
    if (Array.isArray(props.leaderboard)) {
        return (
            <div>
                <label>Leaderboard</label>
                <table>
                    <thead>
                        <tr>
                            <th className="lbrowname">Name</th>
                            <th className="lbrowscore">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.leaderboard.map(item => {
                            return (
                                <tr key={item.player_name}>
                                    <td className="lbrowdata lbrowname">{item.player_name}</td>
                                    <td className="lbrowdata lbrowscore">{item.player_score}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <label className="error">Error accessing leaderboard</label>
            </div>
        )
    }
};

export default Leaderboard;