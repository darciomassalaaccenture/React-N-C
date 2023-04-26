const getLeaderboard = async () => {
    const fetchInit = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
    };

    const url = `${process.env.REACT_APP_SERVER_BASE_URL}/leaderboard`;
    console.log(`Fetching leaderboard from ${url}...`);
    const response = await fetch(url, fetchInit);

    if (response.status !== 200) {
      console.error("Invalid response from client when fetching leaderboard", response);
      throw new Error("Invalid response from client when fetching leaderboard");
    }

    return await response.json();
  };

  export default getLeaderboard;