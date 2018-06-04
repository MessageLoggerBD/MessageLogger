//META{"name":"MessageLogger"}*//

class MessageLogger {
	initConstructor () {
		this.loggerButton =
			`<svg class="${BDFDB.disCNS.channelheadericoninactive + BDFDB.disCNS.channelheadericon + BDFDB.disCN.channelheadericonmargin} loggerButton" name="Note" width="16" height="16" viewBox="-150 -55 680 680">
				<g fill="none" class="${BDFDB.disCN.channelheadericonforeground}" fill-rule="evenodd">
					<path d="M496.093,189.613c-18.643-15.674-47.168-13.807-63.354,5.493l-9.727,11.508l68.945,57.849l9.288-11.466 C517.22,233.997,515.199,205.621,496.093,189.613z" fill="currentColor"/>
					<path d="M301.375,350.534l-5.131,6.072c-4.453,5.332-7.661,11.704-9.272,18.457l-13.945,58.359 c-1.318,5.522,0.601,11.323,4.951,14.971c4.234,3.558,10.206,4.591,15.601,2.285l55.063-23.877 c6.372-2.769,12.085-7.031,16.538-12.319l5.149-6.092L301.375,350.534z" fill="currentColor"/>
					<polygon points="403.656,229.517 320.733,327.631 389.683,385.487 472.601,287.366" fill="currentColor"/>
					<path d="M376.02,66.504l-56.982-54.141c-5.387-5.107-12.014-8.115-18.999-10.069V90h89.052 C387.23,81.09,382.69,72.836,376.02,66.504z" fill="currentColor"/>
					<path d="M257.792,368.091c2.681-11.221,8.027-21.841,15.439-30.718l116.807-138.214V120h-105c-8.291,0-15-6.709-15-15V0h-225 c-24.814,0-45,20.186-45,45v422c0,24.814,20.186,45,45,45h300c24.814,0,45-20.186,45-45v-35.459l-1.948,2.305 c-7.368,8.775-16.875,15.85-27.466,20.465l-55.107,23.892c-15.532,6.707-33.511,4.331-46.816-6.812 c-13.14-11.03-18.838-28.242-14.854-44.941L257.792,368.091z M75.038,90h150c8.291,0,15,6.709,15,15s-6.709,15-15,15h-150 c-8.291,0-15-6.709-15-15S66.747,90,75.038,90z M75.038,181h240c8.291,0,15,6.709,15,15s-6.709,15-15,15h-240 c-8.291,0-15-6.709-15-15S66.747,181,75.038,181z M195.038,391h-120c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15h120 c8.291,0,15,6.709,15,15C210.038,384.291,203.329,391,195.038,391z M75.038,301c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15 h180c8.291,0,15,6.709,15,15c0,8.291-6.709,15-15,15H75.038z" fill="currentColor"/>
				</g>
			</svg>`;
		
		this.timeLogModalMarkup =
			`<span class="MessageLogger-modal MessageLogger-Log-modal DevilBro-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div class="${BDFDB.disCNS.modalsub + BDFDB.disCN.modalsizelarge}">
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.modalheader}" style="flex: 0 0 auto;">
								<div class="${BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
									<h4 class="${BDFDB.disCNS.h4 + BDFDB.disCNS.headertitle + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.weightsemibold + BDFDB.disCNS.defaultcolor + BDFDB.disCNS.h4defaultmargin + BDFDB.disCN.marginreset}">Logger</h4> 
								</div>
								<svg class="${BDFDB.disCNS.modalclose + BDFDB.disCN.flexchild}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12">
									<g fill="none" fill-rule="evenodd">
										<path d="M0 0h12v12H0"></path>
										<path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
									</g>
								</svg>
							</div>
							<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.modalcontent + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
								<div class="${BDFDB.disCNS.scroller + BDFDB.disCN.modalsubinner} entries">
								</div>
							</div>
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontalreverse + BDFDB.disCNS.horizontalreverse2 + BDFDB.disCNS.directionrowreverse + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.modalfooter}">
								<button type="button" class="btn-ok ${BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">Ok</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</span>`; 
			
		this.contentModalMarkup =
			`<span class="MessageLogger-modal MessageLogger-Content-modal DevilBro-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div class="${BDFDB.disCNS.modalsub + BDFDB.disCN.modalsizemedium}">
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.modalheader}" style="flex: 0 0 auto;">
								<div class="${BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
									<h4 class="${BDFDB.disCNS.h4 + BDFDB.disCNS.headertitle + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.weightsemibold + BDFDB.disCNS.defaultcolor + BDFDB.disCNS.h4defaultmargin + BDFDB.disCN.marginreset}">Message Content</h4> 
								</div>
								<svg class="${BDFDB.disCNS.modalclose + BDFDB.disCN.flexchild}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12">
									<g fill="none" fill-rule="evenodd">
										<path d="M0 0h12v12H0"></path>
										<path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
									</g> 
								</svg>
							</div>
							<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.modalcontent + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
								<div class="${BDFDB.disCNS.scroller + BDFDB.disCNS.modalsubinner + BDFDB.disCN.modalsubcontent}">
									<div class="${BDFDB.disCNS.medium + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.primary + BDFDB.disCN.selectable}  message-content" style="padding-bottom: 20px;">Everything related to plugins and their bugs.</div>
								</div> 
							</div>
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontalreverse + BDFDB.disCNS.horizontalreverse2 + BDFDB.disCNS.directionrowreverse + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.modalfooter}">
								<button type="button" class="btn-ok ${BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">Ok</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</span>`;
 
		this.logEntryMarkup =
			`<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCNS.margintop4 + BDFDB.disCN.marginbottom4} entry" style="flex: 1 1 auto;">
				<div class="log-status"></div>
				<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCNS.flexchild + BDFDB.disCNS.overflowellipsis} log-time" style="flex: 0 0 auto;"></h3>
				<div class="log-guild"></div>
				<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCNS.flexchild + BDFDB.disCNS.overflowellipsis} log-content" style="flex: 1 1 auto;"></h3>
			</div>`;
			
		this.dividerMarkup = `<div class="${BDFDB.disCNS.modaldivider + BDFDB.disCN.modaldividerdefault}"></div>`;
		
		this.css = `
			.MessageLogger-Log-modal .log-time {
				width: 160px;
			}  
			.MessageLogger-Log-modal .log-guild { 
				width: 35px;
				height: 35px;
				background-size: cover;
				background-position: center;
				border-radius: 50%;
			}
			.MessageLogger-Log-modal .log-content {
				max-width: 600px;
				cursor: pointer;
			}
			.MessageLogger-Log-modal .log-status {
				width: 10px;
				height: 10px;
				border-radius: 50%;
			}
			.MessageLogger-Log-modal .log-status.notdeleted {
				background: #43b581;
			}
			.MessageLogger-Log-modal .log-status.deleted {
				background: #f04747;
			}
			.MessageLogger-Content-modal .message-content {
				word-wrap: break-word;
				white-space: pre-wrap;
			}
			.MessageLogger-settings .guild-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}
			.MessageLogger-settings .guild-avatar {
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
			.MessageLogger-settings .guild-avatar.enabled {
				border-color: #43B581;
			} 
			.MessageLogger-settings .guild-avatar.disabled {
				border-color: #36393F;
				filter: grayscale(100%) brightness(50%);
			}
			.MessageLogger-settings .disable-all {
				color: white;
				background-color: #36393F;
			}
		`;
	}

	getName () {return "MessageLogger";}

	getDescription () {return "Allows you to log messages of servers and DMs while your discord client is running.";}

	getVersion () {return "1.0.1";}

	getAuthor () {return "DevilBro";}

	getRawUrl () {return "https://raw.githubusercontent.com/MessageLoggerBD/MessageLogger/MessageLogger.plugin.js";}
	
	getSettingsPanel () {
		var enabled = BDFDB.loadAllData(this, "enabled");
		var settingshtml = `<div class="MessageLogger-settings DevilBro-settings"><div class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.size18 + BDFDB.disCNS.height24 + BDFDB.disCNS.weightnormal + BDFDB.disCN.marginbottom8}">${this.getName()}</div><div class="DevilBro-settings-inner">`;
		settingshtml += `<div class="guild-list ${BDFDB.disCN.marginbottom8}">`;
		settingshtml += `<div class="guild-avatar ${enabled["@me"] ? "enabled" : "disabled"}" guild-id="@me">DMs</div>`;
		let guilds = this.GuildStore.getGuilds();
		for (let id in guilds) {
			settingshtml += `<div class="guild-avatar ${enabled[id] ? "enabled" : "disabled"}" guild-id="${id}" style="background-image: ${guilds[id].icon ? "url('https://cdn.discordapp.com/icons/" + id + "/" + guilds[id].icon + ".png')" : ""}">${guilds[id].icon ? "" : guilds[id].acronym}</div>`;
		}
		settingshtml += `</div>`;
		settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20}" style="flex: 0 0 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">Batch set Guilds:</h3><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} disable-all" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Disable</div></button><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorgreen + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} enable-all" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Enable</div></button></div>`;
		settingshtml += `</div></div>`;
			
		var settingspanel = $(settingshtml)[0];

		$(settingspanel)
			.on("mouseenter", ".guild-avatar", (e) => {
				let id = e.currentTarget.getAttribute("guild-id");
				BDFDB.createTooltip(id == "@me" ? "Direct Messages" : this.GuildStore.getGuild(id).name, e.currentTarget, {type:"top"});
			})
			.on("click", ".guild-avatar", (e) => {
				let disableoff = !e.currentTarget.classList.contains("disabled");
				let id = e.currentTarget.getAttribute("guild-id");
				e.currentTarget.classList.toggle("enabled", !disableoff);
				e.currentTarget.classList.toggle("disabled", disableoff);
				BDFDB.saveData(id, !disableoff, this, "enabled");
			})
			.on("click", ".disable-all", (e) => {
				let data = BDFDB.loadAllData(this, "enabled");
				settingspanel.querySelectorAll(".guild-avatar").forEach(icon => {
					data[icon.getAttribute("guild-id")] = false;
					icon.classList.remove("enabled");
					icon.classList.add("disabled");
				});
				BDFDB.saveAllData(data, this, "enabled");
			})
			.on("click", ".enable-all", (e) => {
				let data = BDFDB.loadAllData(this, "enabled");
				settingspanel.querySelectorAll(".guild-avatar").forEach(icon => {
					data[icon.getAttribute("guild-id")] = true;
					icon.classList.add("enabled");
					icon.classList.remove("disabled");
				});
				BDFDB.saveAllData(data, this, "enabled");
			});
			
		return settingspanel;
	}

	//legacy
	
	load () {}

	start () {
		var libraryScript = null;
		if (typeof BDFDB !== "object" || typeof BDFDB.isLibraryOutdated !== "function" || BDFDB.isLibraryOutdated()) {
			libraryScript = document.querySelector('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js"]');
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js");
			document.head.appendChild(libraryScript);
		}
		this.startTimeout = setTimeout(() => {this.initialize();}, 30000);
		if (typeof BDFDB === "object" && typeof BDFDB.isLibraryOutdated === "function") this.initialize();
		else libraryScript.addEventListener("load", () => {this.initialize();});
	}

	initialize () {
		if (typeof BDFDB === "object") {
			BDFDB.loadMessage(this);
			
			this.UserStore = BDFDB.WebModules.findByProperties(["getUsers"]);
			this.MemberStore = BDFDB.WebModules.findByProperties(["getMembers"]);
			this.MessageStore = BDFDB.WebModules.findByProperties(["getMessages"]);
			this.GuildStore = BDFDB.WebModules.findByProperties(["getGuilds"]);
			this.LastGuildStore = BDFDB.WebModules.findByProperties(["getLastSelectedGuildId"]);
			this.ChannelStore = BDFDB.WebModules.findByProperties(["getChannels"]);
			this.LastChannelStore = BDFDB.WebModules.findByProperties(["getLastSelectedChannelId"]);
			this.IconUtils = BDFDB.WebModules.findByProperties(["getUserAvatarURL"]);
			this.MessageUtils = BDFDB.WebModules.findByProperties(["receiveMessage"]);
			
			this.fs = require("fs");
			this.path = require("path");
			this.process = require("process");
			this.logsfolder = this.path.join(BDFDB.getPluginsFolder(), "Logs");
			this.loggerqueues = {};
			
			var logged = [];
			this.loggercancel = BDFDB.WebModules.monkeyPatch(this.MessageUtils, "receiveMessage", {after: (e) => {
				let message = Object.assign({},e.methodArguments[1]);
				message.guild_id = message.guild_id ? message.guild_id : "@me";
				if (message.nonce && !logged.includes(message.id) && BDFDB.loadData(message.guild_id, this, "enabled")) {
					logged.push(message.id);
					this.addLog(message);
				}
			}});
			
			setTimeout(() => {this.onSwitch ();},1000);
		}
	}

	stop () {
		if (typeof BDFDB === "object") {
			$(".loggerButton").remove();
			
			if (typeof this.loggercancel == "function") this.loggercancel();
			
			BDFDB.unloadMessage(this);
		}
	}
	
	onSwitch () {
		if (typeof BDFDB === "object") {
			setTimeout(() => {
				$(".loggerButton").remove();
				$(this.loggerButton)
					.insertBefore($(BDFDB.dotCN.channelheadericoninactive).parent().find(BDFDB.dotCN.channelheadersearch))
					.on("click." + this.getName(), (e) => {
						this.showLogs();
					})
					.on("mouseenter." + this.getName(), (e) => {
						BDFDB.createTooltip("Logger", e.currentTarget, {type:"bottom",selector:"messagelogger-button-tooltip"});
					});
			},1);
		}
	}
	
	// begin of own functions
	
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
							var oldlog = response.toString();
							this.fs.writeFile(filepath, (oldlog.length > 0 ? oldlog + "\n" : "") + (new Date(logmessage.timestamp)).toLocaleString() + " @ " + logmessage.author.username.replace(/\s/g, "") + ": " + logmessage.content.replace(/\n/g, "\\n") + " (author:" + logmessage.author.id + " message:" + logmessage.id + ")", (error) => {
								if (error) console.error("The logfile could not be created: " + error);
								this.loggerqueues[message.channel_id].running = false;
								runQueue();
							});
						}
					});
				}
			}
		}
		this.loggerqueues[message.channel_id].queue.push(message);
		runQueue();
	}
	
	showLogs () {
		let server = this.LastGuildStore.getGuildId() || "@me";
		let channel = this.LastChannelStore.getChannelId();
		if (!channel) return;
		
		let logs = [];
		let filepath = this.path.join(this.logsfolder, server, channel + ".txt");
		if (this.fs.existsSync(filepath)) logs = this.fs.readFileSync(filepath).toString().split("\n");
		
		let timeLogModal = $(this.timeLogModalMarkup);
		for (let log of logs.reverse()) {
			let ids = / \(author:([0-9]*?) message:([0-9]*?)\)/.exec(log);
			let authorid = ids[1];
			let messageid = ids[2];
			let user = this.UserStore.getUser(authorid);
			let message = this.MessageStore.getMessage(channel, messageid);
			if (user) {
				let entry = $(this.logEntryMarkup);
				let member = this.MemberStore.getMember(authorid);
				let messagecontent = message ? message.content : log.replace(ids[0], "").split(": ")[1];
				entry.find(".log-status").addClass(message ? "notdeleted" : "deleted").on("mouseenter", (e) => {
					BDFDB.createTooltip(message ? "Not Deleted" : "Deleted", e.currentTarget, {type:"top"});
				});
				entry.find(".log-time").text(message ? message.timestamp._i.toLocaleString() : log.split(" @ ")[0]);
				entry.find(".log-guild").css("background-image", `url(${BDFDB.getUserAvatar(user.id)})`);
				entry.find(".log-content").text((member && member.nickname ? member.nickname : user.username) + ": " + messagecontent).on("click", () => {
					let contentModal = $(this.contentModalMarkup);
					contentModal.find(".message-content").text(messagecontent); 
					BDFDB.appendModal(contentModal);
				});
				timeLogModal.find(".entries").append(entry).append(this.dividerMarkup);
			}
		}
		BDFDB.appendModal(timeLogModal);
	}
}