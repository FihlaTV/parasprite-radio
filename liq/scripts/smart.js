#!/usr/bin/env node
'use strict'

var url = require('url')
var utils = require('./utils')

var arg = process.argv[2].trim()
var parsedUrl = url.parse(arg, true)

var handler = null

switch (parsedUrl.protocol) {
	case "spotify:":
		handler = require('./protocols/spotify')
		break

	default:
		switch (parsedUrl.hostname) {
			case "soundcloud.com":
				handler = require('./protocols/soundcloud')
				break

			case "www.youtube.com":
			case "youtube.com":
			case "youtu.be":
				handler = require('./protocols/youtube')
				break

			case "eqbeats.org":
				handler = require('./protocols/eqbeats')
				break

			case "pony.fm":
				handler = require('./protocols/ponyfm')
				break

			case "bronytunes.com":
				handler = require('./protocols/bronytunes')
				break

			case "open.spotify.com":
			case "play.spotify.com":
				handler = require('./protocols/spotify')
				break
		}
		break
}

if (!handler) {
	console.error("No handler found, passing through...")
	console.log(arg)
} else {
	console.error("Using handler "+handler.title)
	handler(arg, parsedUrl, handlerCallback)
}

function handlerCallback(o) {
	utils.formatter(o)
}
