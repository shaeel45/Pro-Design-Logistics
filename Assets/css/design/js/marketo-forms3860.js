function fnLoadMktForm(formId, trkMessage, mktCookie, mkto_form_ty) {

    if (formId != '' && formId != '0000') {        
        MktoForms2.loadForm("//app-ab35.marketo.com", "313-RRT-629", formId, function (form) {//824-XEX-790
           
           // form.onValidate(function () {
           //     var formVals = form.vals();
            //    if (formVals.hasOwnProperty("MC_DOT_Number")) {
            //        if ((formVals.MC_DOT_Number.length < 6 || formVals.MC_DOT_Number.length > 8)) {
            //            
            //            form.submittable(false);
            //        }
             //       else {
             //           form.submittable(true);
             //       }
             //   }
             //   else {
                    
                  //  form.submittable(true);
             //   }
            //})
           // form.getFormElem().find('button[type="submit"]').text() - form submit button      
            form.onSubmit(function (form) { 
                form.addHiddenFields({ "utmsource": localStorage.getItem('chr-utm_source'), "utmmedium": localStorage.getItem('chr-utm_medium'), "utmcontent": localStorage.getItem('chr-utm_content') ,"utmcampaign": localStorage.getItem('chr-utm_campaign'), "utmterm": localStorage.getItem('chr-utm_term')});
            });     

            // Add an onSuccess handler
            form.onSuccess(function(values, followUpUrl) {   
                if(trkMessage != ''){             
                    trackFormSubmission(trkMessage);
                }
                if(mktCookie){
                    setCookieAppend('wpMktForm',mktCookie,365);    
                }
                if (typeof fnMarketoTrackingScript === "function") { 
                    fnMarketoTrackingScript();
                }                
                if(mkto_form_ty.hasClass('mkto-form-url')){
                    if(mkto_form_ty.find('p').text() != ''){
                        location.href = mkto_form_ty.find('p').text();// window.open(mkto_form_ty.find('p').text(), mkto_form_ty.find('span').text());
                    } else {
                        location.href = location.href;
                    }
                } else {
                    // Get the form's jQuery element and hide it
                    form.getFormElem().hide();
                    mkto_form_ty.removeClass('d-none');
                }

                // Return false to prevent the submission handler from taking the lead to the follow up url
                return false;
            });
            if (typeof fnMarketoAdditionalScripts === "function") {
                fnMarketoAdditionalScripts();
            } 
        });
    }
}

function fnTariffMktForm(formId) {
    MktoForms2.loadForm("//app-ab35.marketo.com", "313-RRT-629", formId, function (form) {

        document.querySelector('.hts-container').classList.remove('none');
        form.onValidate(function () {
            var vals = form.vals();
            var htsContainer = document.querySelector('.hts-container');
            if (vals.mkto_htsNumbers === '') {
                form.submittable(false);
                var ele = document.getElementById('hts-empty-error');
                htsContainer.classList.add('hts-warning');
                ele.classList.remove('none');
            } else {
                htsContainer.classList.remove('hts-warning');
                if (!(document.getElementById('hts-incorrect-format').classList.contains("none"))) {
                    form.submittable(false);
                }
                else {
                    //form.submittable(true);
                }
            }
        });

        //Add an onSuccess handler
        form.onSuccess(function (values, followUpUrl) {
            var htsCodes = form.vals();
            var hts = htsCodes.mkto_htsNumbers;

            document.cookie = "htscodes=" + hts + ";path=/";
            var resultPageUrl = document.getElementById('result-page-url').value;

            setTimeout(function () { location.href = resultPageUrl }, 1000);
            return false;
        });
        // form.onSubmit(function (form) {
        //     form.vals({ "mkto_leadGenSolution": "abc" })
        // });

    });
}

function fnIncludeReCaptcha(key){            
                var userConfig = {
                    apiKeys: {
                        recaptcha: key 
                    },
                    fields: {
                        recaptchaFinger: "mkto_reCAPTCHAUserFingerprint"
                    },
                    actions: {
                        formSubmit: "form"
                    }
                };

                /* --- NO NEED TO TOUCH BELOW THIS LINE --- */

                MktoForms2.whenReady(function (mktoForm) {

                    var formEl = mktoForm.getFormElem()[0],
                        submitButtonEl = formEl.querySelector("button[type='submit']");

                    /* pending reCAPTCHA widget ready */
                    submitButtonEl.disabled = true;

                    /* pending reCAPTCHA verify */
                    mktoForm.submittable(false);
                    mktoForm.locked = false;

                    mktoForm.onValidate(function (native) {

                        var formVals = mktoForm.vals();
                        if (formVals.hasOwnProperty("MC_DOT_Number")) {
                            if ((formVals.MC_DOT_Number.length < 6 || formVals.MC_DOT_Number.length > 8)) {                               
                                mktoForm.submittable(false);
                            }                          
                        }

                        if (!native) return;

                        grecaptcha.ready(function () {
                            grecaptcha.execute(userConfig.apiKeys.recaptcha, {
                                action: userConfig.actions.formSubmit
                            })
                                .then(function (recaptchaFinger) {
                                    var mktoFields = {};
                                    if (mktoForm.locked == false) {
                                        console.log("primary recaptcha response resolved");
                                        mktoForm.locked = true;
                                        mktoFields[userConfig.fields.recaptchaFinger] = recaptchaFinger;
                                        mktoForm.addHiddenFields(mktoFields);
                                        mktoForm.submittable(true);
                                        mktoForm.submit();
                                    } else {
                                        console.log("secondary recaptcha response resolved");
                                    }
                                });
                        });
                    });
                });

                var recaptchaListeners = {
                    ready: function () {
                        MktoForms2.whenReady(function (mktoForm) {
                            var formEl = mktoForm.getFormElem()[0],
                                submitButtonEl = formEl.querySelector("button[type='submit']");

                            submitButtonEl.disabled = false;
                        });
                    }
                };
                Object.keys(recaptchaListeners).forEach(function globalize(fnName) {
                    window["grecaptchaListeners_" + fnName] = recaptchaListeners[fnName];
                });

                /* inject the reCAPTCHA library */
                recaptchaLib = document.createElement("script");
                recaptchaLib.src = "https://www.google.com/recaptcha/api.js?render=" + userConfig.apiKeys.recaptcha + "&onload=grecaptchaListeners_ready";
                document.head.appendChild(recaptchaLib);       
}

function fnLoadMktoFormWebinar(formId, trkMessage, pagePath, includeRecaptcha) {
    if (formId != '') {
        MktoForms2.loadForm("//app-ab35.marketo.com", "313-RRT-629", formId, function (form) {//824-XEX-790

            // form.getFormElem().find('button[type="submit"]').text() - form submit button           
            form.onSubmit(function (form) {
                form.addHiddenFields({ "utmsource": localStorage.getItem('chr-utm_source'), "utmmedium": localStorage.getItem('chr-utm_medium'), "utmcontent": localStorage.getItem('chr-utm_content'), "utmcampaign": localStorage.getItem('chr-utm_campaign'), "utmterm": localStorage.getItem('chr-utm_term') });
            });
            // Add an onSuccess handler
            form.onSuccess(function (values, followUpUrl) {
                if (trkMessage != '') {
                    trackFormSubmission(trkMessage);
                }

                if (typeof fnMarketoTrackingScriptWebinar === "function") {
                    fnMarketoTrackingScriptWebinar();
                } 

                if (pagePath != '') {
                    setTimeout(function () { location.href = '/' + digitalData.site.language + pagePath + '/?rsid=' + digitalData.page.scId; }, 1000);
                }
                else {
                    $('#mktoForm_' + formId).replaceWith("<h2 id='thankyou'>Thank you for signing up!</h2>");
                }

                // Return false to prevent the submission handler from taking the lead to the follow up url
                return false;
            });


        });
    }
    if(includeRecaptcha == "True"){
        fnIncludeReCaptcha('6LcLaEAaAAAAALJh7HDUmhTEubx-XkblR2_udIqi');
    }
}

var elHdnLeadGenForm = document.getElementById('hdnLeadGenForm');
if (typeof(elHdnLeadGenForm) != 'undefined' && elHdnLeadGenForm != null)
{
  fnIncludeReCaptcha(elHdnLeadGenForm.value);
}

$('.mkto-form').each(function(){
    var mkt_form = $(this).find('form');
    var mkt_fid = mkt_form.attr('data-mkt-fid');
    var mkt_trk = mkt_form.attr('data-mkt-trk');
    var mkt_rcp = mkt_form.attr('data-mkt-rcp');
    var mkt_cookie = mkt_form.attr('data-mkt-cookie');
    var mkto_form_ty = $(this).find('.mkto-form-ty');
    
    fnLoadMktForm(mkt_fid, mkt_trk, mkt_cookie, mkto_form_ty);

    fnIncludeReCaptcha('6LcLaEAaAAAAALJh7HDUmhTEubx-XkblR2_udIqi');
});

function setCookieAppend(name,value,days) {
    var wpCookie = getCookie(name);
    if(wpCookie != null){
        value = wpCookie+'|'+value;
    }
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}