YAHOO.namespace("lacuna");

if (typeof YAHOO.lacuna.MapSystem == "undefined" || !YAHOO.lacuna.MapSystem) {
	
(function(){
	var Lang = YAHOO.lang,
		Util = YAHOO.util,
		Cookie = Util.Cookie,
		Dom = Util.Dom,
		Event = Util.Event,
		Lacuna = YAHOO.lacuna,
		Game = Lacuna.Game;
		
	var MapSystem = function() {
		this.createEvent("onStatusUpdate");
		this.createEvent("onChangeToPlanetView");
		this._buildDetailsPanel();
	};
	MapSystem.prototype = {
		_buildDetailsPanel : function() {
			var panelId = "planetDetails";
			
			var panel = document.createElement("div");
			panel.id = panelId;
			panel.innerHTML = ['<div class="hd">Details</div>',
				'<div class="bd">',
				'	<div class="yui-g">',
				'		<div class="yui-u first">',
				'			<img id="planetDetailImg" src="" alt="" />',
				'		</div>',
				'		<div class="yui-u">',
				'			<ul>',
				'				<li id="planetDetailsName"></li>',
				'				<li><label>Empire: </label><span id="planetDetailsEmpire"></span></li>',
				'				<li><label>Minerals: </label><span id="planetDetailsMinerals"></li>',
				'				<li><label>Water: </label><span id="planetDetailsWater"></li>',
				'			</ul>',
				'		</div>',
				'	</div>',
				'</div>'].join('');
			document.body.insertBefore(panel, document.body.firstChild);
			
			this.planetDetails = new YAHOO.widget.Panel(panelId, {
				constraintoviewport:true,
				visible:false,
				draggable:true,
				fixedcenter:false,
				close:true,
				width:"500px",
				zIndex:9995,
				context:["content","tr","tr", ["beforeShow", "windowResize"]]
			});
			
			this.planetDetails.renderEvent.subscribe(function(){
				this.planetDetails.img = Dom.get("planetDetailImg");
				this.planetDetails.name = Dom.get("planetDetailsName");
				this.planetDetails.empire = Dom.get("planetDetailsEmpire");
				this.planetDetails.minerals = Dom.get("planetDetailsMinerals");
				this.planetDetails.water = Dom.get("planetDetailsWater");
			}, this, true);
			
			this.planetDetails.render();
		},
		
		IsVisible : function() {
			return this._isVisible;
		},
		MapVisible : function(visible) {
			if(this._el) {
				this._isVisible = visible; 
				Dom.setStyle(this._el, "display", visible ? "" : "none");
			}
		},
		Display : function(oResult) {
			if(!this._gridCreated) {
				var systemMap = document.createElement("div");
				systemMap.id = "systemMap";
				this._el = document.getElementById("content").appendChild(systemMap);
				
				Event.delegate(this._el, "click", function(e, matchedEl, container) {
					var body = matchedEl.Body;
					this.planetDetails.img.src = [Game.AssetUrl, "body/", body.image, ".png"].join('');
					this.planetDetails.img.alt = body.name;
					this.planetDetails.name.innerHTML = body.name;
					this.planetDetails.empire.innerHTML = body.empire && body.empire.name ? body.empire.name : "Unknown";
					this.planetDetails.minerals.innerHTML = body.ore ? "Has" : "0";
					this.planetDetails.water.innerHTML = body.water;
					this.planetDetails.show();
				}, "img.planet", this, true);
			}
			else {
				//if it exists clear it and refill
				this._el.innerHTML = "";
			}
				
			var star = oResult.star,
				bodies = oResult.bodies,
				div = document.createElement("div"),
				span = document.createElement("span"),
				img = document.createElement("img");
				
			var starImg = systemMap.appendChild(img.cloneNode(false));
			starImg.src = [Game.AssetUrl, "star/", star.color, ".png"].join('');
				
			for(var bKey in bodies) {
				if(bodies.hasOwnProperty(bKey)) {
					var body = bodies[bKey];
						
					if(body.name && body.image) {
						var elOrbit = div.cloneNode(false),
							elName = elOrbit.appendChild(span.cloneNode(false)),
							elImg = elOrbit.appendChild(img.cloneNode(false));
							
						body.id = bKey;
							
						elOrbit.id = "orbit" + body.orbit;
						Dom.addClass(elOrbit, "orbit");
						
						elName.innerHTML = body.name;
						
						elImg.src = [Game.AssetUrl, "body/", body.image, ".png"].join('');
						elImg.id = "planet" + body.orbit;
						elImg.alt = body.name;
						elImg.Body = body;
						
						if(Game.EmpireData.planets && Game.EmpireData.planets[bKey]){
							Event.on(elImg, "dblclick", function(e) {
								var img = Event.getTarget(e);
								this.planetDetails.hide();
								this.fireEvent("onChangeToPlanetView", img.Body.id);
							}, this, true);
						}
						
						Dom.addClass(elImg, "planet");
							
						systemMap.appendChild(elOrbit);
					}
				}
			}

			this.MapVisible(true);

		},
		Load : function(starId, isBody) {
			this.locationId = starId;
			if(starId) {
				var MapServ = Game.Services.Maps,
					data = {
						session_id: Cookie.getSub("lacuna","session") || ""
					},
					callback = {
						success : function(o){
							this.fireEvent("onStatusUpdate", o.result.status);
							this.Display.call(this, o.result);
						},
						failure : function(o){
							YAHOO.log(["SYSTEMMAP FAILED: ", o]);
							Lacuna.MapStar.MapVisible(true);
						},
						timeout:Game.Timeout,
						scope:this
					};
				
				if(isBody) {
					data.body_id = starId;
					MapServ.get_star_system_by_body(data,callback);
				}
				else {
					data.star_id = starId;
					MapServ.get_star_system(data,callback);
				}
			}
		},
		Reset : function() {
		}
	};
	Lang.augmentProto(MapSystem, Util.EventProvider);
	
	Lacuna.MapSystem = new MapSystem();
})();
YAHOO.register("mapSystem", YAHOO.lacuna.MapSystem, {version: "1", build: "0"}); 

}