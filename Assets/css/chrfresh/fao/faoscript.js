// Index js

//let postbackUrl = location.protocol + '//' + location.host + location.pathname;
//let selectedRegion;
//let officeUrl = window.location.href;

//let queryString = officeUrl.split("?")[1];

//let newUrl = postbackUrl;
//$(function () {

//    if ($('#chrFaoMapNew').length) {


//        $('div.chrContainer_fao_checkbox_Wrapper input[type=checkbox]').each(function () {
//            if ($(this).attr("data-checked") == undefined) {
//                $(this).prop('checked', false)
//            }
//        });


//        $('.chrContainer_fao_browseRegion').on('click', '.chrContainer_fao_browseRegion_title', function () {

//            let browseRegiondd = $('.chrContainer_fao_browseRegion_wrapper ul');
//            let browseRegionChevron = $('.chrContainer_fao_browseRegion .chevronOfficeType');
//            if (browseRegiondd.hasClass('show')) {
//                browseRegiondd.removeClass('show');
//                browseRegionChevron.removeClass('open');
//            }
//            else {
//                browseRegiondd.addClass('show');
//                browseRegionChevron.addClass('open');
//            }

//        })
//        $('.chrContainer_fao_formFilter').on('click', '.chrContainer_fao_lblFilters', function () {

//            let filterChkBoxes = $('.chrContainer_fao_checkbox_Container');
//            let filterChevron = $('.chrContainer_fao_lblFilters .chevronOfficeType');
//            if (filterChkBoxes.hasClass('show')) {
//                filterChkBoxes.removeClass('show');
//                filterChevron.removeClass('open');
//            }
//            else {
//                filterChkBoxes.addClass('show');
//                filterChevron.addClass('open');
//            }

//        })
//        $('.chrContainer_fao_formFilter').on('click', '.chrResetBtn', function () {
//            let newUrl = postbackUrl;
//            window.location.href = newUrl;


//        })
//        $(".chrContainer_fao_browseRegion_wrapper").on("click", "ul li", function (e) {

//            if (selectedRegion != e.target.innerHTML) {
//                let regionId = e.currentTarget.getAttribute("data-val");


//                if (queryString) {

//                    queryString = "?" + queryString;
//                    let searchfirstPart = "", searchsecondPart = "";
//                    if (queryString.includes('&q=') && queryString.includes('&ot')) {
//                        searchfirstPart = queryString.split('&q=')[0];
//                        searchsecondPart = '&ot' + queryString.split('&ot')[1];
//                        queryString = searchfirstPart + searchsecondPart;
//                    }
//                    else if (queryString.includes('&q=')) {
//                        queryString = "";
//                    }
//                    let firstpart = "", lastpart = "";
//                    if (queryString.includes('region=')) {
//                        firstpart = queryString.split('region=')[0];


//                        lastpart = queryString.split('&loc')[1];

//                        if (firstpart.includes('?')) {
//                            newUrl = firstpart + "region=" + regionId + "&regionname=" + e.target.innerHTML;
//                        } else {
//                            newUrl = firstpart + "&region=" + regionId + "&regionname=" + e.target.innerHTML;
//                        }

//                        if (lastpart) {
//                            newUrl = newUrl + "&loc" + lastpart;
//                        }
//                    }
//                    else {
//                        if (queryString) {

//                            newUrl = queryString + "&region=" + regionId + "&regionname=" + e.target.innerHTML;
//                        }

//                        else {
//                            newUrl = "?region=" + regionId + "&regionname=" + e.target.innerHTML;

//                        }


//                    }
//                }

//                else {

//                    newUrl = "?region=" + regionId + "&regionname=" + e.target.innerHTML;

//                }
//                window.location.href = newUrl;

//            }

//            document.getElementById('lblRegion').innerHTML = e.target.innerHTML;
//            document.getElementById('browseRegion_title').click();
//        });

//        $(".chrContainer_fao_searchBtn,.chrContainer_fao_applyBtn").on("click", function (e) {
//            filterSearchResults();
//        })



//        $(".chrContainer_fao_formSearch").on('submit', function (e) {

//            e.preventDefault();
//            filterSearchResults();

//        });
//        let textsearchbox = document.querySelector('#txtSearchBox');
//        textsearchbox.addEventListener("input", function () {
//            if (this.value.length > 0) {
//                $('.chrContainer_fao_browseRegion.browseRegion_bgScr').hide();
//                $('.chrContainer_fao_browseRegion_smScr').addClass("hideRegion");

//            }
//            else {
//                $('.chrContainer_fao_browseRegion.browseRegion_bgScr').show();
//                $('.chrContainer_fao_browseRegion_smScr').removeClass("hideRegion");
//            }
//        })
//        if (queryString && queryString.includes("&q=") || $.trim($('#txtSearchBox').val()) !== '') {
//            $('.chrContainer_fao_browseRegion.browseRegion_bgScr').hide();
//            $('.chrContainer_fao_browseRegion_smScr').addClass("hideRegion");
//        }
//        else {
//            $('.chrContainer_fao_browseRegion.browseRegion_bgScr').show();
//            $('.chrContainer_fao_browseRegion_smScr').removeClass("hideRegion");
//        }


//    }
//})

//function filterSearchResults() {

//    let firstPart = "", lastPart = "";
//    if (queryString) {
//        queryString = "?" + queryString;


//        if (queryString.includes("&u=M")) {
//            if (queryString.includes("&ot")) {
//                firstPart = queryString.split('&ot')[0];

//            }

//            lastPart = queryString.split('&u=M')[1];


//        }
//        else {
//            newUrl += `${queryString ? queryString : ""}` + '&loc=l';
//        }

//    }

//    else {

//        newUrl += '?loc=l';

//    }

//    if ($.trim($('#txtSearchBox').val()) != '') {

//        if (queryString) {
//            if (queryString.includes('region=') || queryString.includes('loc=l')) {
//                firstPart = "?loc=l" + '&q=' + $('#txtSearchBox').val();

//            }
//            else {
//                newUrl += '&q=' + $('#txtSearchBox').val();
//            }
//        }
//        newUrl += '&q=' + $('#txtSearchBox').val();
//    }


//    let i = 0;

//    let offtype = '';

//    $('.chrContainer_fao_checkbox_Wrapper input[type=checkbox]').each(function () {

//        if (this.checked) {
//            console.log("i=" + i);
//            if (i == 0) {

//                offtype = '&ot=';

//                i++;

//            }
//            offtype += encodeURIComponent($(this).next().text().trim()).replace(/%20/g, "+") + "|";
//        }

//    });

//    if (offtype && offtype.length > 9) {

//        offtype = offtype.slice(0, -1);
//    }

//    if ($.trim($('#txtSearchBox').val()) != '' || i > 0) {
//        if (firstPart) {
//            if (firstPart.includes('&q=')) {
//                newUrl = firstPart + offtype;
//            }
//            else {
//                newUrl = firstPart + offtype + lastPart;
//            }

//        }
//        else {
//            newUrl += offtype;
//        }

//        newUrl += "&u=M";
//    }
//    else {
//        newUrl = postbackUrl;

//    }

//    window.location.href = newUrl;
//}

// Index JS ends here

// Filter js starts here
//let autoFillData = window.locationData;




$(function () {
    $('.chrContainer_fao_txtSearch').autocomplete({
        source: '/api/custom/faolookup',
        //params: { Countries: 'USA' },
        minLength: 2,
        classes: {
            "ui-autocomplete": "fao-highlight"
        }
    });
});

function setAutoFill(value) {





    let data = autoFillData.find(x => x.DisplayText.toLowerCase() == value.toLowerCase()).SearchText;

    return data;



}

function redirectuser(user) {

}

// Filter js ends here

// map js starts here
//const var
const chrAzureKey = $('#azure-map-key').val();
if ($('#chrFaoMapNew').length) {
    var map, datasource, markerLayer, popup, coordsFAOdata;

    //GeoJSON feed that contains the data we want to map.
    var geojsonFeed = chrGeoJsonResults;

    $(window).on("load",function () {

        InitMap();

    })

}


function InitMap() {

    map = new atlas.Map('chrFaoMapNew', {

        zoom: 2,
        style: 'grayscale_light',
        view: 'Auto',

        //Add authentication details for connecting to Azure Maps.
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: chrAzureKey
        }

    });


    map.events.add('ready', function () {

        //console.log(chrGeoJsonResults);
        //Create a data source and add it to the map.
        datasource = new atlas.source.DataSource();
        map.sources.add(datasource);

        datasource.add(chrGeoJsonResults);

        var bounds = atlas.data.BoundingBox.fromData(chrGeoJsonResults);

        if (chrGeoJsonResults.features.length == 1) {


            map.setCamera({
                center: chrGeoJsonResults.features[0].geometry.coordinates,

                zoom: 4
            });
        }
        else {
            //Update the map view to show the data.
            map.setCamera({
                bounds: bounds,
                padding: 100
            });
        }


        var FAOdata = datasource.shapes;

        coordsFAOdata = FAOdata.map((obj) => {
            const container = {};
            container.long = obj.data.geometry.coordinates[0];
            container.lat = obj.data.geometry.coordinates[1];
            container.metaData = obj.data.properties;
            return container;
        });


        pushAzureMarker();

        var zoomControl = new atlas.control.ZoomControl();

        /* Add the zoom control to the map*/
        map.controls.add(zoomControl, {
            position: "bottom-right"
        });

        legend = new atlas.control.LegendControl({
            legends: [
                {
                    type: 'html',
                    subtitle: '',
                    html: `<div class="simple-legend">
                        <div class="d-flex mt-1 mb-1">
                            <div>
                                <img class="legend-marker-img" src="/Presentation/chrobinson/fao/assets/img/markers/redMarker.svg" alt="distr" />
                            </div>
                            <div class="legend-marker-list-item">Distributor</div>
                        </div>
                        <div class="d-flex mt-1 mb-1">
                            <div>
                                <img class="legend-marker-img" src="/Presentation/chrobinson/fao/assets/img/markers/greenMarker.svg" alt="distr" />
                            </div>
                            <div class="legend-marker-list-item">Warehouse</div>
                        </div>
                    </div>`
                }]
        })
        map.controls.add(legend, {
            position: 'bottom-left'
        });

        //// Add a style control to the map.
        //map.controls.add(new atlas.control.StyleControl({
        //    mapStyles: 'all'
        //}), {
        //    position: 'top-left'
        //});

        legend.setOptions({
            layout: 'list',
            showToggle: false
        });
    });

    

}

function pushAzureMarker() {
    //Create a HTML marker layer for rendering data points.
    markerLayer = new atlas.layer.HtmlMarkerLayer(datasource, null, {
        markerCallback: function (id, position, properties) {
            //Check to see if marker represents a cluster.

            let length = getLength(properties.branchId);
            //Individual points are rendered dodger blue.
            return new atlas.HtmlMarker({
                position: position,
                color: 'DodgerBlue',
                htmlContent: `<img src="${getIcon(length, properties.branchId)}">`
            });
        }
    });

    //Add a click event to the marker layer.
    map.events.add('click', markerLayer, markerClicked);

    //Add marker layer to the map.
    map.layers.add(markerLayer);

    popup = new atlas.Popup({
        pixelOffset: [0, -18],
        closeButton: true
    });

}

function markerClicked(e) {
    var marker = e.target;


    var prop = marker.properties;


    popup.setOptions({
        content: getMarkerPopup(prop),
        position: marker.getOptions().position
    });

    popup.open(map);

}



function getLength(val) {
    let coordinatesObj = coordsFAOdata.find(x => x.metaData.branchId == val);

    let data = coordsFAOdata.filter(value => value.long == coordinatesObj.long && value.lat == coordinatesObj.lat);


    return data.length;
}

function getIcon(length, val) {
    let icon;
    console.log('Value', val);
    switch (val) {
        case "Warehouse":
            icon = `/Presentation/chrobinson/fao/assets/img/markers/greenMarker.svg`;
            break;
        case "Distributor":
            icon = `/Presentation/chrobinson/fao/assets/img/markers/redMarker.svg`;
            break;
    }
    //if (length == 1) {


    //    switch (val) {
    //        case "6":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/greyMarker.svg`;
    //            break;
    //        case "5":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/greenMarker.svg`;
    //            break;
    //        case "2":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/blueMarker.svg`;
    //            break;
    //        case "4":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/darkBlueMarker.svg`;
    //            break;
    //        case "3":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/lightBlueMarker.svg`;
    //            break;
    //        case "1":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/blackMarker.svg`;
    //            break;
    //        case "7":
    //            icon = `../../../Presentation/chrobinson/fao/assets/img/markers/darkBlueMarker.svg`;
    //            break;

    //        default:
    //            icon = "";
    //            break;
    //    }
    //}
    //else {
    //    if (length < 5) {
    //        icon = `../../../Presentation/chrobinson/fao/assets/img/markers/${length}Marker.png`;
    //    }
    //    else {
    //        icon = `../../../Presentation/chrobinson/fao/assets/img/markers/5Marker.png`;
    //    }
    //}
    return icon;
}

function getTheme(val) {
    let icon;
    switch (val) {
        case "Distributor":
            icon = "grey";
            break;
        case "Warehouse":
            icon = "green";
            break;
    }
    //switch (val) {
    //    case "6":
    //        icon = "grey";
    //        break;
    //    case "5":
    //        icon = "green";
    //        break;
    //    case "2":
    //        icon = "blue";
    //        break;
    //    case "4":
    //        icon = "darkBlue";
    //        break;
    //    case "3":
    //        icon = "lightBlue";
    //        break;
    //    case "1":
    //        icon = "black";
    //        break;
    //    case "7":
    //        icon = "darkBlue";
    //        break;

    //    default:
    //        icon = "";
    //        break;
    //}
    return icon;


}

function getMarkerPopup(obj) {
    //create container
    let contentContainer = document.createElement("div");
    let contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("class", "chrContainer_fao_customInfobox");



    let coordinatesObj = coordsFAOdata.find(x => x.metaData.branchId == obj.branchId);

    let datas = coordsFAOdata.filter(value => value.long == coordinatesObj.long && value.lat == coordinatesObj.lat);


    if (datas.length > 1) {

        let contentCustomContainer = document.createElement("div");
        contentCustomContainer.setAttribute("class", "chrContainer_fao_customContainer");

        $.each(datas, function (index, val) {
            let contentCustomWrapper = document.createElement("div");
            contentCustomWrapper.setAttribute("class", "chrContainer_fao_customWrapper");
            constructInfoBox(contentCustomWrapper, val.metaData);
            contentCustomContainer.append(contentCustomWrapper);
        });

        contentWrapper.append(contentCustomContainer);
        contentContainer.append(contentWrapper);
    } else {
        contentWrapper.removeAttribute('class');
        contentWrapper.setAttribute("class", "chrContainer_fao_customInfobox chrContainer_fao_singleCombo");
        constructInfoBox(contentWrapper, obj);
        contentContainer.append(contentWrapper);
    }
    return contentContainer.innerHTML
}



function constructInfoBox(contentWrapper, metaData) {
    //infobox template
    contentWrapper.removeAttribute('class');
    contentWrapper.setAttribute("class", "chrContainer_fao_customInfobox chrContainer_fao_singleCombo");
    //name
    let contentName = document.createElement("h4");
    contentName.setAttribute("class", "chrContainer_fao_customInfobox_title");
    contentName.innerHTML = metaData.name;
    contentWrapper.append(contentName);

    //branch
    let contentBranch = document.createElement("div");
    contentBranch.setAttribute("class", "chrContainer_fao_customInfobox_branch");
    contentBranch.innerHTML = metaData.branchId;
    contentWrapper.append(contentBranch);

    var style = contentBranch.style;
    style.setProperty("--background", 'var(--chrFAO_' + getTheme(metaData.branchId) + ')');

    //address
    let officeDirections = document.createElement("a");
    let directionsLink = "https://www.google.com/maps/search/?api=1&query=";
    let directionsAddress =
        "C.H. Robinson " +
        metaData.address1 +
        " " +
        metaData.address2 +
        " " +
        metaData.city +
        " " +
        metaData.state +
        " " +
        metaData.postalCode +
        " " +
        metaData.country;
    let directions = directionsLink + directionsAddress;
    officeDirections.setAttribute("href", directions);
    officeDirections.setAttribute("target", 'blank');
    let contentAddress = document.createElement("div");
    contentAddress.setAttribute("class", "chrContainer_fao_customInfobox_address");
    let addressData = "";
    addressData += metaData.address1.length > 0 ? metaData.address1 + ", " : "";
    addressData +=
        metaData.address2.length > 0 ? "" + metaData.address2 + ", " : "";
    addressData += metaData.city.length > 0 ? metaData.city + ", " : "";
    addressData += metaData.state.length > 0 ? metaData.state + ", " : "";
    addressData +=
        metaData.postalCode.length > 0 ? metaData.postalCode + ", " : "";
    addressData +=
        metaData.country.length > 0
            ? (metaData.officeCountry = "" + metaData.country)
            : "";
    contentAddress.innerHTML = "<img src='/Presentation/chrobinson/fao/assets/img/icons/iconMarker.svg'> ";

    let contentAddressDetail = document.createElement("div");
    officeDirections.append(addressData);

    contentAddressDetail.append(officeDirections);
    contentAddress.append(contentAddressDetail);

    contentWrapper.append(contentAddress);

    //contact
    /*let contentContact = document.createElement("div");
    contentContact.setAttribute("class", "chrContainer_fao_customInfobox_contact");
    contentContact.innerHTML = "<img src='/Presentation/chrobinson/fao/assets/img/icons/iconCall.svg'>";

    let contentContactDetail = document.createElement("span");
    contentContactDetail.innerHTML =
        "<a href='tel:" + metaData.phoneMain + "'>" + metaData.phoneMain + "</a>";
    contentContact.append(contentContactDetail);
    contentWrapper.append(contentContact);*/
    //contact-phoneAfterHours
    if (metaData.phoneAfterHours && metaData.phoneAfterHours != "") {


        let contentContactAfterHours = document.createElement("div");
        contentContactAfterHours.setAttribute("class", "chrContainer_fao_customInfobox_contact");
        contentContactAfterHours.innerHTML = "<img src='/Presentation/chrobinson/fao/assets/img/icons/iconCall.svg'>";

        let contentContactDetailAfterHours = document.createElement("span");
        contentContactDetailAfterHours.innerHTML =
            "<a href='tel:" + metaData.phoneAfterHours + "'>" + metaData.phoneAfterHours + " (After Hours) </a>";
        contentContactAfterHours.append(contentContactDetailAfterHours);
        contentWrapper.append(contentContactAfterHours);
    }

    //contact-phoneTollFree
    if (metaData.phoneTollFree && metaData.phoneTollFree != "") {


        let contentContactTollFree = document.createElement("div");
        contentContactTollFree.setAttribute("class", "chrContainer_fao_customInfobox_contact");
        contentContactTollFree.innerHTML = "<img src='/Presentation/chrobinson/fao/assets/img/icons/iconCall.svg'>";

        let contentContactDetailTollFree = document.createElement("span");
        contentContactDetailTollFree.innerHTML =
            "<a href='tel:" + metaData.phoneTollFree + "'>" + metaData.phoneTollFree + " (Toll Free) </a>";
        contentContactTollFree.append(contentContactDetailTollFree);
        contentWrapper.append(contentContactTollFree);
    }

    //contact-fax
    if (metaData.fax && metaData.fax != "") {


        let contentFax = document.createElement("div");
        contentFax.setAttribute("class", "chrContainer_fao_customInfobox_contact");
        contentFax.innerHTML = "<img src='/Presentation/chrobinson/fao/assets/img/icons/fax.svg'>";

        let contentFaxDetail = document.createElement("span");
        contentFaxDetail.innerHTML =
            metaData.fax + " (Fax)";
        contentFax.append(contentFaxDetail);
        contentWrapper.append(contentFax);
    }




}

function showInfoBox(val) {
    //create container
    let contentContainer = document.createElement("div");
    let contentWrapper = document.createElement("div");
    contentWrapper.setAttribute("class", "chrContainer_fao_customInfobox");



    constructInfoBox(contentWrapper, val.metaData);
    contentContainer.append(contentWrapper);

    popup.setOptions({
        content: contentContainer.innerHTML,
        position: [val.long, val.lat]
    });

    popup.open(map);

}

$(function () {
    $(".chrContainer_fao_locationResults_slug").on("click", function (e) {
        let selectedLocation = e.currentTarget.getAttribute("data-val");
        $('.chrContainer_fao_locationResults_slug').removeClass('active');
        $(this).addClass('active');
        let metaDatas = coordsFAOdata.find(
            (x) => x.metaData.branchId == selectedLocation
        );

        if (metaDatas) {
            showInfoBox(metaDatas);
            map.setCamera({
                center: [metaDatas.long, metaDatas.lat],

                type: 'ease',
                duration: 200
            });

        }
        //  let metaData=coordsFAOdata
    });



});

