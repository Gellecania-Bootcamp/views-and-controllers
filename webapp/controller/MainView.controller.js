sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function(Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.training.exer1gellecania.controller.MainView", {
        onInit: function() {
            //initialization
        },

        onAddItem: function (){
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
        },

        fnDisplayMsg: function (sMsg){
            MessageToast.show(sMsg);
        },

        onChangeMOP: function (oEvent) {
            var oView = this.getView();
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sSelectedKey = oSelectedItem.getKey();
            var sSelectedText = oSelectedItem.getText();

            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("selectedPaymentMsg", [sSelectedText]);
            MessageToast.show(sMsg);

            var oCCLabel = oView.byId("idLblCC");
            var oCCInput = oView.byId("idInputCC");
            var oMobileLabel = oView.byId("idLblPhone");
            var oMobileInput = oView.byId("idInputPhone");

            oMobileLabel.setVisible(false);
            oMobileInput.setVisible(false);
            oCCLabel.setVisible(false);
            oCCInput.setVisible(false);

            if (sSelectedKey === "CC"){
                oCCLabel.setVisible(true);
                oCCInput.setVisible(true);
            } else if (sSelectedKey === "GCASH") {
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
            }
        },

        onPressCheckout: function (){
            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            // Check if first name and last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === ""){
               
            // set value state to Error
                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            } else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

                //Navigate to review page passing first
                oRouter.navTo("RouteReviewPage", {
                    firstName: oInputFNameValue
                });

            }
        },

        onAddItem: function(){
            // Comment this code for now
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
                    // this.fnDisplayMsg(sMsg);

            // Instantiate the fragment

            // create dialog lazily
            if (!this.oDialog) {
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1gellecania.fragment.ProductDialog"
                });
            } 
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },
        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
        }
    });
});