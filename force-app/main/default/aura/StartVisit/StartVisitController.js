({
    doInit : function(component, event, helper) { 
        debugger;
        let currentLogInUserId = $A.get("$SObjectType.CurrentUser.Id");
        if(currentLogInUserId != undefined){
            component.set("v.defaultLogInUserId",currentLogInUserId);
        }
        var lat;
        var long;
        lat = component.get("v.currentLatitude");
        long = component.get("v.currentLongitude");
        helper.createDayVisit(component,lat, long);
        helper.getVisitRecord(component, event, helper);
        helper.getPastVisitRecord(component, event, helper);
        helper.getAccRelatedOppList(component, event, helper);       
        helper.getRelatedInvoiceList(component, event, helper);
        helper.getRelatedCaseList(component, event, helper);
        helper.getRelatedActivityList(component, event, helper);      
        helper.getVisitStatusPickValues(component, event, helper);
        helper.getLeadBDCategoryPickValues(component, event, helper);
        helper.getLeadCityLocationPickValues(component, event, helper);
        helper.getLeadStatusPickValues(component, event, helper);
        helper.getLeadTypePickValues(component, event, helper);
    },    
    
    closeModalPopup : function(component, event, helper){
        debugger;
        component.set("v.showPopupModal",false);
    },
    
    handleOppClick: function(component, event, helper){
        debugger;
        var url = $A.get("$Label.c.orgDefaultURL");
        var oppId = event.currentTarget.dataset.id; 
        var oppUrl = url + oppId;
        window.open(oppUrl, '_blank');
    },    
    
    createTaskHanlde :  function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",true);
    },
    
    closeActivityCreate : function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",false);
    },
    
    closeBtn : function(component, event, helper) {
        debugger;
        component.set("v.showCreateTask",false);
        component.set("v.showCreateCallLogTask",false);
        component.set("v.showCreateCase",false);
        component.set("v.showOpportunityCreate",false);
    },
    
    onChangeHandlerStatus : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldStatus').get('v.value');
    },
    
    onChangeHandlerPriority : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldPrority').get('v.value');
    },
    
    onChangeHandlerCaseStatus : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldCaseStatus').get('v.value');
    },
    
    onChangeHandlerOppStage : function(component, event, helper) {
        debugger;
        var selPick = component.find('fieldOppStage').get('v.value');
    },
    
    createLogCallHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCallLogTask",true);
    },
    
    closeCallLogCreate : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCallLogTask",false);
    },
    
    createCaseHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCase",true);
    },
    
    closeCaseHanlde : function(component, event, helper) {
        debugger;
        component.set("v.showCreateCase",false);
    },
    
    createTicket: function (component, event, helper) {
        var navService = component.find('navService');
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Case',
                actionName: 'new'
            }
        };
        navService.navigate(pageReference);
    },
    
    createTask: function (component, event, helper) {
        debugger;
        var navService = component.find('navService');
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Task',
                actionName: 'new'
            }
        };
        navService.navigate(pageReference);
    },
    
    UpdateVisitDetails: function (component, event, helper) {
        debugger;
        component.set("v.ShowUpdateVisitPage",true);
        var visitRecordId = component.get('v.visitId');
    },
    
    closeModelPop : function (component, event, helper) {
        component.set("v.ShowLogMOM",false);
    },
    
    OnchageMomDescription :  function (component, event, helper) {
        debugger;
        var description = component.find('logDescription').get('v.value');
        if(description !=undefined){
            component.set("v.logMomDescription",description);
        }
        var subject = component.find('logSubject').get('v.value');
        if(subject !=undefined){
            component.set("v.logMomSubject",subject);
        }
        var stackEmail = component.find('logStackHolderEmail').get('v.value');
        if(stackEmail !=undefined){
            component.set("v.stackEmail",stackEmail);
        }
    },
    
    createMomActivity : function (component, event, helper) {
        debugger;
        var action = component.get("c.createMomActivityLog1");
        action.setParams({
            description : component.get("v.logMomDescription"),
            visitId : component.get("v.visitId"),
            accId : component.get("v.accID"),
            subject :  component.get("v.logMomSubject"),
            salesUserId : component.get("v.auraUserId"),
            stackholderEmail : component.get("v.stackEmail")
        });
        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
                if(response.getReturnValue() === 'SUCCESS'){
                    alert('Mom Activity Created Successfully');
                    component.set("v.ShowLogMOM",false);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    createLogCall: function (component, event, helper) {
        debugger;
        var navService = component.find('navService');
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Call_Logs__c',
                actionName: 'new'
            }
        };
        navService.navigate(pageReference);
    },
    
    createLogCall: function (component, event, helper) {
        var navService = component.find('navService');
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Call_Logs__c',
                actionName: 'new'
            }
        };
        navService.navigate(pageReference);
    },
    
    openGoogleMaps: function (component, event, helper) {
        debugger;
        var currentLat = component.get("v.currentLatitude");
        var currentLong = component.get("v.currentLongitude");
        var userLocation = navigator.geolocation;
        if (userLocation) {
            userLocation.getCurrentPosition(
                function (position) {
                    var userLat = 12.917205;
                    var userLong = 77.606335;
                    // var userLat = position.coords.latitude;
                    // var userLong = position.coords.longitude;
                    if (userLat === currentLat && userLong === currentLong) {
                        // Handle the case where current location and user location are the same
                        alert("Current location and user location are the same. Please make sure location services are enabled.");
                    } else {
                        var mapsUrl = "https://www.google.com/maps/dir/?api=1&origin=" + currentLat + "," + currentLong + "&destination=" + userLat + "," + userLong + "&travelmode=driving";
                        window.open(mapsUrl, '_blank');
                    }
                },
                function (error) {
                    // Handle geolocation error
                    alert("Geolocation error: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported in your browser or device.");
        }
    },
    
    closeOpportunityHandle : function(component, event, helper) {
        debugger;
        component.set("v.showOpportunityCreate",false);
    },
    
    saveTaskHandler : function(component, event, helper) {
        debugger;
        component.set('v.spinner', true);
        component.set("v.showCreateTask",false);
        var taskRecord = component.get('v.taskRec');
        var accId = component.get('v.accID');
        taskRecord.WhatId = accId;
        var action = component.get('c.saveTask');
        action.setParams({
            taskRec :  taskRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                component.set('v.spinner', false);
                helper.getRelatedActivityList(component, event, helper);
                helper.showSuccess(component, event, helper);
                component.set("v.showCreateTask",false);
            }else{
                component.set('v.spinner', false);
                alert(JSON.stringify(response.getError()));
            }
            component.set('v.spinner', false);
        });
        $A.enqueueAction(action);
    },
    
    saveLogCall : function(component, event, helper) {
        debugger;
        component.set('v.spinner', true);
        component.set("v.showCreateCallLogTask",false);
        var today = new Date();
        var formattedDate = today.toISOString().slice(0, 10);
        var taskRecord = component.get('v.callRec');
        var accId = component.get('v.accID');
        taskRecord.WhatId = accId;
        taskRecord.Priority = 'Normal';
        taskRecord.ActivityDate = formattedDate;
        taskRecord.Status = 'Completed';
        var action = component.get('c.LogCall');
        action.setParams({
            taskRec :  taskRecord
        });
        action.setCallback(this, function(response){
            if(response.getState() ==='SUCCESS'){
                component.set('v.spinner', false);
                helper.getRelatedActivityList(component, event, helper);
                helper.showSuccess(component, event, helper);
            }else{
                alert(JSON.stringify(response.getError()));
                component.set('v.spinner', false);
            }
            component.set('v.spinner', false);
        });
        $A.enqueueAction(action);
    },
    
    createOppHandle : function(component, event, helper) {
        debugger;
        component.set("v.showOpportunityCreate",false);
        component.set('v.spinner', true);
        var oppRecord = component.get('v.oppRec');
        if(oppRecord.Name == '' || oppRecord.Name == undefined || oppRecord.Name == null){
            helper.showErrorOpp(component, event, helper);
            component.set('v.spinner', false);
        }
        else if(oppRecord.StageName == '--None-' || oppRecord.StageName == undefined || oppRecord.StageName == null || oppRecord.StageName == ''){
            helper.showErrorOpp(component, event, helper);
            component.set('v.spinner', false);
        }
            else if(oppRecord.CloseDate == '' || oppRecord.CloseDate == undefined || oppRecord.CloseDate == null){
                helper.showErrorOpp(component, event, helper);
                component.set('v.spinner', false);
            }else{
                component.set('v.spinner', true);
                var accId = component.get('v.accID');
                oppRecord.AccountId = accId;
                var action = component.get('c.saveOpportunity');
                action.setParams({
                    oppRec :  oppRecord
                });
                action.setCallback(this, function(response){
                    if(response.getState() ==='SUCCESS'){
                        component.set('v.spinner', false);
                        helper.showSuccess(component, event, helper);
                        helper.getAccRelatedOppList(component, event, helper);
                    }else{
                        alert(JSON.stringify(response.getError()));
                        component.set('v.spinner', false);
                    }
                    component.set('v.spinner', false);
                });
                $A.enqueueAction(action);
            } 
    },
    
    createOpportunityHandle: function (component, event, helper) {
        debugger;        
        let Fields = ['Name', 'Visit__c', 'AccountId', 'CloseDate', 'StageName', 'End_Use_Category__c', 'End_Use_Application__c', 'End_Use_Application_Other__c', 'LeadSource', 'Client_Note__c', 'Sales_Note__c', 'Annual_Volume_in_units__c','Annual_Volume_Full__c', 'Target_Price_Kg__c', 'Actual_Annual_Potential_Value__c', 'Billing_City__c', 'Billing_Country__c', 'Billing_Postal_Code__c', 'Billing_State__c', 'Billing_Street__c', 'Shipping_City__c', 'Shipping_Country__c', 'Shipping_Postal_Code__c', 'Shipping_State__c', 'Shipping_Street__c', 'Customer_Followup_Date__c', 'Customer_response__c', 'NextStep', 'Description'];
        component.set("v.SobjectApiName", 'Opportunity');
        component.set("v.fields", Fields);
        component.set("v.ShowModal", true);
        component.set("v.showAddressPage", true);
        helper.getRecordDetails(component);
    },
    
    onAddressSelect: function(component, event, helper) {
        helper.onShipAddressSelect(component, event, 'ship');
    },
    
    onBillAddressSelect: function(component, event, helper) {
        helper.onBillAddressSelect(component, event, 'bill');
    },
    
    handleNavigate: function(component, event, helper) {
        helper.handleNavigate(component);
        component.set("v.showAddressPage", false);
    },
    
    onCancel: function (component, event, helper) {
        component.set("v.ShowModal", false);
    },
    
    closeModel: function (component, event, helper){
        component.set("v.ShowModal", false);
        component.set("v.showCreateCase", false);
    },
    
    handleCaseSubmit: function(component, event, helper) {
        debugger;
        component.find('recordCaseEditForm').submit();
    }, 
    
    handleSubmit: function(component, event, helper) {
        debugger;
        component.set("v.spinner", true);
    }, 
    
    handleOppSubmit: function(component, event, helper) {
        debugger;
        var validateFields = true; //helper.validateFields(component, 'custSuccId');
        if(validateFields){
            component.find('recordOppEditForm').submit();
        }
    }, 
    
    handleMOppSubmit: function(component, event, helper) {
        debugger;
        var validateFields = true; //helper.validateFields(component, 'mCustSuccId');
        if(validateFields){
            component.find('recordMOppEditForm').submit();
        }
    },     
    
    // Not using 
    handleOppSuccess: function (component, event, helper) {
        debugger;
        // var opportunityId = event.getParams().response.id; //event.getParam("id");
        // console.log('OpportunityId', opportunityId);
        // var visitId = component.get("v.visitId");
        // var action = component.get("c.createVisitActivity");
        // action.setParams({
        //     opportunityId: opportunityId,
        //     visitId: visitId
        // });
        // action.setCallback(this, function (response) {
        //     if (response.getState() === "SUCCESS") {
        //         component.set("v.ShowModal", false);
        //         helper.getAccRelatedOppList(component, event, helper);
        //         helper.showSuccess(component, event, helper);
        //     } 
        //     else {
        //         console.error("Error creating Visit_Activity__c record: " + response.getError()[0].message);
        //         helper.showError(component, event, helper, response.getError()[0].message);                
        //     }
        // });
        // $A.enqueueAction(action);
    },
    
    handleError : function(component, event, helper) {
        var error = event.getParams();
        var errorMessage = event.getParam("message");
        helper.showError(component, event, helper, errorMessage);                
    },
    
    createCaseHandle : function(component, event, helper) {
        debugger;
        component.set('v.spinner', true);
        var caseId = event.getParams().response.id;
        helper.getRelatedCaseList(component, event, helper);
        helper.showSuccess(component, event, helper);
        component.set("v.showCreateCase",false);
        component.set('v.spinner', false);
    },
    
    checkInHandler : function(component, event, helper) {
        debugger;
        component.set("v.showPopupModal",false);
        helper.CheckInVisithelper(component,component.get("v.currentLatitude"), component.get("v.currentLongitude"));
    },
    
    checkOutHandler: function(component, event, helper) {
        debugger;
        helper.CheckOutVisithelper(component,component.get("v.currentLatitude"), component.get("v.currentLongitude"));       
    },
    
    goBackOnePage : function(component, event, helper){
        debugger; 
        var fieldVisitComponentEvent = component.getEvent("fieldVisitComponentEvent"); 
        fieldVisitComponentEvent.setParams({
            "showTodaysTaskComponent" : true,
            "showStartVisitComponent" : false
        });         
        fieldVisitComponentEvent.fire(); 
    },
    
    handleLWCEvent: function(component, event, helper) {
        debugger;
        var userIdFromLWC = event.getParam('value');        
        component.set("v.auraUserId", userIdFromLWC);
    },
    
    onCancelVisitUpdatePage :  function(component, event, helper) {
        debugger;
        component.set("v.ShowUpdateVisitPage", false);
    },
    
    // Updated Visit Details using Apex
    handleUpdateVisitSuccess : function(component, event, helper) {
        debugger;
        component.set('v.spinner', true);
        component.set('v.visitRec.Visit_Status__c', component.find("visitStatus").get("v.value"));
        component.set('v.visitRec.Planned_visit_date__c', component.find("plannedVisitDate").get("v.value"));
        component.set('v.visitRec.Actual_visit_date__c', component.find("actualVisitDate").get("v.value"));
        component.set('v.visitRec.Expected_Start_Time__c', component.find("expectedStartTime").get("v.value").substring(0, 5));
        component.set('v.visitRec.Expected_End_Time__c', component.find("expectedEndTime").get("v.value").substring(0, 5));
        component.set('v.visitRec.Specifier__c', component.get('v.visitRec.Specifier__c'));
        component.set('v.visitRec.Description__c', component.find("visitdescription").get("v.value"));
        component.set('v.visitRec.Street__c', component.find("visitstreet").get("v.value"));
        component.set('v.visitRec.Postal_Code__c', component.find("visitpostalCode").get("v.value"));
        component.set('v.visitRec.City__c', component.find("visitcity").get("v.value"));
        component.set('v.visitRec.State__c', component.find("visitstate").get("v.value"));
        var updateVisitObj = component.get("v.visitRec");
        var action = component.get("c.updateVisitDetails");
        action.setParams({VisitStringToUpdatedata : JSON.stringify(updateVisitObj)});
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                component.set('v.spinner', false);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'SUCCESS',
                    message: 'Visit Details Updated Successfully !',
                    duration:' 2000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
                toastEvent.fire();
                component.set("v.ShowUpdateVisitPage",false);
                component.set("v.showPopupVisitUpdateStatus",true);
            }
            else if(response.getState() == 'ERROR'){
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'ERROR',
                            message:errors[0].message,
                            duration:' 5000',
                            key: 'info_alt',
                            type: 'error',
                            mode: 'pester'
                        });
                        toastEvent.fire();
                        component.set("v.ShowUpdateVisitPage",false);
                    }
                }
            }else if (response.getState() === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }

        });
        $A.enqueueAction(action);
    },

     // Insert Lead Record using Apex
    createNewLeadRecord : function(compoenent, event,helper){
        debugger;
        compoenent.set('v.newLeadRec.Specifier__c', compoenent.get("v.visitRec.Specifier__c"));
        var getnewLeadRecord = compoenent.get("v.newLeadRec");
        var action = compoenent.get("c.specifierNewLeadRecord");
        action.setParams({LeadRec : getnewLeadRecord});
        action.setCallback(this,function(response){
            if(response.getState() === 'SUCCESS'){
                if(response.getReturnValue() != null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'SUCCESS',
                        message: 'Lead Generated Successfully !',
                        duration:' 5000',
                        key: 'info_alt',
                        type: 'success',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                    compoenent.set("v.showGenerateLeadPage",false);
                }
            }
            if(response.getState() === 'ERROR'){
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'ERROR',
                            message:errors[0].message,
                            duration:' 5000',
                            key: 'info_alt',
                            type: 'error',
                            mode: 'pester'
                        });
                        toastEvent.fire();
                        compoenent.set("v.showGenerateLeadPage",false);
                    }
                }
            }else if (response.getState() === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }

        });
        $A.enqueueAction(action);
    },

    // Insert child visit using Apex
    createChildVisit : function(compoenent,event,helper){
     debugger;
     compoenent.set('v.newChildVisitRec.Specifier__c', compoenent.get("v.visitRec.Specifier__c"));
     compoenent.set('v.newChildVisitRec.Assigned_User__c', compoenent.get("v.defaultLogInUserId"));
     compoenent.set('v.newChildVisitRec.Visit__c', compoenent.get("v.visitRec.Id"));
     compoenent.set('v.newChildVisitRec.Expected_Start_Time__c', compoenent.get("v.newChildVisitRec.Expected_Start_Time__c").substring(0, 5));
     compoenent.set('v.newChildVisitRec.Expected_End_Time__c', compoenent.get("v.newChildVisitRec.Expected_End_Time__c").substring(0, 5));
     var getChildVisitRec = compoenent.get("v.newChildVisitRec");
     var action = compoenent.get("v.createChildVisitRecord");
     action.setParams({childvisitRec : getChildVisitRec});
     action.setCallback(this,function(response){
     if(response.getState() === 'SUCCESS'){
        if(response.getReturnValue() !=null){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'SUCCESS',
                message: 'Lead Generated Successfully !',
                duration:' 5000',
                key: 'info_alt',
                type: 'success',
                mode: 'pester'
            });
            toastEvent.fire();
            compoenent.set("v.showNextVisitPage",false);
        }
     } 
     if(response.getState() === 'ERROR'){
        var errors = action.getError();
        if (errors) {
            if (errors[0] && errors[0].message) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'ERROR',
                    message:errors[0].message,
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
                toastEvent.fire();
                compoenent.set("v.showGenerateLeadPage",false);
            }
        }
    }else if (response.getState() === "INCOMPLETE") {
        alert('No response from server or client is offline.');
    }
     });
     $A.enqueueAction(action);
    },

    // New Lead Creation // Not used
    genereateLeadRecord :  function(component, event, helper) {
        debugger;
        var params = event.getParams();
        var recordId = params.response.id;
        var fields = params.response.fields;
        if(params.response !=null && params.response != undefined){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'SUCCESS',
                message: 'Lead Created Successfully!',
                duration:' 5000',
                key: 'info_alt',
                type: 'success',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.showGenerateLeadPage",false);
        }
    },

    // Not used
    handleGenerateLeadError : function(component, event, helper) {
        debugger;
        var errorMsg = event.getParam("detail");
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error",
            "message": errorMsg,
            "type": "error"
        });
        toastEvent.fire();
    },
    
    OpenLeadGenerateModel: function (component, event, helper) {
        debugger;
        component.set("v.showPopupVisitUpdateStatus",false);
        component.set("v.showGenerateLeadPage",true);
    },

    GoBackToFinalVisitStausScreen : function (component, event, helper) {
        debugger;
        component.set("v.showPopupVisitUpdateStatus",true);
        component.set("v.showGenerateLeadPage",false);
        component.set("v.showNextVisitPage",false);
    },
    
    closeModel: function(component, event, helper) {
        debugger;
        component.set("v.showPopupVisitUpdateStatus", false);
    },
    
    closeModelGenerateLead : function(component, event, helper) {
        debugger;
        component.set("v.showGenerateLeadPage", false);
        component.set("v.showNextVisitPage",false);
    },

    handleError : function (component, event, helper) {
       debugger;
        component.set("v.showSpinner", false);
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error",
            "message": "There was an error saving the record.",
            "type": "error"
        });
        toastEvent.fire();
    },

    OpenNextVisitModal : function(component, event, helper) {
     debugger;
     component.set("v.showNextVisitPage",true);
     component.set("v.showPopupVisitUpdateStatus",false);
    },

    // Not used
    NewVisitRecordOnSuccess : function(component, event, helper) {
        debugger;
        var params = event.getParams();
        var recordId = params.response.id;
        var fields = params.response.fields;
        if(params.response !=null && params.response != undefined){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : 'SUCCESS',
                message: 'Visit Created Successfully!',
                duration:' 5000',
                key: 'info_alt',
                type: 'success',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.showNextVisitPage",false);
        }
    },

    handleNewVisitError : function (component, event, helper) {
        debugger;
         component.set("v.showSpinner", false);
         var toastEvent = $A.get("e.force:showToast");
         toastEvent.setParams({
             "title": "Error",
             "message": "There was an error saving the record.",
             "type": "error"
         });
         toastEvent.fire();
     },

     onChangeVisitStatusHandler : function(component,event,helper){
        debugger;
        var selectedStatus = event.getSource().get("v.value");
        var updatedStatus = component.get('v.visitRec'); 
        component.set('v.visitRec.Visit_Status__c', selectedStatus);
        var updatedStatus1 = component.get('v.visitRec');
    },
    
    onChangeBdCategoryHandler : function(component,event,helper){
        debugger;
        var selectedCategory = event.getSource().get("v.value");
        component.set('v.newLeadRec.BD_Catogory__c', selectedCategory);
    },
    onChangeLeadCityLocationHandler : function(component,event,helper){
        debugger;
        var selectedCityLocation = event.getSource().get("v.value");
        component.set('v.newLeadRec.Client_Location_City__c', selectedCityLocation);
    },
    onChangeLeadStatusHandler : function(component,event,helper){
        debugger;
        var selectedLeadStatus= event.getSource().get("v.value");
        component.set('v.newLeadRec.Status', selectedLeadStatus);
    },
    handleApproxValueChange: function(component, event, helper) {
       debugger;
       var leadApproxValue = event.getSource().get("v.value");
    },
    onChangeLeadTypeHandler: function(component, event, helper) {
        debugger;
        var selectedleadType = event.getSource().get("v.value");
        component.set('v.newLeadRec.Lead_Type__c', selectedleadType);
     },

    
})