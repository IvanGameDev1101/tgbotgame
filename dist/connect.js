import { GameFi } from '@ton/phaser-sdk';
const gameFi = await GameFi.create({
    network: 'testnet',
    connector: {
        // if tonconnect-manifest.json is placed in the root you can skip this option
        manifestUrl: '/assets/tonconnect-manifest.json',
        actionsConfiguration: {
            // address of your Telegram Mini App to return to after the wallet is connected
            // url you provided to BothFather during the app creation process
            // to read more please read https://github.com/ton-community/flappy-bird#telegram-bot--telegram-web-app
            twaReturnUrl: URL_YOU_ASSIGNED_TO_YOUR_APP
        },
        contentResolver: {
            // some NFT marketplaces don't support CORS, so we need to use a proxy
            // you are able to use any format of the URL, %URL% will be replaced with the actual URL
            urlProxy: `${YOUR_BACKEND_URL}/${PROXY_URL}?url=%URL%`
        },
        merchant: {
            jettonAddress: 'https://testnet.tonviewer.com/kQDoKP1Hez4Q41wkeZtlyEx7mjDHZyY3G74FYVmnU-ZCzUGK',
            tonAddress: 'https://testnet.tonviewer.com/kQBNQYHdx-ist8BthLj0-brKpgBy0W2xVn2rdnDghO8g5Jg4'
        }
    },
});
//# sourceMappingURL=connect.js.map