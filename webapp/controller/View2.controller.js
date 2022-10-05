sap.ui.define([
'com/dp/controller/BaseController',
'sap/ui/core/Fragment',
'sap/ui/model/Filter',
'sap/ui/model/FilterOperator',
'sap/m/MessageBox',
'sap/m/MessageToast',
'sap/m/MessageStrip'
],function(Controller,Fragment, Filter,FilterOperator,MessageBox,MessageToast,MessageStrip){
	return Controller.extend("com.dp.controller.View2",{
		onInit : function(){
			//get router object
			this.Router = this.getOwnerComponent().getRouter();
			this.Router.getRoute("second").attachPatternMatched(this.herculis,this);
		},
		onBack : function(){
			var oAppCon = this.getView().getParent();
			oAppCon.to("idView1");
		},
		herculis : function(oEvent){
			// var fruitId = oEvent.getParameter("arguments").fruitId;
			// var sPath = "/fruits/" + fruitId;
			var sPath = this.extractPath(oEvent);
			this.getView().bindElement(sPath);
		},
		onLinkPress : function(oEvent){
			var sText = oEvent.getSource().getText();
			sText = "https://google.com?q=" + sText;
			window.open(sText);
		},
		oCityPopup : null,
		oSupplierPopup : null,
		onConfirm : function(oEvent){
			var sId = oEvent.getSource().getId();
			if(sId.indexOf("idCity") !== -1){
				var oSelectedItem = oEvent.getParameter("selectedItem");
		        var sText = oSelectedItem.getLabel();
		        this.selectedField.setValue(sText);
			}
			else{
				//1. get the table object
				var oTable = this.getView().byId("idTable");
				//2. read the multi selected items
				var aSelectedItems = oEvent.getParameter("selectedItems");
				//3. construct a filter
				var aFilters = [];
				for(var i=0 ; i < aSelectedItems.length;i++){
					var element = aSelectedItems[i];
					var sText = element.getLabel();
					aFilters.push(new Filter('name',FilterOperator.EQ,sText));
					
				}
				var oFilters = new Filter({
					filters : aFilters,
					and     : false
				});
				//4.pump to binding
				oTable.getBinding("items").filter(oFilters);
			}
		},
		onValueHelp : function(oEvent){
			this.selectedField = oEvent.getSource();
			if(!this.oCityPopup){
				var that = this;
			Fragment.load({
				name : "com.dp.fragments.popup",
				type : "XML",
				id : "idCity",
				controller : this
			}).then(function(popup){
				popup.setTitle("Select City");
				that.getView().addDependent(popup);
				popup.bindAggregation("items",{
					path : '/cities',
					template : new sap.m.DisplayListItem({
						label : '{cityName}',
						value :' {famousFor}'
					})
				});
				popup.setMultiSelect(false);
				that.oCityPopup = popup;
				popup.open();
			});
		}
		else{
			this.oCityPopup.open();
		}
		},
		selectedField : null,
		onSearchPopup : function(oEvent){
		    //1. get the search string
		    var sVal = oEvent.getParameter("value");
		    var oBinding = oEvent.getParameter("itemsBinding");
		    //3. set filter
		    var oFilter = new Filter("name",FilterOperator.Contains,sVal);
		    //4. pass the filter to popup filter binding
		    oBinding.filter(oFilter);
		},
		onFilter : function(oEvent){
			var that = this;
			if(!this.oSupplierPopup){
			Fragment.load({
				name : "com.dp.fragments.popup",
				type : "XML",
				id : "idSupplier",
				controller : this
			}).then(function(popup){
				that.getView().addDependent(popup);
				popup.setTitle("Select Supplier");
				popup.bindAggregation("items",{
					path : '/supplier',
					template : new sap.m.DisplayListItem({
						label : '{name}',
						value : '{city}'
					})
				});
				that.oSupplierPopup = popup;
				popup.open();
			});
		}
		else{
			this.oSupplierPopup.open();
		}
		},
		handleConfirm : function(status){
			if(status === 'OK'){
				MessageToast.show(this.readMessage("XMSG_ORDERL","9908"));
			}
			else{
				//
			}
		},
		onOrder : function(params){
			MessageBox.confirm(this.readMessage("XMSG_CONFIRM"),{
			   title : "Confirmation",
			   onClose : this.handleConfirm.bind(this)
			});
		},
		onCancel : function(){
			
		}
		
	});
});