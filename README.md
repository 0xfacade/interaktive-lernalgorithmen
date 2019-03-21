# Interaktive Lernalgorithmen

Ziel dieses Projekts ist es, verschiedene Lernalgorithmen
interaktiv für den Browser zu entwickeln, sodass diese
von Neueinsteigern genutzt werden können, um an den Stellschrauben
der verschiedenen Algorithmen zu drehen.

Demo: https://0xfacade.github.io/interaktive-lernalgorithmen/

## Entwickeln

Die Implementierung basiert auf `react` und `plotly.js`,
außerdem nutzt die Anwendung ein paar Utility-Klassen von 
`bootstrap` (v.4) fürs Styling (vor allem `d-flex`).

Der Einstieg in die Demoapplikation ist `src/index.jsx`.
Diese wird von `webpack` als Einstieg genutzt, um `bundle.js`
zu generieren, welches den kompletten JS-Code beinhaltet.
`bundle.js` wird in der Datei `index.htm` eingebunden,
welche wiederum vom Browser geladen wird.

Zum Starten der Demoapplikation auf dem lokalen Computer:
* ins Verzeichnis des Repos wechseln
* `npm install`
* `npm start`
* Öffne `http://localhost:8080` (oder ähnlich, wird im Terminal angezeigt)

Die Veränderungen an den Quelldateien werden dank `webpack-dev-server`
sofort neukompiliert und der Browser lädt automatisch neu.

Die Demoapplikation wird auf Github-Pages gehostet (Link siehe oben).
Damit Github-Pages die aktuelle Version zeigt, muss die generierte
Datei `bundle.js` mitcommited werden.