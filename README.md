# 🌍 Schumannlive Tomsk archivizer 🌍

Little app to keep a clean archive of Tomsk graphs - both whole graphs as well as cut out days, each day

## How to make it work:

1. Run **npm install** in the directory you put your bot in

2. Run bot.js by typing **node bot.js**

3. There you go, every day at 7:00AM local time bot will download the graph, cut it up and keep both copies in separate folders named accordingly by the date. I highly advise to change the time to equivalent of 5:00AM UTC in your timezone since bot works on your local timezone. To do so, change *.hour = [7];* (7 = 7AM local) values in bot.js.

*you have to have node installed on your machine*
