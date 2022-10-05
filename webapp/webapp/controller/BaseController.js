sap.ui.define([
'sap/ui/core/mvc/Controller'
],function(Controller){
	return Controller.extend("com.dp.controller.BaseController",{
		extractPath : function(oEvent){
			var fruitId = oEvent.getParameter("arguments").fruitId;
			return "/fruits/" + fruitId;
		},
		readMessage : function(key,param1){
			var oResourceModel = this.getOwnerComponent().getModel("i18n");
			var oResourceBundle = oResourceModel.getResourceBundle();
			return oResourceBundle.getText(key,param1);
		}
	
	});
});