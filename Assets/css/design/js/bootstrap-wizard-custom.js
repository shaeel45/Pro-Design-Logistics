/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
// JavaScript Document
var submitted = false;
var ajaxSubmitError = "";
var loadingImage = "";
var CurrentStep = "";
var stepCount = 0;
$(document).ready(function () {
    "use strict";

    $('#chrwizard').bootstrapWizard({
        onInit: function (tab, navigation, index) {
            CurrentStep = $("#tab1").data("currentstep");
            if ($("#chrwizard").data("firststep") == "Personal Information") {
                var personalInfoFormPage = $("#tab1").data("personalinfoformpage");
                $("#tab1").load(personalInfoFormPage + " #PersonalInformation", function () {
                    ChangeNamesPersonalInfoFormPage();
                    AddStarAndParsleyGroup(index);
                    if (window._fn) { $('#FirstName').val(window._fn) };
                    if (window._ln) { $('#LastName').val(window._ln) };
                    if (window._email) { $('#Email').val(window._email) };
                    if (window._ph) { $('#Phone').val(window._ph) };
                    loadBackData();
                });
            } // if ($("#chrwizard").data("firststep") == "Personal Information")
            else if ($("#chrwizard").data("firststep") == "Select Service") {
                var selectServicePage = $("#tab1").data("selectservicepage");
                $("#tab1").load(selectServicePage + " #SelectService", function () {
                    InitializeSelectService();
                });
                if(stepCount < 1){
                    stepCount++;
                    //trackCustomEvent("RAQ Step 1 | Select Service");
                    //alert(_satellite);
                }
            }

        },
        onNext: function (tab, navigation, index) {
            CurrentStep = $("#tab" + (index + 1)).data("currentstep");
            if ($('.tab-pane#tab1').hasClass("active")) {
                $('.hero').slideUp();
            }
            if ($("#chrraq").parsley().validate({
                group: 'block-' + index
            })) {
                if ($("#tab" + (index + 1)).data("raq") == "shipmentDetails") {
                    var serviceValue = "";
                    if ($('#txtHiddenRaqServiceLineId').val().length > 0 && $('.chrwizard .services .service-option.active')) {
                        if ($("#recap1 p").length > 0) {
                            $("#recap2").show();

                            if ($(".recap-service")) {
                                $(".recap-service").remove();
                            }

                            serviceValue = "<p class='recap recap-value recap-service'>" + $('.chrwizard .services .service-option.active').find('h5').text() + "</p>";

                            $(".wizard-column #recap2 .recap-data").after(serviceValue);
                        }
                        else {
                            DisplayRecap1();

                            serviceValue = "<p class='recap recap-value recap-service'>" + $('.chrwizard .services .service-option.active').find('h5').text() + "</p>";

                            $(".wizard-column #recap1 .recap-data").after(serviceValue);
                        }

                        var shipmentFormPage = $('.chrwizard .services .service-option.active').data("shipmentformpage");
                        $("#tab" + (index + 1)).load(shipmentFormPage + " #ShipmentForm", function () {
                            ChangeNamesShipmentFormPage();

                            AddStarAndParsleyGroup(index);

                            if ($('.ac-location').length > 0) {
                                $(".ac-location").autocomplete({
                                    source: function (request, response) {
                                        $.ajax({
                                            url: "/api/custom/cities/lookup/" + request.term,
                                            dataType: "json",
                                            data: {},
                                            success: function (data) {
                                                response($.map(data.cities, function (item) {
                                                    var state = "";
                                                    if (typeof (item.adminDistrict) != "undefined") {
                                                        state = item.adminDistrict + ", ";
                                                    }

                                                    return {
                                                        label: item.name + ", " + state + item.countryName,
                                                        value: item.name + ", " + state + item.countryName
                                                    }
                                                }));
                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                alert("error");
                                            }
                                        });
                                    },
                                    minLength: 2,
                                    select: function (event, ui) {
                                        $("this").val(ui.item.id)
                                    }
                                });
                            }
                            if ($("input[name='AirServiceType']").length > 0) {
                                $("input[name='AirServiceType']").click(function () {
                                    if ($(this).val() == "Domestic Air") {
                                        $(".field[data-label='Shipping Frequency']").hide();
                                    } else {
                                        $(".field[data-label='Shipping Frequency']").show();
                                    }
                                });
                            }
                            loadBackData();
                        });

                        //}

                    }

                    if(stepCount < 2){
                        stepCount++;
                        trackCustomEvent("RAQ Step 2 | Shipment Details | " + $('#txtHiddenRaqServiceLine').val());
                    }

                } //if ($("#tab" + index).data("raq") == "selectService")
                else if ($("#tab" + (index + 1)).data("raq") == "personalInformation") {
                    if ($("#tab" + index).data("raq") == "shipmentDetails") {
                        $("#recap2").show();

                        if ($(".recap-shipment")) {
                            $(".recap-shipment").remove();
                        }

                        PopulateDataForRecap(index, "recap2");
                    }

                    var personalInfoFormPage = $("#tab" + (index + 1)).data("personalinfoformpage");
                    //$("#tab" + (index + 1)).load(personalInfoFormPage + " #PersonalInformation", function () {
                        $("#tab" + (index + 1)).load(personalInfoFormPage, function () {
                        ChangeNamesPersonalInfoFormPage();

                        AddStarAndParsleyGroup(index);

                        if (window._fn) { $('#FirstName').val(window._fn) };
                        if (window._ln) { $('#LastName').val(window._ln) };
                        if (window._email) { $('#Email').val(window._email) };
                        if (window._ph) { $('#Phone').val(window._ph) };
                        loadBackData();
                    });

                    if(stepCount < 3){
                        stepCount++;
                        trackCustomEvent("RAQ Step 3 | Personal Information | " + $('#txtHiddenRaqServiceLine').val());
                    }

                } //else if ($("#tab" + index).data("raq") == "personalInformation")
                else if ($("#tab" + (index + 1)).data("raq") == "selectService") {
                    if ($("#tab" + index).data("raq") == "personalInformation") {
                        DisplayRecap1();

                        PopulateDataForRecap(index, "recap1");
                    }

                    var selectServicePage = $("#tab" + (index + 1)).data("selectservicepage");
                    $("#tab" + (index + 1)).load(selectServicePage + " #SelectService", function () {

                        InitializeSelectService();
                    });


                } //else if ($("#tab" + index).data("raq") == "selectService")
            } // if ($("#chrraq").parsley().validate
            else {
                return false;
            }

        }, //onNext
        onFinish: function (tab, navigation, index) {
            submitted = true;
            ajaxSubmitError = $("#chrwizard").data("ajaxsubmiterror");
            loadingImage = $("#chrwizard").data("loadingimage");
            var response;
            if (typeof disableReCaptcha !== 'undefined') {
                response = "bypass";
            }else{
                response = grecaptcha.getResponse();
            } 
            if ($("#chrraq").parsley().validate({
                group: 'block-' + (index + 1) //index still the same as in shipment detail
            }) && response.length > 0) {
                $('.spanRecaptchaError').hide();
                $('.previous, .finish').addClass('disabled');

                if ($("#ShippingFrequencyId").val() != "") {
                    $('#txtHiddenRaqShippingFrequency').val($("#ShippingFrequencyId option:selected").text());
                }
                if ($("#QuantityUnitsId").val() != "") {
                    $('#txtHiddenRaqQuantityUnits').val($("#QuantityUnitsId option:selected").text());
                }

                if ($("#UnitOfWeightId").val() != "") {
                    $('#txtHiddenRaqUnitOfWeight').val($("#UnitOfWeightId option:selected").text());
                }

                if ($("#UnitOfDimensionId").val() != "") {
                    $('#txtHiddenRaqUnitOfDimension').val($("#UnitOfDimensionId option:selected").text());
                }

                if ($("#CountryId").val() != "") {
                    $('#txtHiddenRaqCountryName').val($("#CountryId option:selected").text());
                }


                if ($("#chrwizard").data("firststep") == "Personal Information") {
                    $("#ShipmentForm").before('<div id="LoadingImage3" style="width:100%; text-align:center"><img src="' + loadingImage + '" /></div>');
                    $("#ShipmentForm").hide();
                }
                else {
                    $("#PersonalInformation").before('<div id="LoadingImage3" style="width:100%; text-align:center"><img src="' + loadingImage + '" /></div>');
                    $("#PersonalInformation").hide();
                }

                var uri = '/api/custom/forms/submitraq/';
                var formData = getFormObj("chrraq");
                //console.log(formData);
                //alert(JSON.stringify(formData));

                $.ajax({
                    method: "POST",
                    url: uri,
                    data: formData,
                    dataType: "json"

                }).done(function (data) {
                    if (data != "ERROR") {
                        trackFormSubmission('RAQ - New');
                        window.location = "thank-you?submission_id=" + data;
                    }
                    else {
                        $("#LoadingImage3").hide();
                        $("#PersonalInformation").show();
                        $('.previous, .finish').removeClass('disabled');
                        alert(ajaxSubmitError);
                    }
                })
                    .fail(function () {
                        $("#LoadingImage3").hide();
                        $("#PersonalInformation").show();
                        $('.previous, .finish').removeClass('disabled');
                        alert(ajaxSubmitError);
                    });

                
                    if(stepCount < 4){
                        stepCount++;
                        trackCustomEvent("RAQ Step 4 | RAQ Submitted | " + $('#txtHiddenRaqServiceLine').val());
                    }

            }
            else {
                $('.spanRecaptchaError').show();
                return false;
            }
        },
        onTabClick: function (tab, navigation, index, clickedIndex) {
            if (clickedIndex > index) {
                return false;
            }
            CurrentStep = $("#tab" + (clickedIndex + 1)).data("currentstep");
            window.backData = getFormObj("chrraq");
        },
        onPrevious: function (tab, navigation, index) {
            CurrentStep = $("#tab" + (index + 1)).data("currentstep");
            window.backData = getFormObj("chrraq");
        }
    }); //$('#chrwizard').bootstrapWizard


    window._fn = getParameterByName("fn");
    window._ln = getParameterByName("ln");
    window._ph = getParameterByName("ph");
    window._email = getParameterByName("email");

    if (window._email != null) {
        var pdtabnurl = "https://go.pardot.com/l/119242/2016-06-27/31nmyw";

        pdtabnurl += "?first_name=" + encodeURI(window._fn);
        pdtabnurl += "&last_name=" + encodeURI(window._ln);
        pdtabnurl += "&email=" + encodeURI(window._email);
        pdtabnurl += "&phone=" + encodeURI(window._ph);
        pdtabnurl += "&site=" + encodeURI(window.location.hostname);
        pdtabnurl += "&url=" + encodeURI(digitalData.page.url);

        $('<iframe src="' + pdtabnurl + '" style="display:none;" width="1" height="1"></iframe>').appendTo('body');
    }

    //alert users about losing form data when leaving form
    $(window).on('beforeunload', function () {
        if ($('div#chrwizard').length && !$('.tab-pane#tab1').hasClass("active") && !submitted) {
            return "";
        }
    });

    $('#chrwizard .pager li.next, #chrwizard .pager li.previous, #chrwizard .pager li.finish').click(function (e) {
        e.preventDefault();
    });

}); //$(document).ready(function ()



function getFormObj(formId) {
    var formObj = {};
    var inputs = $('#' + formId).serializeArray();
    $.each(inputs, function (i, input) {
        if (input.name != "__VIEWSTATE" && input.name != "__EVENTVALIDATION" && input.name != "__VIEWSTATEGENERATOR") {
            formObj[input.name] = input.value;
            if (input.name == 'ContainerType') {
                if (input.value == 'Full Container Load (FCL)') {
                    formObj["FCLSelected"] = "true";
                }
                else if (input.value == 'Less Than Container Load (LCL)') {
                    formObj["LCLSelected"] = "true";
                }
            }
        }
    });
    formObj["Language"] = digitalData.site.language;

    return formObj;
}

function loadBackData() {
    if (window.backData) {
        for (i = 0; i < Object.keys(window.backData).length; i++) {
            var oKeys = Object.keys(window.backData);
            if (oKeys) {
                $("input[name='" + oKeys[i] + "']").val(window.backData[oKeys[i]]);
            }
        }
    }
}

function ChangeNamesShipmentFormPage() {

    $("#ShippingFrequencyId").attr("name", "ShippingFrequencyId");
    $("#QuantityUnitsId").attr("name", "QuantityUnitsId");
    $("#UnitOfWeightId").attr("name", "UnitOfWeightId");
    $("#UnitOfDimensionId").attr("name", "UnitOfDimensionId");
}

function ChangeNamesPersonalInfoFormPage() {

    $("#FirstName").attr("name", "FirstName");
    $("#LastName").attr("name", "LastName");
    $("#Email").attr("name", "Email");
    $("#Phone").attr("name", "Phone");
    $("#CompanyName").attr("name", "CompanyName");
    $("#Address").attr("name", "Address");
    $("#City").attr("name", "City");
    $("#State").attr("name", "State");
    $("#CountryId").attr("name", "CountryId");
    $("#HowHearId").attr("name", "HowHearId");
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function PopulateDataForRecap(index, recap) {
    $($("#tab" + index + " .data-label").get().reverse()).each(function (i) {

        var shipmentValue = "<p class='recap recap-label recap-shipment shipment-label" + (i + 1) + "'>" + $(this).attr('data-label') + "</p>";

        $(".wizard-column #" + recap + " .recap-data").after(shipmentValue);

        if (!$(this).val()) {
            $($(this).find('.data-field').get().reverse()).each(function (j) {

                if ($(this).is(':checkbox') || $(this).is(':radio')) {
                    if (!$(this).is(':checked')) {
                        return true;
                    }
                }

                //Truncate the value for the summary if value is more than 50 characters
                var fieldVal = $(this).val();
                if (fieldVal.length > 50) {
                    fieldVal = $(this).val().substring(0, 50) + '...';
                }

                if ($(this).is('select') && $("#" + this.id).val() != "") {
                    var shipmentValue2 = "<p class='recap recap-value recap-shipment'>" + $("#" + this.id + " option:selected").text() + "</p>";
                }
                else {
                    var shipmentValue2 = "<p class='recap recap-value recap-shipment'>" + fieldVal + "</p>";
                }


                $(".shipment-label" + (i + 1)).after(shipmentValue2);
            });
        }
    });
}

function DisplayRecap1() {
    $(".raq-form").addClass("col-md-9");
    $(".recap-title").show();
    $("#recap1").show();
    $("#recap2").hide();
    $("#recap2 .recap-shipment").remove();

    if ($(".recap-service")) {
        $(".recap-service").remove();
    }
}

function AddStarAndParsleyGroup(index) {
    $("#tab" + (index + 1) + " [required]").each(function (index) {
        var requiredId = $(this).attr("id");
        var labelText = $('label[for=' + requiredId + ']').text() + " *";
        $('label[for=' + requiredId + ']').text(labelText);

        $(this).before("<div class='error-msg-" + index + "'></div>");
        $(this).attr("data-parsley-errors-container", ".error-msg-" + index);
    });

    $("#tab" + (index + 1)).find('input').attr('data-parsley-group', 'block-' + (index + 1));
    $("#tab" + (index + 1)).find('textarea').attr('data-parsley-group', 'block-' + (index + 1));
    $("#tab" + (index + 1)).find('select').attr('data-parsley-group', 'block-' + (index + 1));
}

function InitializeSelectService() {
    var $tabs = $('.tab-pane');
    $tabs.each(function (index, fields) {
        $(fields).find('input').attr('data-parsley-group', 'block-' + (index + 1));
    });

    $("[required]").each(function (index) {
        $(this).before("<div class='error-msg-" + index + "'></div>");
        $(this).attr("data-parsley-errors-container", ".error-msg-" + index);
    });

    $('.service-option').click(function (e) {
        ServiceOptionSelected(e);
    });

    $('.service-option').on('keypress', function(e){
        if(e.keyCode == 13 || e.keyCode == 32){
            ServiceOptionSelected(e);
        }
    });

    $('.service-category').on('keypress', function(e){
       if(e.keyCode == 13 || e.keyCode == 32){
            var accordion = $(e.target).data('target');
            $(accordion).toggle('collapse');
	    e.preventDefault();
        }
    });

    var slid = getParameterByName('slid');
    if (slid != null) {
        $(".chrwizard .services .service-option[data-servicelineid='" + slid + "']").trigger("click");
        $('#chrwizard').bootstrapWizard('next');
    }
}

function ServiceOptionSelected(e){
        "use strict";

        $('.chrwizard .services .service-option').removeClass('active');
        $(e.target).closest('.service-option').addClass('active');
        $('#txtHiddenRaqServiceLineId').val($('.chrwizard .services .service-option.active').data("servicelineid"));								 								
        $('#txtHiddenRaqServiceLine').val($('.chrwizard .services .service-option.active h5').text());
        $('#txtHiddenRaqServiceType').val($('.chrwizard .services .service-option.active').closest('.panel').find('.panel-heading h4').text().trim());
}

function trackCustomEvent(name){
    if(window.adobeRsid){
        if(s_gi){
            var s=s_gi(window.adobeRsid);
            s.linkTrackVars='eVar69';
            s.eVar69=name;
            s.tl(true,'o','Custom Event',null,'navigate');
        }
    }
}