$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/twitch',
 headers: {
   'Client-ID': clientId
 },
 success: function(data) {
   console.log('######', data);
 }
});