import axios from 'axios';

// Функция получения прайса игры Раст
const resultData = {};
async function getPriceSteamGame(appId) {
    try {
        const res = await axios(`http://store.steampowered.com/api/appdetails?appids=${appId}&cc=ru&l=ru`);

        const data = res.data;
        if (data[appId]) {
            const gameData = data[appId].data;
            return {
                name: gameData.name,
                price: gameData.price_overview.final_formatted
            }
        } else {
            console.log("Ошибка 404, игра не найдена!");
            return null
        }

    } catch (err) {
        console.error("Ошибка при получение", err);
        return null;
    }
}

// 252490 - код игры Rust по Steam Store API



getPriceSteamGame(252490).then((gameInfo) => {
    console.log("Game: ", gameInfo.name);
    console.log("Prise: ", gameInfo.price)
});
