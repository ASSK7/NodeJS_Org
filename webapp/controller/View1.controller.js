sap.ui.define([
'com/dp/controller/BaseController',
"sap/ui/model/Filter",
"sap/ui/model/FilterOperator"
],function(Controller,Filter,FilterOperator){
	return Controller.extend("com.dp.controller.View1",{
		onInit : function(){
			//this.getOwnerComponent() gives Component.js 
			//getting router object from Component.js
			this.Router = this.getOwnerComponent().getRouter();
			this.Router.getRoute("second").attachPatternMatched(this.herculis,this);
		},
		onPress : function(){
			var oAppCon = this.getView().getParent();
			oAppCon.to("idView2");
		},
		onActionListItem : function(){
			var oAppCon = this.getView().getParent();
			oAppCon.to("idView2");
		},
		onSearch : function(oEvent){
			// var search = this.getView().byId("idSF").getValue();
			// console.log(search);
			
			//1. get the search string in search field
			var sSearch = oEvent.getParameter("query");
			  //for live chnage
		      if(sSearch === "" || sSearch === undefined){
		      	 var sSearch = oEvent.getParameter("newValue");
		      }  
			
			//2. construct filter object with operand and operator
			var oFilter1 = new Filter("name",FilterOperator.Contains,sSearch);
			var oFilter2 = new Filter("taste",FilterOperator.Contains,sSearch);
			var aFilter = [oFilter1,oFilter2];
			var oMaster = new Filter({
				filters : aFilter,
				and     : false
			});
			//3.get the list object
			var oList = this.getView().byId("idLST");
			//4.inject the filtere to the list
			oList.getBinding("items").filter(oMaster);
			
		},
		onNavNext : function(){
			this.onPress();
		},
		onDelete : function(oEvent){
			//getting the selected item
			var item = oEvent.getParameter("listItem");
			//getting the object of the list
			var oList = oEvent.getSource();
			//remove item using removeItem method
			oList.removeItem(item);
			
		},
		onBtnDelete : function(oEvent){
			var oList = this.getView().byId("idLST");
			var aSelectedItems = oList.getSelectedItems();
			aSelectedItems.forEach(item => {
			    oList.removeItem(item);	
			});
			
		},
		onSelectionChange : function(oEvent){
			
			var oSelectedItem = oEvent.getParameter("listItem");
			var fruitId = oSelectedItem.getBindingContextPath().split("/")[2];
			this.Router.navTo("second",{
				fruitId : fruitId
			});
		},
		herculis : function(oEvent) {
			// var fruitId = oEvent.getParameter("arguments").fruitId;
			// var sPath = "/fruits/" + fruitId;
			 var sPath = this.extractPath(oEvent);
			var oList = this.getView().byId("idLST");
			var element= {};
			
			for(let i=0;i<oList.getItems().length;i++){
				element = oList.getItems()[i];
				if(element.getBindingContextPath() === sPath){
					oList.setSelectedItem(element);
					break;
				}
			}
			
		}
	});
});