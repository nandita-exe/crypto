// var settings={
//   "async":true,
//   "scrossDomain":true,
//   "url":"https://api.coingecko.com/api/v3/simple/price?ids=lucky-block%2Coec-binance-coin%2CDecentraland%2Cbitcoin%2CEthereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true",
//   "method":"GET",
//   "headers":{}
// }
// $.ajax(settings).done(function(response){
//   console.log(response)
// });

var baseUrl = "https://api.coinranking.com/v2/coins?orderBy=price";
// var proxyUrl = "https://cors-anywhere.herokuapp.com/";
// var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var proxyUrl = "https://proxy.cors.sh/"
var apiKey = "coinrankingc349bdb857aadf1cce8c260c374645db13793211217d145c";

var apiUrl = `${proxyUrl}${baseUrl}`;
console.log(apiUrl);

// fetch(`${proxyUrl}${baseUrl}`, { 
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-My-Custom-Header': `${apiKey}`,
//       'Access-Control-Allow-Origin': "*"
//     }
// })
//   .then((response) => {
//     if (response.ok) {
//       response.json().then((json) => {
//         console.log(json.data);
//         let coinsData = json.data.coins;

//         if (coinsData.length > 0) {
//           var cryptoCoin = "";
//         }
//         //For Loop Starts
//         coinsData.forEach((coin) => {
//           cryptoCoin += "<tr>";
//           cryptoCoin += `<td> ${coin.uuid} </td>`;
//           cryptoCoin += `<td> ${coin.btcPrice} </td>`;
//           cryptoCoin += `<td> ${coin.rank}</td>`;
//           cryptoCoin += `<td> ${coin.tier} </td>`;
//           cryptoCoin += `<td> ${coin.name}</td>`;
//           cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
//           cryptoCoin += `<td> ${coin.symbol}</td>`;"<tr>";
//         });
//         //For Loop Ends
//         document.getElementById("data").innerHTML = cryptoCoin;
//       });
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// $.ajax({
//             headers: { "Accept": "application/json"},
//             type: 'GET',
//             url: `${apiUrl}`,
//             'X-My-Custom-Header': `${apiKey}`,
//             crossDomain: true,
//             beforeSend: function(xhr){
//                 xhr.withCredentials = true;
//           },
//             success: function(data, textStatus, request){
//                 console.log(data);
//                         .then((response) => {
//     if (response.ok) {
//       response.json().then((json) => {
//         console.log(json.data);
//         let coinsData = json.data.coins;

//         if (coinsData.length > 0) {
//           var cryptoCoin = "";
//         }
//         //For Loop Starts
//         coinsData.forEach((coin) => {
//           cryptoCoin += "<tr>";
//         //   cryptoCoin += `<td> ${coin.uuid} </td>`;
//         //   cryptoCoin += `<td> ${coin.btcPrice} </td>`;
//           cryptoCoin += `<td> ${coin.rank}</td>`;
//           cryptoCoin += `<td> ${coin.tier} </td>`;
//           cryptoCoin += `<td> ${coin.name}</td>`;
//           cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
//           cryptoCoin += `<td> ${coin.symbol}</td>`;"<tr>";
//         });
//         //For Loop Ends
//         document.getElementById("data").innerHTML = cryptoCoin;
//       });
//     }
//   })
//             }
//  }) 
// //   .catch((error) => {
// //     console.log(error);
// //   });

fetch(`${proxyUrl}${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*",
      "Accept": "application/json",
//     "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
    }
})
  .then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log(json.data);
        let coinsData = json.data.coins;

        if (coinsData.length > 0) {
          var cryptoCoin = "";
        }
        //For Loop Starts
        coinsData.forEach((coin) => {
          cryptoCoin += "<tr>";
        //   cryptoCoin += `<td> ${coin.uuid} </td>`;
        //   cryptoCoin += `<td> ${coin.btcPrice} </td>`;
          cryptoCoin += `<td> ${coin.rank}</td>`;
          cryptoCoin += `<td> ${coin.tier} </td>`;
          cryptoCoin += `<td> ${coin.name}</td>`;
          cryptoCoin += `<td> $${Math.round(coin.price)} Billion</td>`;
          cryptoCoin += `<td> ${coin.symbol}</td>`;"<tr>";
        });
        //For Loop Ends
        document.getElementById("data").innerHTML = cryptoCoin;
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

