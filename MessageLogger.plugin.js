//META{"name":"MessageLogger","website":"https://github.com/MessageLoggerBD/MessageLogger","source":"https://raw.githubusercontent.com/MessageLoggerBD/MessageLogger/master/MessageLogger.plugin.js"}*//

class MessageLogger {
	getName () {return "MessageLogger";}

	getVersion () {return "1.1.1";}

	getAuthor () {return "Unknown";}

	getDescription () {return "Allows you to log messages of servers and DMs while your discord client is running.";}

	getRawUrl () {return "https://raw.githubusercontent.com/MessageLoggerBD/MessageLogger/master/MessageLogger.plugin.js";}

	constructor () {
		this.changelog = {
			"improved":[["New Library Structure & React","Restructured my Library and switched to React rendering instead of DOM manipulation"]]
		};

		this.patchedModules = {
			after: {
				HeaderBarContainer: "render"
			}
		};
	}

	initConstructor () {
		this.css = `
			.${this.name}-Log-modal .log-status {
				height: 10px;
				width: 10px;
				margin-right: 10px;
				background: ${BDFDB.DiscordConstants.Colors.STATUS_GREEN};
				border-radius: 50%;
			}
			.${this.name}-Log-modal .log-status.deleted {
				background: ${BDFDB.DiscordConstants.Colors.STATUS_RED};
			}
			.${this.name}-Log-modal .log-time {
				width: 160px;
			}  
			.${this.name}-Log-modal .log-user {
				margin: 0 10px;
			}
			.${this.name}-Log-modal .log-content {
				max-width: 600px;
				cursor: pointer;
			}
			.${this.name}-Content-modal .log-content {
				word-wrap: break-word;
			}
			.${this.name}-Content-modal .log-link {
				word-wrap: break-word;
			}
			.${this.name}-settings .settings-guild {
				border-radius: 50%;
				border-width: 3px;
				border-style: solid;
				box-sizing: border-box;
				cursor: pointer;
				margin: 3px;
				overflow: hidden;
			}
			.${this.name}-settings .settings-guild.enabled {
				border-color: #43B581;
			} 
			.${this.name}-settings .settings-guild.disabled {
				border-color: #36393F;
				filter: grayscale(100%) brightness(50%);
			}`;
	}

	getSettingsPanel () {
		if (!global.BDFDB || typeof BDFDB != "object" || !BDFDB.loaded || !this.started) return;
		let settingspanel, settingsitems = [];
		
		settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
			className: BDFDB.disCN.marginbottom20,
			wrap: BDFDB.LibraryComponents.Flex.Wrap.WRAP,
			children: [{name:"Direct Messages", acronym:"DMs", id:"@me", getIconURL: _ => {}}].concat(BDFDB.LibraryModules.FolderStore.getFlattenedGuilds()).map(guild => BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
				text: guild.name,
				children: BDFDB.ReactUtils.createElement("div", {
					className: BDFDB.DOMUtils.formatClassName("settings-guild", this.guilds.includes(guild.id) ? "enabled" : "disabled"),
					children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.GuildComponents.Icon, {
						guild: guild,
						size: BDFDB.LibraryComponents.GuildComponents.Icon.Sizes.MEDIUM
					}),
					onClick: event => {
						let isEnabled = this.guilds.includes(guild.id);
						BDFDB.DOMUtils.toggleClass(event.currentTarget, "enabled", !isEnabled);
						BDFDB.DOMUtils.toggleClass(event.currentTarget, "disabled", isEnabled);
						if (isEnabled) BDFDB.ArrayUtils.remove(this.guilds, guild.id, true);
						else this.guilds.push(guild.id);
						this.saveGuilds(this.guilds);
					}
				})
			}))
		}));
		settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsItem, {
			type: "Button",
			className: BDFDB.disCN.marginbottom8,
			color: BDFDB.LibraryComponents.Button.Colors.PRIMARY,
			label: "Disable for all Servers",
			onClick: _ => {
				this.batchSetGuilds(settingspanel, false);
			},
			children: BDFDB.LanguageUtils.LanguageStrings.DISABLE
		}));
		settingsitems.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SettingsItem, {
			type: "Button",
			className: BDFDB.disCN.marginbottom8,
			color: BDFDB.LibraryComponents.Button.Colors.GREEN,
			label: "Enable for all Servers",
			onClick: _ => {
				this.batchSetGuilds(settingspanel, true);
			},
			children: BDFDB.LanguageUtils.LanguageStrings.ENABLE
		}));
		
		return settingspanel = BDFDB.PluginUtils.createSettingsPanel(this, settingsitems);
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
		this.startTimeout = setTimeout(() => {
			try {return this.initialize();}
			catch (err) {console.error(`%c[${this.getName()}]%c`, "color: #3a71c1; font-weight: 700;", "", "Fatal Error: Could not initiate plugin! " + err);}
		}, 30000);
	}

	initialize () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			if (this.started) return;
			BDFDB.PluginUtils.init(this);

			this.logsfolder = BDFDB.LibraryRequires.path.join(BDFDB.BDUtils.getPluginsFolder(), "Logs");
			this.loggerqueues = {};
			
			let guilds = BDFDB.DataUtils.load(this, "guilds");
			this.saveGuilds(!BDFDB.ArrayUtils.is(guilds) ? [] : guilds);

			let logged = [];
			BDFDB.ModuleUtils.patch(this, BDFDB.LibraryModules.DispatchApiUtils, "dirtyDispatch", {after: e => {
				if (BDFDB.ObjectUtils.is(e.methodArguments[0]) && e.methodArguments[0].type == BDFDB.DiscordConstants.ActionTypes.MESSAGE_CREATE && e.methodArguments[0].message) {
					let message = Object.assign({}, e.methodArguments[0].message);
					message.guild_id = message.guild_id || "@me";
					if ((message.nonce || message.attachments.length > 0) && !logged.includes(message.id) && this.guilds.includes(message.guild_id)) {
						logged.push(message.id);
						this.addLog(message);
					}
				}
			}});

			BDFDB.ModuleUtils.forceAllUpdates(this);
		}
		else console.error(`%c[${this.getName()}]%c`, "color: #3a71c1; font-weight: 700;", "", "Fatal Error: Could not load BD functions!");
	}

	stop () {
		if (global.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
			this.stopping = true;

			BDFDB.PluginUtils.clear(this);
		}
	}


	// begin of own functions

	processHeaderBarContainer (e) {
		let [children, index] = BDFDB.ReactUtils.findChildren(BDFDB.ReactUtils.getValue(e.returnvalue, "props.toolbar"), {name: "FluxContainer(Search)"});
		if (index > -1) children.splice(index, 0, BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
			text: "Logger",
			tooltipConfig: {type: "bottom"},
			children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Clickable, {
				className: BDFDB.disCNS.channelheadericonwrapper + BDFDB.disCN.channelheadericonclickable,
				onClick: _ => {
					this.showLogs();
				},
				children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.SvgIcon, {
					className: BDFDB.disCNS.channelheadericon,
					iconSVG: `<svg name="Logs" width="24" height="24" viewBox="-60 -40 620 620"><path fill="currentColor" d="M496.093,189.613c-18.643-15.674-47.168-13.807-63.354,5.493l-9.727,11.508l68.945,57.849l9.288-11.466 C517.22,233.997,515.199,205.621,496.093,189.613z"/><path fill="currentColor" d="M301.375,350.534l-5.131,6.072c-4.453,5.332-7.661,11.704-9.272,18.457l-13.945,58.359 c-1.318,5.522,0.601,11.323,4.951,14.971c4.234,3.558,10.206,4.591,15.601,2.285l55.063-23.877 c6.372-2.769,12.085-7.031,16.538-12.319l5.149-6.092L301.375,350.534z"/><polygon fill="currentColor" points="403.656,229.517 320.733,327.631 389.683,385.487 472.601,287.366"/><path fill="currentColor" d="M376.02,66.504l-56.982-54.141c-5.387-5.107-12.014-8.115-18.999-10.069V90h89.052 C387.23,81.09,382.69,72.836,376.02,66.504z"/><path fill="currentColor" d="M257.792,368.091c2.681-11.221,8.027-21.841,15.439-30.718l116.807-138.214V120h-105c-8.291,0-15-6.709-15-15V0h-225 c-24.814,0-45,20.186-45,45v422c0,24.814,20.186,45,45,45h300c24.814,0,45-20.186,45-45v-35.459l-1.948,2.305 c-7.368,8.775-16.875,15.85-27.466,20.465l-55.107,23.892c-15.532,6.707-33.511,4.331-46.816-6.812 c-13.14-11.03-18.838-28.242-14.854-44.941L257.792,368.091z M75.038,90h150c8.291,0,15,6.709,15,15s-6.709,15-15,15h-150 c-8.291,0-15-6.709-15-15S66.747,90,75.038,90z M75.038,181h240c8.291,0,15,6.709,15,15s-6.709,15-15,15h-240 c-8.291,0-15-6.709-15-15S66.747,181,75.038,181z M195.038,391h-120c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15h120 c8.291,0,15,6.709,15,15C210.038,384.291,203.329,391,195.038,391z M75.038,301c-8.291,0-15-6.709-15-15c0-8.291,6.709-15,15-15 h180c8.291,0,15,6.709,15,15c0,8.291-6.709,15-15,15H75.038z"/></svg>`
				})
			})
		}));
	}
	
	batchSetGuilds (settingspanel, value) {
		settingspanel.querySelectorAll(".settings-guild").forEach(icon => {
			BDFDB.DOMUtils.toggleClass(icon, "enabled", value);
			BDFDB.DOMUtils.toggleClass(icon, "disabled", !value);
		});
		if (value) {
			for (let id of BDFDB.LibraryModules.FolderStore.getFlattenedGuildIds()) this.guilds.push(id);
			this.saveGuilds(BDFDB.ArrayUtils.removeCopies(this.guilds));
		}
		else this.saveGuilds([]);
	}
	
	saveGuilds (guilds) {
		this.guilds = guilds;
		BDFDB.DataUtils.save(guilds, this, "guilds");
	}

	addLog (message) {
		let filepath = BDFDB.LibraryRequires.path.join(this.logsfolder, message.guild_id, message.channel_id + ".txt");
		if (!BDFDB.LibraryRequires.fs.existsSync(filepath)) {
			let folder = this.logsfolder;
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.mkdirSync(folder);
			folder = BDFDB.LibraryRequires.path.join(folder, message.guild_id);
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.mkdirSync(folder);
			folder = BDFDB.LibraryRequires.path.join(folder, message.channel_id + ".txt");
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.writeFileSync(folder, "");
		}
		this.writeLog(filepath, message);
	}

	downloadImage (message, url) {
		let filepath = BDFDB.LibraryRequires.path.join(this.logsfolder, message.guild_id, message.channel_id + "_images");
		if (!BDFDB.LibraryRequires.fs.existsSync(filepath)) {
			let folder = this.logsfolder;
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.mkdirSync(folder);
			folder = BDFDB.LibraryRequires.path.join(folder, message.guild_id);
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.mkdirSync(folder);
			folder = BDFDB.LibraryRequires.path.join(folder, message.channel_id + "_images");
			if (!BDFDB.LibraryRequires.fs.existsSync(folder)) BDFDB.LibraryRequires.fs.mkdirSync(folder);
		}
		let filename = url.split("/");
		filename = filename[filename.length-2] + "_" + filename[filename.length-1].split("?width=")[0];
		BDFDB.LibraryRequires.request.get({url: url, encoding: 'binary'}, (err, response, body) => {
			BDFDB.LibraryRequires.fs.writeFile(BDFDB.LibraryRequires.path.join(filepath, filename), body, "binary", (error) => {
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
					BDFDB.LibraryRequires.fs.readFile(filepath, (error, response, result) => {
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
								BDFDB.LibraryRequires.fs.writeFile(filepath, (oldlog.length > 0 ? oldlog + "\n" : "") + (new Date(logmessage.timestamp)).toLocaleString() + " @ " + logmessage.author.username.replace(/\s/g, "") + ": " + logmessage.content.replace(/\n/g, "\\n") + " (author:" + logmessage.author.id + " message:" + logmessage.id + ") (filesML:" + attachstring.slice(0,-1) + ")", (error) => {
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
		let channel = BDFDB.LibraryModules.ChannelStore.getChannel(BDFDB.LibraryModules.LastChannelStore.getChannelId());
		if (!channel) return;
		
		let logs = [];
		let filepath = BDFDB.LibraryRequires.path.join(this.logsfolder, channel.guild_id || "@me", channel.id + ".txt");
		if (BDFDB.LibraryRequires.fs.existsSync(filepath)) logs = BDFDB.LibraryRequires.fs.readFileSync(filepath).toString().split("\n");
		
		BDFDB.ModalUtils.open(this, {
			size: "LARGE",
			header: "Logger",
			subheader: channel.name,
			className: `${this.name}-Log-modal`,
			children: logs.reverse().slice(0, 100).map((log, i) => {
				let ids = / \(author:([0-9]*?) message:([0-9]*?)\)/.exec(log);
				if (ids) {
					let authorId = ids[1];
					let messageId = ids[2];
					let files = / \(filesML:(.*?)\)/.exec(log) || ["",""];
					let user = BDFDB.LibraryModules.UserStore.getUser(authorId);
					let message = BDFDB.LibraryModules.MessageStore.getMessage(channel.id, messageId);
					if (user) {
						let member = BDFDB.LibraryModules.MemberStore.getMember(authorId);
						let content = message ? message.content : log.replace(ids[0], "").replace(files[0], "").split(": ")[1];
						return [
							i > 0 ? BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.FormComponents.FormDivider, {
								className: BDFDB.disCNS.margintop8 + BDFDB.disCN.marginbottom8
							}) : null,
							BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
								align: BDFDB.LibraryComponents.Flex.Align.CENTER,
								children: [
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TooltipContainer, {
										text: message ? "Not Deleted" : "Deleted",
										children: BDFDB.ReactUtils.createElement("div", {
											className: BDFDB.DOMUtils.formatClassName("log-status", !message && "deleted")
										})
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
										color: BDFDB.LibraryComponents.TextElement.Colors.PRIMARY,
										className: "log-time",
										children: message ? message.timestamp._i.toLocaleString() : log.split(" @ ")[0]
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Avatar, {
										className: "log-user",
										src: BDFDB.UserUtils.getAvatar(user.id),
										status: BDFDB.UserUtils.getStatus(user.id),
										size: BDFDB.LibraryComponents.Avatar.Sizes.SIZE_40
									}),
									BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
										color: BDFDB.LibraryComponents.TextElement.Colors.PRIMARY,
										children: [
											BDFDB.ReactUtils.createElement("strong", {
												className: "log-name",
												children: (member && member.nickname || user.username) + ": "
											}),
											BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextScroller, {
												className: "log-content",
												speed: 1,
												children: (content.replace(/\n/g, " ") + (files[1] ? (" Images: " + files[1]) : "")).trim(),
												onClick: _ => {
													let links = [];
													for (let file of files[1].split(" ")) if (file) links.push(BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Anchor, {
														className: "log-link",
														title: file,
														href: file.split("?width=")[0],
														children: file.split("?width=")[0],
														onClick: e => {
															BDFDB.ListenerUtils.stopEvent(e);
															let link = e.currentTarget;
															let filename = link.href.split("/");
															filename = filename[filename.length-2] + "_" + filename[filename.length-1];
															let filepath = BDFDB.LibraryRequires.path.join(this.logsfolder, channel.guild_id || "@me", channel.id + "_images", filename);
															BDFDB.LibraryRequires.fs.readFile(filepath, (error, result) => {
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
																	BDFDB.ModalUtils.open(this, {
																		size: "MEDIUM",
																		header: "",
																		subheader: "",
																		className: `${this.name}-Image-modal`,
																		children: BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.Flex, {
																			justify: BDFDB.LibraryComponents.Flex.Justify.CENTER,
																			children: BDFDB.ReactUtils.createElement("div", {
																				className: BDFDB.disCN.imagewrapper,
																				style: {
																					width: width,
																					height: height,
																					margin: "0 66px 66px 66px"
																				},
																				children: BDFDB.ReactUtils.createElement("img", {
																					width: width,
																					height: height,
																					style: {
																						width: width,
																						height: height
																					},
																					src: "data:image/jpg;base64," + result.toString("base64")
																				})
																			})
																		})
																	});
																}
															});
														}
													}));
													BDFDB.ModalUtils.open(this, {
														size: "SMALL",
														header: "Content",
														subheader: "",
														className: `${this.name}-Content-modal`,
														children: [
															content ? BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
																className: BDFDB.DOMUtils.formatClassName("log-content", links.length && BDFDB.disCN.marginbottom8),
																color: BDFDB.LibraryComponents.TextElement.Colors.PRIMARY,
																children: content
															}) : null,
															links.length ? [
																BDFDB.ReactUtils.createElement(BDFDB.LibraryComponents.TextElement, {
																	color: BDFDB.LibraryComponents.TextElement.Colors.PRIMARY,
																	children: "Sent Images: "
																}),
																links
															] : null
														].flat(10).filter(n => n)
													});
												}
											})
										]
									})
								]
							})
						]
					}
				}
				return null;
			}).flat(10).filter(n => n)
		});
	}
}