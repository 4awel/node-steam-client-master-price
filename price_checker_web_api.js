const axios = require('axios');

async function getPriceFromWebAPI(appId) {
    try {
        // Получаем базовую информацию об игре
        const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
        const apps = response.data.applist.apps;
        const appInfo = apps.find(app => app.appid === appId);
        
        if (appInfo) {
            console.log('Название:', appInfo.name);
            const endpoints = [
                `https://store.steampowered.com/api/appdetails?appids=${appId}`,
                `https://steamcommunity.com/market/priceoverview/?appid=${appId}&currency=1`,
                `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appId}`
            ];
            
            for (const endpoint of endpoints) {
                try {
                    const data = await axios.get(endpoint);
                    console.log(` Данные с ${endpoint.split('/')[2]}:`, JSON.stringify(data.data).substring(0, 200));
                    console.log('==================');
                    console.log(data.data[appId].data.price_overview);
                } catch (e) {
                }
            }
        }
        
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}

getPriceFromWebAPI(252490);