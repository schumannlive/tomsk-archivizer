# 🌍 Schumannlive Tomsk archivizer 🌍

Little app to keep a clean archive of Tomsk graphs - both whole graphs as well as cut out days, each day

## How to make it work:

1. Open up config.json in your editor of choice and adjust "hour" value so it matches 8am Central European Summer Time in your timezone. (0-23)

2. Run **npm install** in the directory you put your bot in

3. Run the app by typing in **node index.js**

4. There you go, every day at the time set in config (it's important to set it up as described in the 1st step!) it will download the graphs, cut them up and keep copies in separate folders named accordingly by the date. It will also stretch SRF, SRQ and SRA graphs to match the main SHM graph, so users can stack them on top of each other to keep track this way.

*you have to have node installed on your machine*
