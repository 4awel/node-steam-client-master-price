const SteamUser = require('steam-user');
const client = new SteamUser({
    dataDirectory: null,
    enablePicsCache: false
});

client.logOn({
    anonymous: true
});

client.on('loggedOn', () => {
    console.log('Успешный вход в Steam');
    
    const appId = 578080;
    client.getProductInfo([appId], [], (apps) => {
        
        console.log('Данные получены успешно!\n');
        if (apps && apps[appId] && apps[appId].appinfo) {
            const appInfo = apps[appId].appinfo;
            console.log(appInfo)
        }
    
        
        client.logOff();
    });
});

client.on('error', (err) => {
    console.error('Ошибка:', err);
});