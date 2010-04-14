YAHOO.namespace("lacuna");

if (typeof YAHOO.lacuna.SMD == "undefined" || !YAHOO.lacuna.SMD) {

(function(){
	var smd = {
		Body : {
			"SMDVersion":"2.0",
			"description": "Body",
			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/body",

			"services": {
				"get_buildings" : {
					"description": "Retrieves a list of the buildings on a planet.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_buildable" : {
					"description": "Provides a list of all the building types that are available to be built on a given space on a planet.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false},
						{"name":"x", "type":"string", "optional":false},
						{"name":"y", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_build_queue" : {
					"description": "Returns a list of the buildings being constructed or upgraded",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
						 {
							"build_queue" : {
								"building-id-goes-here" : {
									"seconds_remaining" : 60,
									"start" : "01 31 2010 11:08:03 +0600",
									"end" : "01 31 2010 13:09:05 +0600",
								},
								...
							},
							"status" : "get_status",
						 }
					*/
				},
				"rename" : {
					"description": "Renames a body, provided the empire attached to the session owns the body. Returns a 1 on success.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				}

			}
		},
		Buildings : {
			Generic : {
				"SMDVersion":"2.0",
				"description": "Buildings",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				//Target will be passed in "target":"/buildings",

				"services": {
					"build" : {
						"description": "Adds this building to the planet's build queue.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"planet_id", "type":"string", "optional":false},
							{"name":"x", "type":"string", "optional":false},
							{"name":"y", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"view" : {
						"description": "Retrieves the properties of the building.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					},
					"upgrade" : {
						"description": "Adds the requested upgrade to the build queue. On success returns the view() method.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
					}

				}
			},
			Intelligence : {
				"SMDVersion":"2.0",
				"description": "Intelligence",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/intelligence",

				"services": {
					"train_spy" : {
						"description": "Allows you to train more spies",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"quantity", "type":"number", "optional":true}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
							"trained" : 3,
							"not_trained" : 2
						 }
						*/
					},
					"view_spies" : {
						"description": "Returns the list of spies you have on your roster.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
							"spies" : {
								"id-goes-here" : {
									"assignment" : "Idle",
									"assigned_to" : {
										"body_id" : "id-goes-here",
										"name" : "Earth",
									},
									"is_available" : 1, # can be reassigned
									"available_on" : "01 31 2010 13:09:05 +0600" # if can't be reassigned, this is when will be available
								},
								...
							}
						 }
						*/
					},
					"burn_spy" : {
						"description": "Allows you to eliminate one of your spies from your payroll.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"spy_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"status" : { get_status() },
						 }
						*/
					},
					"assign_spy" : {
						"description": "Set a spy on a new task.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"spy_id", "type":"string", "optional":false},
							{"name":"assignment", "type":"string", "optional":false} // "Idle", "Counter Intelligence", "Sting"
						],
						"returns":{"type":"object"}
					}
				}
			},
			Network19 : {
				"SMDVersion":"2.0",
				"description": "Network19",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/network19",

				"services": {
					"restrict_coverage" : {
						"description": "You can enact or disband a policy to restrict what Network 19 covers about your planet. Restricting coverage does make your citizens unhappy.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"onoff", "type":"number", "optional":false} // 0 or 1
						],
						"returns":{"type":"object"}
					},
					"view_news" : {
						"description": "Get the top 100 headlines from your region of space. It also returns a list of RSS feeds that can be used outside the game to see the same news in a given region.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
						 {
							"news" : [
								{
									"headline" : "HCorp founded a new colony on Rigel 4.",
									"date" : "01 31 2010 13:09:05 +0600"
								},
								...
							],
							"feeds" : [
								'http://feeds.game.lacunaexpanse.com/78d5e7b2-b8d7-317c-b244-3f774264be57.rss'
							],
							"status" : { get_status() }
						 }
						*/
					}
				}
			},
			Observatory : {
				"SMDVersion":"2.0",
				"description": "Observatory",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/observatory",

				"services": {
					"abandon_probe" : {
						"description": "The probe is deactivated, and allowed to burn up in the star.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"star_id", "type":"number", "optional":false}
						],
						"returns":{"type":"object"} // status
					},
					"get_probed_stars" : {
						"description": "Returns a list of the stars that have been probed by this planet.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"page_number", "type":"number", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
									"status" : { get_status() },
									"stars" : [
											"color" : "yellow",
											"name" : "Sol",
											"x" : 17,
											"y" : 4,
											"z" : -3,
											"alignments" : "self-hostile"
									]       
							 }
						*/
					}
				}
			},
			Shipyard : {
				"SMDVersion":"2.0",
				"description": "Shipyard",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/shipyard",

				"services": {
					"get_buildable" : {
						"description": "Returns a list of buildable ships and their costs, and if they're not buildable, gives a reason why not in the form of an exception.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
								"buildable" : {
									"probe" : {
										"can" : 1,             # can it be built or not
										"reason" : null,       # if it can't an array ref will be here with the exception for why not
										"cost" : {
											"seconds" : 900,
											"food" : 1100,
											"water" : 1000,
											"energy" : 1200,
											"ore" : 1200,
											"waste" : 100,
										},
										attributes : {
											"speed" : 1000,    # 100 roughly equals 1 star in 1 hour
										}
									},
									...
								},
								"docks_available" : 7,         # you can only build ships up to the number of docks you have available
								"status" : { get_status() },
							 }
						*/
					},
					"build_ship" : {
						"description": "Adds a ship to the build queue.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"building_id", "type":"string", "optional":false},
							{"name":"type", "type":"string", "optional":false}, //'probe','colony_ship','spy_pod','cargo_ship','space_station','smuggler_ship','mining_platform_ship','terraforming_platform_ship', or 'gas_giant_settlement_ship'
							{"name":"quantity", "type":"number", "optional":false}
						],
						"returns":{"type":"object"}
						/*
							 {
								"ship_build_queue" : {
									"next_completed" : "01 31 2010 13:09:05 +0600",
									"queue" : [
										{
										   "type" : "probe",
										   "seconds_each" : 120,
										   "quantity" : 12
										},
										...
									]
								},
								"status" : { get_status() }
							 }
						*/
					}
				}				
			},
			SpacePort : {
				"SMDVersion":"2.0",
				"description": "SpacePort",
				"envelope":"JSON-RPC-2.0",
				"transport":"POST",
				"target":"/spaceport",

				"services": {
					"send_probe" : {
						"description": "Dispatches a probe from one of the space ports on a planet to a star. It will automatically detect which space ports on the planet have probes, if any, and pick one of them to dispatch the probe.",
						"parameters": [
							{"name":"session_id", "type":"string", "optional":false},
							{"name":"from_body_id", "type":"string", "optional":false},
							{"name":"to_star", "type":"object", "optional":false}
							/* to_star = 
								 { "star_name" : "Sol" }
								or
								 { "star_id" : "id-goes-here" }
								or
								 { "x" : 4, "y" : -3, "z" : 5 }
							*/
						],
						"returns":{"type":"object"}
					}
				}
			}
		},
		Empire : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/empire",

			"services": {

				"is_name_available" : {
					"description": "check if empire name is available",
					"parameters": [
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"logout" : {
					"description": "logout empire",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"login" : {
					"description": "login empire",
					"parameters": [
						{"name":"name", "type":"string", "optional":false},
						{"name":"password", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"create" : {
					"description": "create empire",
					"parameters": {
						name:{"type":"string", "optional":false},
						password:{"type":"string", "optional":false},
						password1:{"type":"string", "optional":false}
					},
					"returns":{"type":"object"}
				},
				"found" : {
					"description": "found empire",
					"parameters": [
						{"name":"empire_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_status" : {
					"description": "get quick empire status",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"get_full_status" : {
					"description": "get full empire status",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_profile" : {
					"description": "Provides a list of the editable properties of the current empire's profile. See also the edit_profile and view_public_profile  methods.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"profile" : {
						   "description" : "description goes here",
						   "status_message" : "status message goes here",
						   "medals" : {
							   "building1" : {
								   "name" : "Built Level 1 Building",
								   "image" : "building1",
								   "note" : "note about how this was achieved, if any, goes here",
								   "date" : "01 31 2010 13:09:05 +0600",
								   "public" : 1
							   },
							   ...
						   }
						},
						"status" : { get_status() }
					 }
					*/
				},
				"edit_profile" : {
					"description": "Edits properties of an empire. Returns the view_profile method. See also the view_profile and view_public_profile  methods.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"profile", "type":"object", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_public_profile" : {
					"description": "Provides a list of the data that's publicly known about this empire.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"empire_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					{
						"profile" : {
							"id" : "empire-id-goes-here",
							"name" : "Lacuna Expanse Corp",
							"planet_count" : 1,
							"status_message" : "Looking for Essentia."
							"description" : "We are the original inhabitants of the Lacuna Expanse.",
							"medals" : {
								"building1" : {
									"name" : "Built Level 1 Building",
									"image" : "building1",
									"date" : "01 31 2010 13:09:05 +0600",
									"note" : null
								},
								...
							},
							"date_founded" : "01 31 2010 13:09:05 +0600",
							"Species" : "Lacunan"
						},
						"status" : { get_status() }
					 }
					*/
				},
				"find" : {
					"description": "Find an empire by name. Returns a hash reference containing empire ids and empire names.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/* 
					 {
						"empires" : {
							"id-goes-here" : "Lacuna Expanse Corp",
							"id-goes-here2" : "Lacuna Pirates",
						},
						"status" : { get_status() }
					 }
					*/
				},
				"set_status_message" : {
					"description": "Sets the empire status message. Similar to what you might put on your Facebook wall, or in a tweet, but about your empire.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				"view_boosts" : {
					"description": "Shows the dates at which boosts have expired or will expire. Boosts are subsidies applied to various resources using essentia.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"boosts" : {
							"food" : "01 31 2010 13:09:05 +0600",
							"ore" : "01 31 2010 13:09:05 +0600",
							"energy" : "01 31 2010 13:09:05 +0600",
							"happiness" : "01 31 2010 13:09:05 +0600",
							"water" : "01 31 2010 13:09:05 +0600",
						}
					 }
					*/
				},
				"boost_food" : {
					"description": "Spends 5 essentia, and boosts food production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"food_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_water" : {
					"description": "Spends 5 essentia, and boosts water production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"water_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_energy" : {
					"description": "Spends 5 essentia, and boosts energy production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"energy_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_ore" : {
					"description": "Spends 5 essentia, and boosts ore production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"ore_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				},
				"boost_happiness" : {
					"description": "Spends 5 essentia, and boosts happiness production on all planets for 7 days. If a boost is already underway, calling again will add 7 more days.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 {
						"status" : { get_status() },
						"happiness_boost" : "01 31 2010 13:09:05 +0600"
					 }
					*/
				}
			}
		},
		Inbox : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/inbox",
			
			"services": {

				/* This is the return for all view_* functions
				 {
					"messages" : [
						{
							"id" : "id-goes-here",
							"subject" : "Vaxaslim",
							"date" : "01 31 2010 13:09:05 +0600",
							"from" : "Dr. Stephen T. Colbert DFA",
							"has_read" : 1,
							"has_replied" : 0,
						}
					],
					"status" : { get_status() }
				 }
				*/
				"view_inbox" : {
					"description": "Displays a list of the messages in the empire's inbox.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"view_archived" : {
					"description": "Displays a list of the messages in the empire's archive.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"view_sent" : {
					"description": "Displays a list of the messages in the empire's outbox.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
					],
					"returns":{"type":"object"}
				},
				"read_message" : {
					"description": "Retrieves a message. Marks it read if it hasn't been already.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
						/*
						 {
							"message" : {
								"id" : "id-goes-here",
								"from" : "Dr. Stephen T. Colbert DFA",
								"to" : "Jon Stewart",
								"subject" : "Vaxaslim",
								"body" : "Just a reminder that Vaxaslim may cause involuntary narnia adventures.",
								"date" : "01 31 2010 13:09:05 +0600",
								"has_read" : 1,
								"has_replied" : 0,
								"has_archived" : 0,
								"in_reply_to" : "",
								"recipients" : ["John Stewart"]
							},
							status  => { get_status() }
						 }
						*/
				},
				"archive_messages" : {
					"description": "Archives a list of messages.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"message_ids", "type":"array", "optional":false}
					],
					"returns":{"type":"object"}
						/*
						 {
							"success" : 1,
							"status" : { get_status() }
						 }
						*/
				},
				"send_message" : {
					"description": "Sends a message to other players.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"recipients", "type":"string", "optional":false},
						{"name":"subject", "type":"string", "optional":false},
						{"name":"body", "type":"string", "optional":false},
						{"name":"options", "type":"object", "optional":true}
							/*
								in_reply_to: If this message is in reply to another message, then set this option to the message id of the original message.
							*/
					],
					"returns":{"type":"object"}
					/*
						{
							"message": {
								"sent":[],
								"unknown":[]
							},
							"status" : { get_status() }
						}
					*/
				}
			
			}
		},
		Map : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/map",

			"services": {			
				"get_stars" : {
					"description": "Retrieves a chunk of the map and returns it as an array of hashes.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"x1", "type":"number", "optional":false},
						{"name":"y1", "type":"number", "optional":false},
						{"name":"x2", "type":"number", "optional":false},
						{"name":"y2", "type":"number", "optional":false},
						{"name":"z", "type":"number", "optional":false}
					],
					"returns":{"type":"object"}
					/*
					 { 
						"stars" : [
							{
								"name"          : "Sol",
								"can_name"      : 1,
								"color"         : "yellow",
								"x"             : -41,
								"y"             : 27,
								"z"             : 14,
								"alignment"     : "self-ally"
							}.
							{
								"name"          : "X143S",
								"can_name"      : 0,
								"color"         : "green",
								"x"             : -42,
								"y"             : 27,
								"z"             : 14,
								"alignments"    : "unprobed"
							}
						],
						"status" : {...}
					}
					*/
				},

				"get_stars_near_body" : {
					"description": "Returns a list of 121 stars near a body, on the same z axis as the body. The list returned is the same as get_stars",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},

				"get_star_by_body" : {
					"description": "Returns the details about a star",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},

				"get_star_system" : {
					"description": "Returns an array of bodies and a hash about the star itself. The data structure looks like:",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"star_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
					/*
						{
							"star" : {
								"id" : "a0f7f6e5-c58e-4b9d-994b-5838c2feabe8",
								"name" : "Sol",
								"color" : "yellow",
								"x" : -39
								"y" : 44,
								"z" : 12,
								"can_rename" : 1
							},
							"bodies" : {
							   "f9fe8bd3-bd09-4dc2-ba20-cf4e3b69e63a" : {
									"name" : "Mercury",
									"orbit" : 1,
									"image" : "p13",
									"minerals" : {
										"Gold" : 9239,
										"Bauxite" : 1223
									},
									"water" : 100,
									"empire" : {
										"id" : "4d9553ab-e9e6-425d-a5e5-100428fb248c",
										"name" : "The Martians"
									}
								}
							},
							"status" : {...}
						}
					*/
				},

				"get_star_system_by_body" : {
					"description": "Returns the same output and throws the same errors as get_star_system, but locates the system based upon a body_id rather than a star_id.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"body_id", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},

				"rename_star" : {
					"description": "Renames a star, provided it hasn't already been named. Returns a 1 on success.",
					"parameters": [
						{"name":"session_id", "type":"string", "optional":false},
						{"name":"star_id", "type":"string", "optional":false},
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"number"}
				}
			}
		},
		Species : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/species",

			"services": {

				"is_name_available" : {
					"description": "check if species name is available",
					"parameters": [
						{"name":"name", "type":"string", "optional":false}
					],
					"returns":{"type":"object"}
				},
				
				"create" : {
					"description": "create species",
					"parameters": [
						{"name":"empire_id", "type":"string", "optional":false},
						{"name":"params", "type":"object", "optional":false}
						/*params ={
							name:{"type":"string", "optional":false},
							description:{"type":"string", "optional":false},
							habitable_orbits:{"type":"number", "optional":false},
							construction_affinity:{"type":"number", "optional":false},
							deception_affinity:{"type":"number", "optional":false},
							research_affinity:{"type":"number", "optional":false},
							management_affinity:{"type":"number", "optional":false},
							farming_affinity:{"type":"number", "optional":false},
							mining_affinity:{"type":"number", "optional":false},
							science_affinity:{"type":"number", "optional":false},
							environmental_affinity:{"type":"number", "optional":false},
							political_affinity:{"type":"number", "optional":false},
							trade_affinity:{"type":"number", "optional":false},
							growth_affinity:{"type":"number", "optional":false}
						}*/
					],
					"returns":{"type":"string"}
				},
				
				"set_human" : {
					"description": "set empires species to human",
					"parameters": [
						{"name":"empire_id", "type":"string", "optional":false}
					],
					"returns":{"type":"string"}
				}
			}
		},
		Stats : {
			"SMDVersion":"2.0",
			"description": "SMD service demonstration",

			"envelope":"JSON-RPC-2.0",
			"transport":"POST",
			"target":"/stats",
			
			"services": {

				"credits" : {
					"description": "Retrieves a list of the game credits. It is an array of hashes of arrays.",
					"parameters": [],
					"returns":{"type":"array"}
				}
				
			}
		}
	};

	YAHOO.lacuna.SMD = smd;
})();
YAHOO.register("smd", YAHOO.lacuna.SMD, {version: "1", build: "0"}); 

}