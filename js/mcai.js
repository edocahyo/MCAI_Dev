	var app = {}, map, legendLayers = [], toc, dynaLayer1, dynaLayer2, featLayer1;

    require([
      "esri/map",
      "esri/arcgis/utils",
      "esri/InfoTemplate", 
      "esri/dijit/Legend",
	  "esri/dijit/InfoWindowLite",	  
	  "esri/dijit/HomeButton",
      "esri/dijit/Bookmarks",
      "esri/layers/FeatureLayer",
	  "esri/layers/ArcGISTiledMapServiceLayer", 
	  "esri/layers/ArcGISDynamicMapServiceLayer",
	  "esri/layers/ImageParameters",
	  
	  "esri/symbols/SimpleFillSymbol",
	  "esri/renderers/ClassBreaksRenderer",
	  
	  "esri/dijit/Print", "esri/tasks/PrintTemplate", 
      "esri/request", "esri/config",
		
	  "dojo/dom-construct",
	  "dojo/dom",      
      "dojo/on",
      "dojo/parser",      
	  "dojo/query",
	  "dojo/_base/array",
      "dojo/_base/connect",
	  "dojo/_base/Color",
	  
	  "dijit/form/CheckBox",
      "dijit/layout/AccordionContainer",
      "dijit/layout/BorderContainer",
      "dijit/layout/ContentPane",
	  "dijit/TitlePane",
	  "dijit/MenuBar",
      "dijit/PopupMenuBarItem",
      "dijit/Menu",
      "dijit/MenuItem",
      "dijit/DropDownMenu",
	  "esri/dijit/Measurement",
	  
	  "agsjs/dijit/TOC", 
	  
	  "dojo/fx", 
	  "dojo/domReady!"
    ],
      function (
        Map, utils, InfoTemplate, Legend, InfoWindowLite, HomeButton, Bookmarks, FeatureLayer, 
			ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, ImageParameters,  
			SimpleFillSymbol, ClassBreaksRenderer, Print, PrintTemplate, esriRequest, esriConfig,
		domConstruct, dom, on, parser, query, arrayUtils, connect, Color, 
		CheckBox, AccordionContainer, BorderContainer, ContentPane, 
			TitlePane, MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu, 
		Measurement,
		TOC
      ) {

        parser.parse();
		
		//setting printing seb
		//app.printUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
		//esriConfig.defaults.io.proxyUrl = "/proxy";
		
		
        map = new Map("map", {
          basemap: "topo", 
          center: [-242, -2],
          zoom: 5
        });

		var basemap = map.getLayer(map.layerIds[0]);
			basemap.hide();
			
		//add homeButton
		var home = new HomeButton({
			map: map
		}, "HomeButton");
		home.startup();
		
		//add measurement
		var measurement = new Measurement({
          map: map
        }, "measurementDiv");
        measurement.startup();

		//add print feature
		
		
		//
		
		mcaiLayer = new ArcGISDynamicMapServiceLayer("http://117.54.11.70:6080/arcgis/rest/services/mcai/Modeldemo_indonesia/MapServer", {
		});
		d_meranginLayer = new ArcGISDynamicMapServiceLayer("http://117.54.11.70:6080/arcgis/rest/services/mcai/Modeldemo_merangin/MapServer", {
		});
		landscapeLayer = new ArcGISDynamicMapServiceLayer("http://117.54.11.70:6080/arcgis/rest/services/mcai/Model_demo/MapServer", {
		});
		
		//addMCAILayers();
		isiBookmarks();
		
		//add TOC new layer list
		map.on('layers-add-result', function(evt){
		// overwrite the default visibility of service.
        // TOC will honor the overwritten value.        
		//try {
		toc = new TOC({
			map: map,
			layerInfos: [
				{
					layer: mcaiLayer,
					title: "MCA - Indonesia", 
					//collapsed: false, // whether this root layer should be collapsed initially, default false.
					//slider: true // whether to display a transparency slider.
				},
				{
					layer: d_meranginLayer,
					title: "District", 
					//collapsed: false, // whether this root layer should be collapsed initially, default false.
					//slider: true // whether to display a transparency slider.
				},
				{
					layer: landscapeLayer,
					title: "Landscape", 
					//collapsed: false, // whether this root layer should be collapsed initially, default false.
					//slider: true // whether to display a transparency slider.
				}
			]}, 'divTOC');
			toc.startup();
			toc.on('load', function(){
                 if (console) 
                    console.log('TOC loaded');
           });
			toc.on('toc-node-checked', function(evt){
				if (console) {
						console.log("TOCNodeChecked, rootLayer:"
						+(evt.rootLayer?evt.rootLayer.id:'NULL')
						+", serviceLayer:"+(evt.serviceLayer?evt.serviceLayer.id:'NULL')
						+ " Checked:"+evt.checked);
						//+ " Checked: false");
				}
			});
		//} catch (e) {  alert(e); }		 
		});
		
		map.addLayers([mcaiLayer, d_meranginLayer, landscapeLayer]);
		
		//map.on("click", checkLayers);
				
		//all functions
        function handleError(err) {
          console.log("Something broke: ", err);
        }

		
		function checkLayers() {
		}
		
		function isiBookmarks(){
			// Bookmarks can be specified as an array of objects with the structure:
			// { extent: <esri.geometry.Extent>, name: <some string> }
			var bookmarks_list = [
			{
			  "extent":   {"xmin":11227987.95886309,"ymin":-282511.2565420469,"xmax":11436813.920138273,"ymax":-187423.5933552512,"spatialReference":{"wkid":102100}}
			  ,"name": "Merangin" 
			},
			{
			  "extent":  {"xmin":13064616.874498943,"ymin":-307276.85370637296,"xmax":13482268.797048943,"ymax":-117101.52733294613,"spatialReference":{"wkid":102100}}
				,"name": "Mamuju" 
			},
			{
			  "extent":  {"xmin":13242103.654177047,"ymin":-359789.0921383136,"xmax":13346516.634814456,"ymax":-312245.260544998,"spatialReference":{"wkid":102100}}
				,"name": "Mamasa" 
			}
			];

			var bookmarks_landscape = [{
			  "extent": {
				"xmin": 11162557.862651093,
				"ymin": -343049.3829438085, 
				"xmax": 11580209.785201093,
				"ymax": -152874.05657038168,
				"spatialReference": {
					"wkid": 102100
				}
			  },
			  "name": "Sungai Tenang" 
			}];
			
			// Create the bookmark widget
			bookmarks = new esri.dijit.Bookmarks({
			  map: map, 
			  bookmarks: bookmarks_list
			}, dojo.byId('bookmarks'));
			
			bookmarksLandscape = new esri.dijit.Bookmarks({
			  map: map, 
			  bookmarks: bookmarks_landscape
			}, dojo.byId('bookmarksLandscape'));
		}
      });