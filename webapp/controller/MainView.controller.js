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
            var oView = this.getView();
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            var sFName = oView.byId("idInptFName").getValue().trim();
            var sLName = oView.byId("idInptLName").getValue().trim();
            var sSelectedMOP = oView.byId("idSelMOP").getSelectedKey();
            var sMobileNumber = oView.byId("idInputPhone").getValue().trim();
            var sCreditCard = oView.byId("idInputCC").getValue().trim();

            // Check if both names are blank
            if (sFName === "" && sLName === "") {
                MessageBox.error(oTextBundle.getText("bothNamesBlankMsg"));
                return;
            }

            // Check if first name is blank
            else if (sFName === "") {
                MessageToast.show(oTextBundle.getText("requiredFieldMsg"));
                return;
            }

            // Check if mode of payment is blank
            else if (sSelectedMOP === "") {
                MessageToast.show(oTextBundle.getText("requiredFieldMsg"));
                return;
            }

            // GCash validation
            if (sSelectedMOP === "GCASH") {
                var isValidMobile = /^09\d{9}$/.test(sMobileNumber);
                if (!isValidMobile) {
                    MessageBox.warning(oTextBundle.getText("invalidMobileMsg"));
                    return;
                }
            }

            // Credit Card validation
            if (sSelectedMOP === "CC") {
                var isValidCC = /^\d{16}$/.test(sCreditCard);
                if (!isValidCC) {
                    MessageBox.warning(oTextBundle.getText("invalidCCMsg"));
                    return;
                }
            }

            // If all validations pass
            MessageBox.success(oTextBundle.getText("checkoutSuccessMsg"));
        }

    });
});