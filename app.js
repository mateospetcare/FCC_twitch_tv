$.ajax({
 type: 'GET',
 url: 'https://api.twitch.tv/kraken/channels/twitch',
 headers: {
   'Client-ID': 'ebkfce8fdfwocvzex0nupww39dueie'
 },
 success: function(data) {
   console.log(data);
 }
});