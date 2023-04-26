const updateLeaderboard = async (player1, player1Score, player2, player2Score) => {
    const fetchInit = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player1_name: player1,
        player1_score: player1Score,
        player2_name: player2,
        player2_score: player2Score,
      }),
    };

    const url = `${process.env.REACT_APP_SERVER_BASE_URL}/leaderboard`;
    console.log(`Updating leaderboard at ${url}...`);
    const response = await fetch(url, fetchInit);

    if (response.status !== 201) {
      console.error("Invalid response from client when fetching leaderboard", response);
      throw new Error("Invalid response from client when fetching leaderboard");
    }

    return await response.json();
  };

  export default updateLeaderboard;