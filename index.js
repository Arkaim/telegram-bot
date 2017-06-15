var TelegramBot = require('node-telegram-bot-api');

var token = '386578082:AAHEW9t9L5JZV2SJsIrNwaXh0cyRP7mKCs4';

var bot = new TelegramBot(token, {polling: true});

var notes =[];

bot.onText(/\/echo (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	var resp = match[1];
	bot.sendMessage(fromId, resp);
});

bot.onText ( /\/photo/, function (msg, match) {
	var fromId = msg.from.id;
	var photo = 'Screen Shot 2017-06-15 at 11.31.26 AM.png';
	bot.sendPhoto(fromId, photo);
});

bot.onText (/\/напомни (.+) в (.+)/, function (msg, match) {
	var fromId = msg.from.id;
	var text = match[1];
	var time = match[2];

	notes.push ({ 'uid' : fromId, 'text': text, 'time': time});

	bot.sendMessage(fromId, 'Хорошо, мой господин');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] == curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                notes.splice(i,1);
            }
        }
},1000);