({
    doInit : function(component, event, helper) {
        var params = {};
        helper.callToServer(
            component,
            "c.findAccountsForMap",
            function(response)
            { 
                console.log('apex response :'+JSON.stringify(response));
                var markers = [];
                for(var i=0; i < response.length; i++) {
                    var accountInfo = response[i];
                    var completeAddress=[];
                    if(accountInfo.BillingLatitude){
                        completeAddress.push(accountInfo.Latitude);
                    }if(accountInfo.BillingLongitude){
                        completeAddress.push(accountInfo.BillingLongitude);
                    }
                    markers.push({
                    location: {
                        Latitude: accountInfo.BillingLatitude,
                            Longitude: accountInfo.BillingLongitude,
                    },
                        'icon': 'standard:account',
                        'title' : accountInfo.Name,
                        'description' : completeAddress.join()
                    })
                            
                    }
                    console.log('****markers data-'+JSON.stringify(markers));
                    component.set('v.markersTitle', 'All Account Locations');
                    component.set('v.mapMarkers', markers);
                }, 
                    params
                    );	
            }
 })
