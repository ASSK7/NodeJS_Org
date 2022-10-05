sap.ui.define([
'sap/ui/core/UIComponent'	
],function(UIComponent){
	return UIComponent.extend("com.dp.Component",{
	   metadata : {
	   	manifest : "json"
	   },
	   init : function(){
	   	//calling the constructor of base class
	   	UIComponent.prototype.init.apply(this);
	   	
	   	//1. configuration for the router was done in Manifest.json
	   	//2. get router object
	   	var oRouter = this.getRouter();
	   	//3. initialize the router
	   	 oRouter.initialize();
	   } //,
	  //createContent : function(){
	  //	 var oView = sap.ui.view({
	  //	 	viewName : "com.dp.view.App",
	  //	 	id       : "idAppView",
	  //	 	type     : "XML"
	  //	 });
	   	 
	  //	 //1. Creating the View1 Object
	  //	 var oView1 = sap.ui.view({
	  //	 	viewName : "com.dp.view.View1",
	  //	 	id       : "idView1",
	  //	 	type     : "XML"
	  //	 });
	   	 
	  //	 //2. Creating the View2 Object
	  //	 var oView2 = sap.ui.view({
	  //	 	viewName : "com.dp.view.View2",
	  //	 	id       : "idView2",
	  //	 	type     : "XML"
	  //	 });
	   	 
	  //	 //3. Get the object of the App View Container
	  //	  var oAppCon = oView.byId("idAppCon");
	  //	  oAppCon.addMasterPage(oView1).addDetailPage(oView2);
	  //	 return oView;
	  //}
	});
});