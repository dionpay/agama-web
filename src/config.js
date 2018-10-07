// web app config
let Config = {
  version: '0.2.3-beta',
  debug: false,
  defaultLang: 'EN',
  roundValues: false,
  fiatRates: true,
  // single coin option
  whitelabel: true,
  wlConfig: {
    enableAllCoins: false,
    title: 'DionPay Web Wallet', // app title
    mainLogo: 'native/kmd_header_title_logo.png', // login logo
    coin: {
      ticker: 'DION',
      name: 'DionPay',
      logo: 'cryptologo/kmd.png', // dashboard coin logo
    },
    explorer: 'http://explorer.dionpay.com', // insight or iquidus
    serverList: [ // electrum servers list
      '104.238.176.229:50001:tcp',
        '51.75.124.36:50001:tcp',
    ],
    support: {
      onlineLink: {
        url: 'http://dionpay.com',
        title: 'http://dionpay.com',
      },
      standaloneLink: 'http://dionpay.com',
      chatApp: {
        url: 'https://discordapp.com/channels/412898016371015680/453204571393622027',
        channel: '#agama-wallet',
        name: 'Discord',
        inviteUrl: 'https://komodoplatform.com/discord',
      },
      ticketsLink: {
        url: 'http://support.komodoplatform.com',
        title: 'support.komodoplatform.com',
        urlNewTicket: 'https://support.komodoplatform.com/support/tickets/new',
      },
      gitLink: {
        title: 'github.com/dionpay/agama-web',
        url: 'https://github.com/dionpay/agama-web',
      },
    },
  },
  /*preload: {
    seed: '',
    coins: ['kmd', 'chips'],
  },*/
};

export const devlog = (msg, data) => {
  if (Config.dev ||
      Config.debug) {
    if (data) {
      console.warn(msg, data);
    } else {
      console.warn(msg);
    }
  }
};

Config.log = devlog;

export default Config;