//META{"name":"MessageLogger","website":"https://github.com/MessageLoggerBD/MessageLogger","source":"https://raw.githubusercontent.com/MessageLoggerBD/MessageLogger/master/MessageLogger.plugin.js"}*//

class MessageLogger {
	getName () {return "MessageLogger";}

	getVersion () {return "1.0.9";}

	getAuthor () {return "Unknown";}

	getDescription () {return "Allows you to log messages of servers and DMs while your discord client is running.";}

	getRawUrl () {return "https://raw.githubusercontent.com/MessageLoggerBD/MessageLogger/master/MessageLogger.plugin.js";}

	constructor () {
		this.changelog = {
			"fixed":[["Light Theme Update","Fixed bugs for the Light Theme Update, which broke 99% of my plugins"]]
		};

		this.patchModules = {
			"HeaderBar":["componentDidMount","componentDidUpdate"],
			"HeaderBarContainer":["componentDidMount","componentDidUpdate"]
		};
	}

	initConstructor () {
		this.loggerButtonMarkup =
			`<div class="${BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable} logger-button">
				<svg class="${BDFDB.disCN.channelheadericon}" name="Logs" width="24" height="24" viewBox="-60 -40 620 620">
					<path fill="currentColor" d="M496.093,189.613c-18.643-15.674-47.168-13.807-63.354,5.493l-9.727,11.508l68.945,57.849l9.288-11.466 C517.22,233.997,515.199,205.621,496.093,189.613z"/>
					<path fill="currentColor" d="M301.375,350.534l-5.131,6.072c-4.453,5.332-7.661,11.704-9.272,18.457l-13.945,58.359 c-1.318,5.522,0.601,11.323,4.951,14.971c4.234,3.558,10.206,4.591,15.601,2.285l55.063-23.877 c6.372-2.769,12.085-7.031,16.538-12.319l5.149-6.092L301.375,350.534z"/>
					<polygon fill="currentColor" points="403.656,229.517 320.733,327.631 389.683,385.487 472.601,287.366"/>
					<path fill="currentColor" d="M376.02,66.504l-56.982-54.141c-5.387-5.107-12.014-8.115-18.999-10.069V90h89.052 C387.23,81.09,382.69,72.836,376.02,66.504z"/>
					<path fill="currentColor" d="M257.792,368.091c2.681-11.221,8.027-21.841,15.439-30.718l116.807-138.214V120h-105c-8.291,0-15-6.709-15-15V0h-225 c-24.814,0-45,20.186-45,45v422c0,24.814,20.186,45,45,45h300c24.814,0,45-20.186,45-45v-35.459l-1.948,2.305 c-7.368,8.775-16.875,15.85-27.466,20.465l-55.107,23.892c-15.532,6.707-33.511,4.331-46.816-6.812 c-13.14-11.03-18.838-28.242-14.854-44.941L257.792,368.091z M75.038,90h150c8.291,0,15,6.709,15,15s-6.709,15-15,15h-150 c-8.291,0-15-6.709-15-15S66.747,90,75.038,90z M75.038,181h240c8.291,0,15,6.709,15,15s-6.709,15-15,15h-240 c-8.291,0-15-6.709-15-15S66.747,181,75.038,181z M195.038,391h-120c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15h120 c8.291,0,15,6.709,15,15C210.038,384.291,203.329,391,195.038,391z M75.038,301c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15 h180c8.291,0,15,6.709,15,15c0,8.291-6.709,15-15,15H75.038z"/>
				</svg>
			</div>`;

		this.timeLogModalMarkup =
			`<span class="${this.name}-modal ${this.name}-Log-modal BDFDB-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div class="${BDFDB.disCNS.modalsub + BDFDB.disCN.modalsizelarge}">
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.modalheader}" style="flex: 0 0 auto;">
								<div class="${BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
									<h4 class="${BDFDB.disCNS.h4 + BDFDB.disCNS.defaultcolor + BDFDB.disCN.h4defaultmargin}">Logger</h4> 
								</div>
								<button type="button" class="${BDFDB.disCNS.modalclose + BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookblank + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">
										<svg name="Close" width="18" height="18" viewBox="0 0 12 12" style="flex: 0 1 auto;">
											<g fill="none" fill-rule="evenodd">
												<path d="M0 0h12v12H0"></path>
												<path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
											</g>
										</svg>
									</div>
								</button>
							</div>
							<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.modalcontent + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
								<div class="${BDFDB.disCNS.scroller + BDFDB.disCN.modalsubinner} entries">
								</div>
							</div>
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.horizontalreverse + BDFDB.disCNS.horizontalreverse2 + BDFDB.disCNS.directionrowreverse + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.modalfooter}">
								<button type="button" class="btn-ok ${BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">Ok</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</span>`;

		this.contentModalMarkup =
			`<span class="${this.name}-modal ${this.name}-Content-modal BDFDB-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div class="${BDFDB.disCNS.modalsub + BDFDB.disCNS.modalmini + BDFDB.disCN.modalminisize}">
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.modalheader}" style="flex: 0 0 auto;">
								<h4 class="${BDFDB.disCNS.h4 + BDFDB.disCNS.defaultcolor + BDFDB.disCN.h4defaultmargin}">Message Content</h4>
								<button type="button" class="${BDFDB.disCNS.modalclose + BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookblank + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">
										<svg name="Close" width="18" height="18" viewBox="0 0 12 12" style="flex: 0 1 auto;">
											<g fill="none" fill-rule="evenodd">
												<path d="M0 0h12v12H0"></path>
												<path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
											</g>
										</svg>
									</div>
								</button>
							</div>
							<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.modalcontent + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
								<div class="${BDFDB.disCNS.scroller + BDFDB.disCNS.modalsubinner + BDFDB.disCN.modalminicontent}">
									<div class="${BDFDB.disCNS.modalminitext + BDFDB.disCNS.medium + BDFDB.disCNS.primary + BDFDB.disCN.selectable} message-content"></div>
								</div> 
							</div>
						</div>
					</div>
				</div>
			</span>`;

		this.imageModalMarkup =
			`<span class="${this.name}-modal BDFDB-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div>
							<div class="${BDFDB.disCN.imagewrapper}">
								<img alt="">
							</div>
						</div>
					</div>
				</div>
			</span>`;
 
		this.logEntryMarkup =
			`<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCNS.margintop4 + BDFDB.disCN.marginbottom4} entry" style="flex: 1 1 auto;">
				<div class="log-status"></div>
				<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCNS.flexchild + BDFDB.disCNS.overflowellipsis} log-time" style="flex: 0 0 auto;"></h3>
				<div class="log-guild"></div>
				<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCNS.flexchild + BDFDB.disCNS.overflowellipsis} log-content" style="flex: 1 1 auto;"></h3>
			</div>`;

		this.dividerMarkup = `<div class="${BDFDB.disCN.modaldivider}"></div>`;

		this.css = `
			.${this.name}-Log-modal .log-time {
				width: 160px;
			}  
			.${this.name}-Log-modal .log-guild { 
				width: 35px;
				height: 35px;
				background-size: cover;
				background-position: center;
				border-radius: 50%;
			}
			.${this.name}-Log-modal .log-content {
				max-width: 600px;
				cursor: pointer;
			}
			.${this.name}-Log-modal .log-status {
				width: 10px;
				height: 10px;
				border-radius: 50%;
			}
			.${this.name}-Log-modal .log-status.notdeleted {
				background: #43b581;
			}
			.${this.name}-Log-modal .log-status.deleted {
				background: #f04747;
			}
			.${this.name}-Content-modal .message-content {
				word-wrap: break-word;
				white-space: pre-wrap;
			}
			.${this.name}-settings .guild-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}
			.${this.name}-settings .guild-avatar {
				background-color: #7D7672;
				background-size: cover;
				background-position: center;
				border-width: 5px;
				border-style: solid;
				border-radius: 50%;
				box-sizing: border-box;
				color: #fff;
				cursor: pointer;
				display: block;
				width: 50px;
				height: 50px;
				margin: 5px;
				overflow: hidden;
				line-height: 40px;
				text-align: center;
				font-weight: 400;
			}
			.${this.name}-settings .guild-avatar.enabled {
				border-color: #43B581;
			} 
			.${this.name}-settings .guild-avatar.disabled {
				border-color: #36393F;
				filter: grayscale(100%) brightness(50%);
			}`;
	}

	getSettingsPanel () {
		var enabled = BDFDB.DataUtils.load(this, "enabled");
		var settingshtml = `<div class="${this.name}-settings BDFDB-settings"><div class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.size18 + BDFDB.disCNS.height24 + BDFDB.disCNS.weightnormal + BDFDB.disCN.marginbottom8}">${this.name}</div><div class="BDFDB-settings-inner">`;
		settingshtml += `<div class="guild-list ${BDFDB.disCN.marginbottom8}">`;
		settingshtml += `<div class="guild-avatar ${enabled["@me"] ? "enabled" : "disabled"}" guild-id="@me">DMs</div>`;
		let guilds = BDFDB.LibraryModules.GuildStore.getGuilds();
		for (let id in guilds) {
			settingshtml += `<div class="guild-avatar ${enabled[id] ? "enabled" : "disabled"}" guild-id="${id}" style="background-image: ${guilds[id].icon ? "url('https://cdn.discordapp.com/icons/" + id + "/" + guilds[id].icon + ".png')" : ""}">${guilds[id].icon ? "" : guilds[id].acronym}</div>`;
		}
		settingshtml += `</div>`;
		settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.horizontal + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20}" style="flex: 0 0 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">Batch set Guilds:</h3><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttoncolorprimary + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} disable-all" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Disable</div></button><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorgreen + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} enable-all" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Enable</div></button></div>`;
		settingshtml += `</div></div>`;

		let settingspanel = BDFDB.htmlToElement(settingshtml);

		BDFDB.ListenerUtils.add(this, settingspanel, "mouseenter", ".guild-avatar", e => {
			let id = e.currentTarget.getAttribute("guild-id");
			BDFDB.TooltipUtils.create(e.currentTarget, id == "@me" ? "Direct Messages" : BDFDB.LibraryModules.GuildStore.getGuild(id).name, {type:"top"});
		});
		BDFDB.ListenerUtils.add(this, settingspanel, "click", ".guild-avatar", e => {
			let disableoff = !BDFDB.containsClass(e.currentTarget, "disabled");
			let id = e.currentTarget.getAttribute("guild-id");
			BDFDB.toggleClass(e.currentTarget, "enabled", !disableoff);
			BDFDB.toggleClass(e.currentTarget, "disabled", disableoff);
			BDFDB.DataUtils.save(!disableoff, this, "enabled", id);
		});
		BDFDB.ListenerUtils.add(this, settingspanel, "click", ".disable-all", e => {
			let data = BDFDB.DataUtils.load(this, "enabled");
			settingspanel.querySelectorAll(".guild-avatar").forEach(icon => {
				data[icon.getAttribute("guild-id")] = false;
				BDFDB.removeClass(icon, "enabled");
				BDFDB.addClass(icon, "disabled");
			});
			BDFDB.DataUtils.save(data, this, "enabled");
		});
		BDFDB.ListenerUtils.add(this, settingspanel, "click", ".enable-all", e => {
			let data = BDFDB.DataUtils.load(this, "enabled");
			settingspanel.querySelectorAll(".guild-avatar").forEach(icon => {
				data[icon.getAttribute("guild-id")] = true;
				BDFDB.addClass(icon, "enabled");
				BDFDB.removeClass(icon, "disabled");
			});
			BDFDB.DataUtils.save(data, this, "enabled");
		});
		return settingspanel;
	}

	//legacy

	load () {}

	start () {
		if (!global.BDFDB) global.BDFDB = {myPlugins:{}};
		if (global.BDFDB && global.BDFDB.myPlugins && typeof global.BDFDB.myPlugins == "object") global.BDFDB.myPlugins[this.getName()] = this;
		var libraryScript = document.querySelector('head script#BDFDBLibraryScript');
		if (!libraryScript || (performance.now() - libraryScript.getAttribute("date")) > 600000) {
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("id", "BDFDBLibraryScript");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.min.js");
			libraryScript.setAttribute("date", performance.now());
			libraryScript.addEventListener("load", () => {this.initialize();});
			document.head.appendChild(libraryScript);
		}
		else if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) this.initialize();
		this.startTimeout = setTimeout(() => {this.initialize();}, 30000);
	}

	initialize () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			if (this.started) return;
			BDFDB.PluginUtils.init(this);

			this.fs = BDFDB.LibraryRequires.fs;
			this.path = BDFDB.LibraryRequires.path;
			this.process = BDFDB.LibraryRequires.process;
			this.request = BDFDB.LibraryRequires.request;
			this.logsfolder = this.path.join(BDFDB.BdUtils.getPluginsFolder(), "Logs");
			this.loggerqueues = {};

			var logged = [];
			BDFDB.ModuleUtils.patch(this, BDFDB.LibraryModules.MessageUtils, "receiveMessage", {after: e => {
				let message = Object.assign({},e.methodArguments[1]);
				message.guild_id = message.guild_id ? message.guild_id : "@me";
				if ((message.nonce || message.attachments.length > 0) && !logged.includes(message.id) && BDFDB.DataUtils.load(this, "enabled"), message.guild_id) {
					logged.push(message.id);
					this.addLog(message);
				}
			}});

			BDFDB.ModuleUtils.forceAllUpdates(this);
		}
		else console.error(`%c[${this.getName()}]%c`, 'color: #3a71c1; font-weight: 700;', '', 'Fatal Error: Could not load BD functions!');
	}

	stop () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			this.stopping = true;

			BDFDB.removeEles(".logger-button");
			BDFDB.PluginUtils.clear(this);
		}
	}


	// begin of own functions

	processHeaderBarContainer (instance, wrapper, returnvalue) {
		this.processHeaderBar(instance, wrapper);
	}

	processHeaderBar (instance, wrapper, returnvalue) {
		if (wrapper.querySelector(".logger-button")) return;
		let search = wrapper.querySelector(BDFDB.dotCN.channelheadersearch);
		if (!search) return;
		let loggerbutton = BDFDB.htmlToElement(this.loggerButtonMarkup);
		search.parentElement.insertBefore(loggerbutton, search);
		let icon = loggerbutton.querySelector(BDFDB.dotCN.channelheadericon);
		icon.addEventListener("click", () => {
			this.showLogs();
		});
		icon.addEventListener("mouseenter", () => {
			BDFDB.TooltipUtils.create(icon, "Logger", {type:"bottom",selector:"messagelogger-button-tooltip"});
		});
	}

	addLog (message) {
		let filepath = this.path.join(this.logsfolder, message.guild_id, message.channel_id + ".txt");
		if (!this.fs.existsSync(filepath)) {
			let folder = this.logsfolder;
			if (!this.fs.existsSync(folder)) this.fs.mkdirSync(folder);
			folder = this.path.join(folder, message.guild_id);
			if (!this.fs.existsSync(folder)) this.fs.mkdirSync(folder);
			folder = this.path.join(folder, message.channel_id + ".txt");
			if (!this.fs.existsSync(folder)) this.fs.writeFileSync(folder, "");
		}
		this.writeLog(filepath, message);
	}

	downloadImage (message, url) {
		let filepath = this.path.join(this.logsfolder, message.guild_id, message.channel_id + "_images");
		if (!this.fs.existsSync(filepath)) {
			let folder = this.logsfolder;
			if (!this.fs.existsSync(folder)) this.fs.mkdirSync(folder);
			folder = this.path.join(folder, message.guild_id);
			if (!this.fs.existsSync(folder)) this.fs.mkdirSync(folder);
			folder = this.path.join(folder, message.channel_id + "_images");
			if (!this.fs.existsSync(folder)) this.fs.mkdirSync(folder);
		}
		let filename = url.split("/");
		filename = filename[filename.length-2] + "_" + filename[filename.length-1].split("?width=")[0];
		this.request.get({url: url, encoding: 'binary'}, (err, response, body) => {
			this.fs.writeFile(this.path.join(filepath, filename), body, "binary", (error) => {
				if (error) console.error("The image could not be archived: " + error);
			});
		});
	}

	writeLog (filepath, message) {
		if (!this.loggerqueues[message.channel_id]) this.loggerqueues[message.channel_id] = {queue:[], running:false};
		var runQueue = () => {
			if (!this.loggerqueues[message.channel_id].running) {
				let logmessage = this.loggerqueues[message.channel_id].queue.shift();
				if (logmessage) {
					this.loggerqueues[message.channel_id].running = true;
					this.fs.readFile(filepath, (error, response, result) => {
						if (error) {
							console.error("The logfile could not be loaded: " + error);
							this.loggerqueues[message.channel_id].running = false;
							runQueue();
						}
						else {
							let oldlog = response.toString();
							let attachstring = "";
							for (let file of logmessage.attachments) {
								if (file.width && file.height) {
									attachstring += file.url + "?width=" + file.width + "&height=" + file.height + " ";
									this.downloadImage(logmessage, file.url);
								}
							}
							if (logmessage.content || attachstring) {
								this.fs.writeFile(filepath, (oldlog.length > 0 ? oldlog + "\n" : "") + (new Date(logmessage.timestamp)).toLocaleString() + " @ " + logmessage.author.username.replace(/\s/g, "") + ": " + logmessage.content.replace(/\n/g, "\\n") + " (author:" + logmessage.author.id + " message:" + logmessage.id + ") (filesML:" + attachstring.slice(0,-1) + ")", (error) => {
									if (error) console.error("The logfile could not be created: " + error);
									this.loggerqueues[message.channel_id].running = false;
									runQueue();
								});
							}
						}
					});
				}
			}
		}
		this.loggerqueues[message.channel_id].queue.push(message);
		runQueue();
	}

	showLogs () {
		let server = BDFDB.LibraryModules.LastGuildStore.getGuildId() || "@me";
		let channel = BDFDB.LibraryModules.LastChannelStore.getChannelId();
		if (!channel) return;

		let logs = [];
		let filepath = this.path.join(this.logsfolder, server, channel + ".txt");
		if (this.fs.existsSync(filepath)) logs = this.fs.readFileSync(filepath).toString().split("\n");

		let timeLogModal = BDFDB.htmlToElement(this.timeLogModalMarkup);

		let container = timeLogModal.querySelector(".entries");
		if (!container) return;
		for (let log of logs.reverse().slice(0,100)) {
			let ids = / \(author:([0-9]*?) message:([0-9]*?)\)/.exec(log);
			if (ids) {
				let authorid = ids[1];
				let messageid = ids[2];
				let files = / \(filesML:(.*?)\)/.exec(log) || ["",""];
				let user = BDFDB.LibraryModules.UserStore.getUser(authorid);
				let message = BDFDB.LibraryModules.MessageStore.getMessage(channel, messageid);
				if (user) {
					if (container.childElementCount) container.appendChild(BDFDB.htmlToElement(`<div class="${BDFDB.disCN.modaldivider}"></div>`));
					let entry = BDFDB.htmlToElement(this.logEntryMarkup);
					let member = BDFDB.LibraryModules.MemberStore.getMember(authorid);
					let messagestring = message ? message.content : log.replace(ids[0], "").replace(files[0], "").split(": ")[1];
					let filestring = "";
					for (let file of files[1].split(" ")) if (file) filestring += `<a title="${file}" class="${BDFDB.disCN.anchor}" href="${file.split("?width=")[0]}" rel="noreferrer noopener" target="_blank" role="button">${file.split("?width=")[0]}</a> `;

					let status = entry.querySelector(".log-status");
					BDFDB.addClass(status, message ? "notdeleted" : "deleted");
					status.addEventListener("mouseenter", () => {BDFDB.TooltipUtils.create(status, message ? "Not Deleted" : "Deleted", {type:"top"});});
					entry.querySelector(".log-time").innerText = message ? message.timestamp._i.toLocaleString() : log.split(" @ ")[0];
					entry.querySelector(".log-guild").style.setProperty("background-image", `url(${BDFDB.UserUtils.getAvatar(user.id)})`);

					let content = entry.querySelector(".log-content");
					content.innerText = (member && member.nickname ? member.nickname : user.username) + ": " + (messagestring.replace(/\n/g, " ") + (files[1] ? (" Images: " + files[1]) : "")).trim();
					content.addEventListener("click", () => {
						let contentModal = BDFDB.htmlToElement(this.contentModalMarkup);
						let messagecontent = contentModal.querySelector(".message-content");
						messagecontent.innerHTML = (BDFDB.encodeToHTML(messagestring) + " " + (filestring ? ((messagestring ? "\n" : "") + "Sent Images: " + filestring) : "")).trim();
						BDFDB.ListenerUtils.addToChildren(messagecontent, "click", BDFDB.dotCN.anchor, e => {
							BDFDB.ListenerUtils.stopEvent(e);
							let imageModal = BDFDB.htmlToElement(this.imageModalMarkup);
							let link = e.currentTarget;
							let filename = link.href.split("/");
							filename = filename[filename.length-2] + "_" + filename[filename.length-1];
							let filepath = this.path.join(this.logsfolder, server, channel + "_images", filename);
							this.fs.readFile(filepath, (error, result) => {
								if (error) {
									console.error("The image could not be loaded (no longer archived): " + error);
									alert("The image " + filepath + " no longer exists.");
								}
								else {
									let width = link.title.split("?width=");
									let height = width[1].split("&height=")[1];
									width = width[1].split("&height=")[0];
									let resizeX = (document.firstElementChild.clientWidth/width) * 0.71;
									let resizeY = (document.firstElementChild.clientHeight/height) * 0.57;
									width = width * (resizeX < resizeY ? resizeX : resizeY);
									height = height * (resizeX < resizeY ? resizeX : resizeY);
									var imagewrapper = imageModal.querySelector(BDFDB.dotCN.imagewrapper);
									var img = imagewrapper.querySelector("img");
									imagewrapper.style.setProperty("width", width + "px");
									imagewrapper.style.setProperty("height", height + "px");
									imagewrapper.style.setProperty("pointer-events", "none", "important");
									img.style.setProperty("width", width + "px");
									img.style.setProperty("height", height + "px");
									img.setAttribute("width", width + "px");
									img.setAttribute("height", height + "px");
									img.setAttribute("src", "data:image/jpg;base64," + result.toString("base64"));
									BDFDB.appendModal(imageModal);
								}
							});
						});
						BDFDB.appendModal(contentModal);
					});
					container.appendChild(entry);
				}
			}
		}

		BDFDB.appendModal(timeLogModal);
	}
}