// JavaScript Document

$(document).ready(function () {
    "use strict";

    // AOS.init({
    //     easing: 'ease-out-back',
    //     duration: 1000,
    //     disable: 'mobile'
    // });

    $(".half-blue").closest("a").css("text-decoration", "none");

    function ele_adjust() {
        var search = $('#txtSearch');

        //if media query screen width is less than 768 (mobile size)
        if (search.css("z-index") === "3") {

            //Make search field visible and full width
            if (search.hasClass('desktop') || (!search.hasClass('mobile') && !search.hasClass('desktop'))) {
                search.addClass('visible').removeClass('hidden').removeClass('desktop').addClass('mobile');
            }


            //Remove video from mobile

        }
        else { //if media query screen width is over 768 (desktop size)

            //Hide search box
            if (search.hasClass('mobile') || (!search.hasClass('mobile') && !search.hasClass('desktop'))) {
                search.addClass('desktop').removeClass('mobile').addClass('hidden').removeClass('visible');
            }

            //Add video to DOM
            $('.chr-video').each(function () {
                if ($(this).find('video').length < 1) {
                    $(this).append("<video playsinline autoplay muted loop poster='' class='bgvid'><source src='" + $(this).data("url") + "' type='video/mp4'></video>");
                }
            });
        }
    }

    ele_adjust();

    //Check for mobile/desktop size every time the browser is resized
    $(window).resize(ele_adjust);

    //auto-increment ID for each slider added to page
    var i = 0;
    $('.carousel').not('.multi-item-carousel').each(function () {
        i++;
        var newID = 'chr-carousel-' + i;
        $(this).attr('id', newID);
        $(this).find('.carousel-indicators li').attr('data-bs-target', '#' + newID);
        $(this).find('.carousel-indicators button').attr('data-bs-target', '#' + newID);
        $(this).find('button').attr('data-bs-target', '#' + newID);
    });

    var myCarousel = document.querySelector('.multi-item-carousel');
    if (myCarousel != null) {
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: false
        });
    }

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });

    //Set last nav dropdown to align right
    $('.navbar-mainnav .nav .dropdown>.dropdown-menu').last().removeClass('dropdown-menu-left').addClass('dropdown-menu-right');

    //rotate caret for top nav
    $('.toplinks .dropdown .dropdown-toggle').click(function () {
        $(this).find('.caret').toggleClass('rotate-90');
    });

    //rotate caret for mobile nav
    $('.glyph-wrap').click(function () {
        $(this).find('.glyphicon-play').toggleClass('rotate-90');
    });


    // Fix element clicking in bootstrap dropdown forms
    $('.dropdown input, .dropdown label, .dropdown select').click(function (e) {
        e.stopPropagation();
    });

    //Search button onclick animation
    $("#btnSearchSubmit").click(function () {

        var search = $('#txtSearch');
        var txtValue = search.val().trim();
        //http://jsfiddle.net/X5mP3/
        //if (search.hasClass('visible') && search.val().length === 0) {
        if (search.hasClass('visible')) {
            if (txtValue.length === 0) {
                search.animate({ "width": "0px" },
                    "slow",
                    function () {
                        search.addClass('hidden');
                    })
                    .removeClass('visible');
            } else {
                var searchUrl = $("#btnSearchSubmit").data("searchurl");

                window.location = searchUrl + txtValue;
                return false;

            }

        } else {
            search.animate({ "width": "100px" }, "slow").addClass('visible').removeClass('hidden').focus();
        }

        //stop page refresh and allow animation to happen if search box is empty
        if (search.val().length === 0) {
            return false;
        }

    });

    $("#txtSearch").keydown(function (e) {

        if (e.keyCode === 13) { //enter key
            var search = $('#txtSearch');
            var txtValue = search.val().trim();
            if (txtValue.length != 0) {
                var searchUrl = $("#btnSearchSubmit").data("searchurl");

                window.location = searchUrl + txtValue;
                return false;
            }
        }
    });

    $("#btnTrackShipment").click(function (e) {
        trackShipment();
    });
    $("#txtTrackShipment").keydown(function (e) {
        if (e.keyCode === 13) { //enter key
            e.preventDefault();
            trackShipment();
        }
    });

    $('.btn-quick-form').click(function (e) {
        e.preventDefault();
        var completeForm = true;
        var qs = "?";
        $(this).siblings('input').each(function () {
            if ($(this).val().length === 0) {
                completeForm = false;
            } else {
                qs += $(this).attr('name') + "=" + $(this).val() + "&";
            }
        });
        if (!completeForm) {
            //error message
            alert('error');
            return false;
        }
        var url = $(this).data('url');
        window.location = url + qs.substring(0, qs.length - 1);
    });

    //$('#btnSearchSubmit').click(function (e) {
    //    var searchUrl = $("#btnSearchSubmit").data("searchurl");
    //    window.location = searchUrl;
    //});

    //Box Grid
    if ($('.leaderShipwrapper').length) {
        $(window).resize(function () {
            $(".leaderData").removeClass("active");
            $('.description-wrapper').hide();
        });
        $('.leader').hover(function () {
            $(this).find('.content').css('opacity', '1');
            var ht = $(this).find('.content').height();
            $(this).find('.content').width(ht);
            $(this).find('img').css('opacity', '.2');
        }, function () {
            $(this).find('.content').css('opacity', '0');
            $(this).find('img').css('opacity', '1');
        });
        $('.leader').click(function () {
            if ($(this).find('.colored-box').length) { return; }
            var $me = $(this);
            if ($(this).find('.active').length) {
                $('.leaderData.active').removeClass('active');
                $(".description-wrapper").slideUp('fast');
                return;
            }
            $('.leaderData.active').removeClass('active');
            $me.find('.leaderData').addClass('active');
            //find where current item is
            //get number per row

            var windowWidth = $(window).width();
            var divCountInSingleRow = 0;
            if (window.matchMedia("(min-width: 991px)").matches) {
                //alert(matchMedia);
                divCountInSingleRow = 5;
            } else if (window.matchMedia("(min-width: 767px)").matches) {
                //alert('991');
                divCountInSingleRow = 4;
            } else {
                //alert('768');
                divCountInSingleRow = 2;
            }
            //alert(divCountInSingleRow);

            var leaderWidth = $('.leaderData').width();
            var myWidth = (leaderWidth * divCountInSingleRow) + ((divCountInSingleRow - 2) * 30);
            //alert(myWidth);
            $('.leaderDescription').width(myWidth);

            var currentIndex = $me.attr('data-count');
            var totalBoxes = $('.leader').length;
            var row = Math.floor(currentIndex / divCountInSingleRow);
            var last = (currentIndex % divCountInSingleRow === 0);
            if (!last) {
                row++;
            }

            var insertAfterBox = Math.min(row * divCountInSingleRow, totalBoxes);
            $(".description-wrapper").slideUp('fast', function () {

                UpdateData($me.find('.leaderData'));
                MoveDescriptionDiv($(".leader[data-count='" + insertAfterBox + "']"));

            });

        });
    }

    //$('.btn-signup-pd').click(function () {
    //    var valid = false;
    //    var error = false;
    //    var url = $(this).attr('pd-url') + "?";

    //    $(this).parent().parent().find('input').each(function () {
    //        if ($(this).attr('type') === 'email') {
    //            valid = validateEmail($(this).val());
    //            if (!valid) { $(this).css('border', '1px solid red'); } else { $(this).css('border', ''); }

    //        } else if ($(this).attr('type') === 'checkbox') {
    //            valid = $(this).is(':checked');
    //            if (!valid) { $(this).parent().css('border', '1px solid red'); } else { $(this).parent().css('border', ''); }
    //        }

    //        if (valid) {
    //            url += $(this).attr('pd-field-name') + "=" + $(this).val() + "&";
    //        } else {
    //            error = true;
    //        }

    //    });

    //    if (!error) {
    //        url += "site=" + window.location.hostname;
    //        url += "&url=" + window.location.href;
    //        url += "&language=" + digitalData.page.language;
    //        switch (digitalData.page.region) {
    //            case 'chrobinsonsouthamerica':
    //                url += "&region=South%20America";
    //                break;
    //            case 'chrobinsonasia':
    //                url += "&region=Asia";
    //                break;
    //            case 'chrobinsoneu':
    //                url += "&region=Europe";
    //                break;
    //            default:
    //                url += "&region=North%20America";
    //        }
    //        url += "&form=Email%20News";


    //        $('<iframe src="' + url + '" style="display:none;" width="1" height="1"></iframe>').appendTo('body');

    //        //$("#signup-form").hide();
    //        //$("#signup-thankyou").show();

    //        $(this).parent().parent().parent().find("#signup-form").hide();
    //        $(this).parent().parent().parent().find("#signup-thankyou").show();
    //    }

    //    return false;

    //});
    //incoterms
    //Show Banner
    $(".main_image .desc").show(); //Show Banner
    $(".main_image .block").animate({ opacity: 1.0 }, 1); //Set Opacity

    //Click and Hover events for thumbnail list
    $(".image_thumb ul li:first").addClass('active');
    $(".image_thumb ul li").click(function () {
        //Set Variables
        var term = $(this).find('.term').html(); //Get Alt Tag of Image
        var imgDesc = $(this).find('.block').html(); 	//Get HTML of block
        var imgDescHeight = $(".main_image").find('.block').height(); //Calculate height of block	

        if ($(this).is(".active")) {  //If it's already active, then...
            return false; // Don't click through
        } else {
            //Animate the Teaser				
            $(".main_image .block").animate({ opacity: 0, marginBottom: -imgDescHeight }, 250, function () {
                $(".main_image .block").html(imgDesc).animate({ opacity: 1.0, marginBottom: "0" }, 250);
                $(".main_image .term").html(term);
            });
        }

        $(".image_thumb ul li").removeClass('active'); //Remove class of 'active' on all lists
        $(this).addClass('active');  //add class of 'active' on this list only
        return false;

    }).hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    //Toggle Teaser
    $("a.collapse").click(function () {
        $(".main_image .term .block").slideToggle();
        $("a.collapse").toggleClass("show");
    });

    //incoterms
    if ($('#incoterms').length) {
        //Show Banner
        $(".main_image .desc").show(); //Show Banner
        $(".main_image .block").animate({ opacity: 1.0 }, 1); //Set Opacity

        //Click and Hover events for thumbnail list
        $(".image_thumb ul li:first").addClass('active');
        $(".image_thumb ul li").click(function () {
            //Set Variables
            var term = $(this).find('.term').html(); //Get Alt Tag of Image
            var imgDesc = $(this).find('.block').html(); //Get HTML of block
            var imgDescHeight = $(".main_image").find('.block').height(); //Calculate height of block	

            if ($(this).is(".active")) { //If it's already active, then...
                return false; // Don't click through
            } else {
                //Animate the Teaser				
                $(".main_image .block").animate({ opacity: 0, marginBottom: -imgDescHeight }, 250, function () {
                    $(".main_image .block").html(imgDesc).animate({ opacity: 1.0, marginBottom: "0" }, 250);
                    $(".main_image .term").html(term);
                });
            }

            $(".image_thumb ul li").removeClass('active'); //Remove class of 'active' on all lists
            $(this).addClass('active'); //add class of 'active' on this list only
            return false;

        }).hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        //Toggle Teaser
        $("a.collapse").click(function () {
            $(".main_image .term .block").slideToggle();
            $("a.collapse").toggleClass("show");
        });
    }

});

//text carousel - set all slide heights to tallest slide
function setCarouselHeight(carouselclass) {
    $(carouselclass).each(function () {
        var slideHeight = [];
        $(this).find('.carousel-item').each(function () {
            // add all slide heights to an array
            slideHeight.push($(this).height());
        });

        // find the tallest item
        var max;
        max = Math.max.apply(null, slideHeight);

        // set the slide's height
        //$(this).find('.carousel-text').each(function()
        //{
        $(this).css('height', max + 'px');
        //});
    });
}

$(document).ready(function () {
    setCarouselHeight('.carousel-text');
});

$(window).resize(function () {
    setCarouselHeight('.carousel-text');
});

//image carousel - set all slide heights to tallest slide
function setCarouselImageHeight(carouselclass) {
    $(carouselclass).each(function () {
        var slideHeight = [];
        $(this).find('.carousel-item').each(function () {
            // add all slide heights to an array
            slideHeight.push($(this).outerHeight());
        });

        // find the tallest item
        var max;
        max = Math.max.apply(null, slideHeight);

        // set the slide's height
        //$(this).find('.carousel-text').each(function()
        //{
        $(this).find('.item-content').css('height', max + 'px');
        //});
    });
}

$(document).ready(function () {
    setCarouselImageHeight('.carousel-image');
});

$(window).resize(function () {
    setCarouselImageHeight('.carousel-image');
});

//Track Shipment
function trackShipment() {
    var trackNum = $("#txtTrackShipment").val();
    var trackUrl = $("#btnTrackShipment").data("url");
    window.open(trackUrl + trackNum);
}


//Box Grid
function MoveDescriptionDiv(insertAfter) {
    var descriptionDiv = $(".description-wrapper");
    insertAfter.after(descriptionDiv);
    descriptionDiv.slideDown();
}
function UpdateData(thisElement) {
    var descriptionDiv = $(".description-wrapper");
    // Update our data
    $(descriptionDiv).find('.leaderFname').text(unescapeHTML($(thisElement).attr('data-Fname')));
    $(descriptionDiv).find('.leaderLname').text(unescapeHTML($(thisElement).attr('data-Lname')));
    $(descriptionDiv).find('.leaderTitle').text(unescapeHTML($(thisElement).attr('data-title')));
    $(descriptionDiv).find('.leaderProfile').empty().append($('<div />').html($(thisElement).attr('data-profile')).text());
}
function unescapeHTML(html) {
    var div = document.createElement("DIV");
    div.innerHTML = html;
    return ("innerText" in div) ? div.innerText : div.textContent; // IE | FF
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//Find an Office
var input = document.getElementById("txtOfficeSearch");
if (input) {
    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keydown", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("btnOfficeSearch").click();
        }
    });
}


$(document).ready(function () {
    if ($('#fao')) {
        $(document).on("click", ".office-result", function () {
            $('.office-result').removeClass('active');
            $(this).addClass('active');
        });

        $('.office-result').click(function (event) { $("[title*='" + $(this).find('.office-name').text() + $(this).find('.office-type span').text() + "']").trigger('click') });

    }

});

function mapClick(branchId) {
    if ($('#fao')) {
        $(".office-result").removeClass('active');
        if (!$("#" + branchId).hasClass("clicked")) {
            $("#office-results").animate({ scrollTop: $("#office-results").scrollTop() + ($("#" + branchId).offset().top - $("#office-results").offset().top) }, 1000);
        }

        $("#" + branchId).addClass('active');
        $(".office-result").removeClass('clicked');
    }
}

let utmSource = "printpdf";
let utmMedium = "web";
let utmContent = "";
let pageTitle = digitalData.page.name;
if (pageTitle) {
    var utmCampaign = pageTitle.replace(/\s+/g, '-').toLowerCase();
}
function fnDownloadPDF(include, exclude, docTitle, isHtml) {
    fnDownloadPDF(include, exclude, docTitle, isHtml, 'chr');
}
function fnDownloadPDF(include, exclude, docTitle, isHtml, brand) {
    var $btn = $('.btn-blue-downloadPdf');
    var btnText = $btn.text();
    $btn.attr('disabled', 'disabled').text($btn.attr('data-text'));
    setTimeout(function () { $btn.removeAttr('disabled').text(btnText); }, 4000);
    if (isHtml) {
        var baseUrl = window.location.origin;
        var uri = '/api/custom/downloadpdfcontent';
        var formData = $(include).wrap('<div/>').parent().html();//$('.container-fluid').html();
        $(include).unwrap();
        if (exclude != '') {
            var $formData = $(formData).find(exclude).remove().end();
            if ($formData.find('.vidyard-player-container').length > 0) {
                var videoImage = $formData.find('img').attr('src');
                if (videoImage != null) {
                    $formData.find('.vidyard-player-container').html('<img style="width: 100%;" src="' + videoImage + '" /><br/>');
                }
            }
            formData = $formData.wrap('<div/>').parent().html();
            if (window.location.href.indexOf('/recipes/') > 0) {
                formData = formData + '<h5>For more fresh recipes visit RobinsonFresh.com/Recipes</h5>';
            }
        }
        var temp = document.createElement('div');
        temp.className = "pdf-links"
        temp.innerHTML = formData;
        var pdfLinks = temp.querySelectorAll('a');
        var utmParamQueryString;
        utmParamQueryString = 'utm_source=' + utmSource;
        utmParamQueryString += '&utm_medium=' + utmMedium;

        pdfLinks.forEach(function (item) {
            if (item.href.indexOf('/') === 0 || item.href.indexOf(location.host) !== -1) {
                if (item.href.indexOf('?') === -1) {
                    item.href += '?';
                } else {
                    item.href += '&';
                }
                if (item.innerText) {
                    var itemText = item.innerText.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

                    itemText = itemText.replace(/\s+/g, '-').toLowerCase();

                    utmContent = '&utm_content=' + itemText;
                }
                item.href += utmParamQueryString + utmContent + '&utm_campaign=' + utmCampaign;

            }
        });
        var output = temp.innerHTML;
        var linkTags = '';
        var links = window.document.getElementsByTagName('link');
        $('link[rel="stylesheet"]').each(function () {
            linkTags += '<link href="' + $(this).attr('href') + '" rel="stylesheet">';  // this is your href for the link tag in the loop
        });
        // document.documentElement.innerHTML.replace(/^[\s\S]*<head.*?>|<\/body>[\s\S]*$/ig, '')
        var body = '<html lang="en-us" xmlns="http://www.w3.org/1999/xhtml"><head>' + linkTags + '</head>' +
            '<body><div id="MainPanel">' + output + '</div></body></html>';

        var bodyEncoded = $("<div/>").text(body).html();

        trackInsightsDownload('');
        $.ajax({
            method: "POST",
            url: uri,
            data: { html: bodyEncoded },
            dataType: "json",
            success: function (data) {
                window.location.href = uri + '?fileGuid=' + data.FileGuid
                    + '&filename=' + docTitle + '&brand=' + brand + '&baseUrl=' + baseUrl;
            }
        });
    } else {
        //trackInsightsDownload('');
        //var currentUrl = window.location.href;
        //window.location.href = '/api/custom/downloadpdfdocument?include=' + include + '&exclude=' + exclude + '&docTitle=' + docTitle + '&brand=' + brand + '&url=' + currentUrl;
    }
}
function fnSocialSharing(key) {
    var shareUrl = '';
    if (key == 'in') {
        shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + window.location.href + '&amp;title=' + document.querySelector('.page-title-content').textContent + '&amp;summary=' + document.querySelector("meta[name='description']").getAttribute('content') + '&amp;source=';
    } else if (key == 'tw') {
        shareUrl = 'https://twitter.com/intent/tweet?text=' + document.querySelector('.page-title-content').textContent + '&amp;url=' + window.location.href;
    } else if (key == 'fb') {
        shareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
    }
    popupClickSocial(400, 300, shareUrl);
    return false;
}
function popupClickSocial(winWidth, winHeight, url) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

function shareLink(e, webinarUrl) {
    e.preventDefault();
    var copyText = document.getElementById("txtShareLink");
    copyText.style.display = "block";
    copyText.value = webinarUrl;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copyText.style.display = "none";
    document.getElementsByClassName("tooltip-text")[0].innerText = document.getElementsByClassName("tooltip-text-copied")[0].innerText;
}
function outFunc() {
    var tooltip = document.getElementsByClassName("tooltip-text")[0];
    tooltip.innerHTML = document.getElementsByClassName("tooltip-text-copy")[0].innerText;
}
/* webinar */
function fn_SocialSharing(e, key, webinarUrl) {
    e.preventDefault();
    var shareUrl = '';
    var desc = '';
    if (document.querySelector("meta[name='description']") != null) {
        desc = document.querySelector("meta[name='description']").getAttribute('content');
    }

    if (key == 'in') {
        shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + webinarUrl + '&title=' + document.querySelector('h1').textContent + '&summary=' + desc + '&source=';
    } else if (key == 'tw') {
        shareUrl = 'https://twitter.com/intent/tweet?text=' + document.querySelector('h1').textContent + '&url=' + webinarUrl;
    } else if (key == 'fb') {
        shareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + webinarUrl;
    } else if (key == 'em') {
        getMailtoUrl(document.querySelector('h1').textContent, webinarUrl);
        return false;
    }
    popupClickSocial(400, 300, shareUrl);
    return false;
}
function popupClickSocial(winWidth, winHeight, url) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open(url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
function getMailtoUrl(subject, body) {
    var args = [];
    if (typeof subject !== 'undefined') {
        args.push('subject=' + encodeURIComponent(subject));
    }
    if (typeof body !== 'undefined') {
        args.push('body=' + encodeURIComponent(body))
    }
    var url = 'mailto:';
    if (args.length > 0) {
        url += '?' + args.join('&');
    }
    window.location.href = url;
}

/* end webinar */

/* Resource Aggragetor */
$(document).ready(function () {
    //var maxHeight_Res = 0;
    //$('.res-content').each(function () {
    //    if ($(this).height() > maxHeight_Res) {
    //        maxHeight_Res = $(this).height();
    //    }
    //});
    //$('.res-content').height(maxHeight_Res);
    $('.resource-aggregator-pagination a').click(function () {
        fnGetResourceAggregator(this);
    });
});

function fnGetResourceAggregator(elem) {
    var $divResAggr = $(elem).parent().parent();
    var url = '/api/custom/resourceaggregatorpager';
    var dataToPost = { pageNumber: $(elem).attr('value'), rcParameters: $(elem).parent().parent().find('.rcParameters').val() };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(dataToPost),
        //   dataType: "json",
        cache: false,
        contentType: "application/jsonrequest; charset=utf-8",
        success: function (data) {
            if (String(data) != "") {
                $divResAggr.find('.row:last').after('<div class="row">' + $(data).find('.row').html() + '</div>');
                if ($(data).find('.resource-aggregator-pagination').length > 0) {
                    $divResAggr.find('.resource-aggregator-pagination a').attr('value', $(data).find('.resource-aggregator-pagination a').attr('value'));
                } else {
                    $divResAggr.find('.resource-aggregator-pagination a').hide();
                }
            }
        }
    });
}

fnFormatLocalTime(document.getElementsByClassName('res-date'));
fnFormatLocalTime(document.getElementsByClassName('m-res-date'));
fnFormatLocalDay(document.getElementsByClassName('m-res-day'));
fnFormatLocalTimeBothDateTime(document.getElementsByClassName('res-bothdatetime'));
fnFormatLocalTimeOnlyDate(document.getElementsByClassName('res-onlydate'));
fnFormatLocalTimeOnlyTime(document.getElementsByClassName('res-onlytime'));

function fnFormatLocalTime(rDates) {
    var DateTime = luxon.DateTime;
    for (var i = 0; i < rDates.length; i++) {
        var rDate = rDates.item(i).getAttribute("data-date");
        if (rDate !== null) {
            //var m = moment(rDate);
            //var tzName = moment.tz.guess();
            //rDates.item(i).innerHTML = m.format('LLL') + " " + moment().tz(tzName).format('z');
            var wDate = DateTime.fromISO(rDate);
            //rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toFormat('MMMM dd, yyyy HH:mm');
            rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toLocaleString(DateTime.DATETIME_FULL);

        }
    }
}

function fnFormatLocalTimeBothDateTime(rDates) {
    var DateTime = luxon.DateTime;
    for (var i = 0; i < rDates.length; i++) {
        var rDate = rDates.item(i).getAttribute("data-date");
        if (rDate !== null) {
            var wDate = DateTime.fromISO(rDate);
            var timeFormat = { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
            rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toLocaleString(DateTime.DATE_FULL) + " | " + wDate.setLocale(digitalData.site.language).toLocaleString(timeFormat);
        }
    }
}

function fnFormatLocalTimeOnlyDate(rDates) {
    var DateTime = luxon.DateTime;
    for (var i = 0; i < rDates.length; i++) {
        var rDate = rDates.item(i).getAttribute("data-date");
        if (rDate !== null) {
            var wDate = DateTime.fromISO(rDate);

            rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toLocaleString(DateTime.DATE_FULL);
        }
    }
}

function fnFormatLocalTimeOnlyTime(rDates) {
    var DateTime = luxon.DateTime;
    for (var i = 0; i < rDates.length; i++) {
        var rDate = rDates.item(i).getAttribute("data-date");
        if (rDate !== null) {
            var wDate = DateTime.fromISO(rDate);
            var timeFormat = { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
            rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toLocaleString(timeFormat);
        }
    }
}

function fnFormatLocalDay(rDates) {
    var DateTime = luxon.DateTime;
    for (var i = 0; i < rDates.length; i++) {
        var rDate = rDates.item(i).getAttribute("data-date");
        if (rDate !== null) {
            // var m = moment(rDate);
            //// var tzName = moment.tz.guess();
            // rDates.item(i).innerHTML = m.format("dddd");

            var wDate = DateTime.fromISO(rDate);
            rDates.item(i).innerHTML = wDate.setLocale(digitalData.site.language).toFormat('cccc');
        }
    }
}
/* end Resource Aggregator */

$("#searchInput").keydown(function (e) {
    if (e.keyCode === 13) { //enter key
        var search = $('#searchInput');
        var txtValue = search.val().trim();

        if (txtValue.length != 0) {
            var searchUrl = $("#searchSubmitMegaNav").data("searchurl");
            window.location = searchUrl + txtValue;
            return false;
        }
    }
});

$("#searchSubmitMegaNav").click(function () {
    var search = $('#searchInput');
    var txtValue = search.val().trim();

    if (txtValue.length != 0) {
        var searchUrl = $("#searchSubmitMegaNav").data("searchurl");
        window.location = searchUrl + txtValue;
        return false;
    }
});
/* end mega nav */

/* start sticky(secondary) nav */
function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    var scrollPosition = aTag.offset().top - 50;
    // if(!$('.secondaryNav').length){
    //     scrollPosition = aTag.offset().top - 100;
    // }
    $('html,body').animate({ scrollTop: scrollPosition }, 'slow');
}
$('a.aContainerSection').each(function () {
    $('ul.secondaryNavList').append("<li><a data-name='" + $(this).attr("name") + "'>" + $(this).attr("data-label") + "</a></li>");
});
if ($('ul.secondaryNavList li').length > 0) {
    // $('ul.secondaryNavList li').click(function () {
    //     //$('ul.secondaryNavList li').removeClass('active');
    //     //$(this).addClass('active');
    //     scrollToAnchor($(this).find('a').attr("data-name").toString().trim());
    // });

    var thisScroll = 0, lastScroll = 0, secondaryNavTop = $('.secondaryNav').offset().top;
    var prevScrollposSecNav = window.pageYOffset;
    $(window).scroll(function () {
        if ($('.secondaryNav').is(':visible')) {
            thisScroll = window.pageYOffset;
            var currentScrollPosSecNav = window.pageYOffset;
            var navheight = $('#navbar').height();

            $('a.aContainerSection').each(function () {
                var currentScrollNav = thisScroll + 55;
                if (prevScrollposSecNav > currentScrollPosSecNav) {
                    currentScrollNav += navheight;
                }
                if ($(this).offset().top < currentScrollNav) {
                    $('ul.secondaryNavList li').removeClass('active');
                    $('ul.secondaryNavList li').find('a:contains("' + $(this).attr("data-label") + '")').parent().addClass('active');
                }
            });
            prevScrollposSecNav = currentScrollPosSecNav;
        }
        var $toggleButton = $("#active-list-item");
        var $listItems = $("#list-items");
        var defaultItem = $("#list-items li:first");
        var text = $listItems.find(".active").html();
        text = text === undefined ? defaultItem.html() : text;
        $toggleButton.html(text);

    });
    var $toggleHeader = $("#list-header");
    var $liItems = $("#list-items li");
    var $listItems = $("#list-items");
    var $body = $("body");

    $liItems.click(function () {
        $listItems.addClass("hidden");
        $("body").removeClass("pos");
        scrollToAnchor($(this).find('a').attr("data-name").toString().trim());
    });
    $toggleHeader.click(function () {
        $listItems.toggleClass("hidden");
        $("body").toggleClass("pos");
    });

}
var prevScrollpos = window.pageYOffset;
var downloadpdfsticky = document.querySelector(".download-pdf-sticky");
var downloadoffsettop;
if (downloadpdfsticky != null) {
    downloadoffsettop = downloadpdfsticky.offsetTop;
}
 
function handleDownloadSticky(isFixed) {
    if (isFixed) {
        document.getElementsByClassName("download-pdf-sticky")[0].classList.add('fixed');
    }
    else {
        document.getElementsByClassName("download-pdf-sticky")[0].classList.remove('fixed');
    }
}
window.onscroll = function () {
    if (document.getElementById("navbar") != null) {
        var currentScrollPos = window.pageYOffset;
        var isSticky = currentScrollPos > downloadoffsettop;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
            if (document.getElementsByClassName("secondaryNav").length > 0) {
                document.getElementsByClassName("secondaryNav")[0].style.top = "64px";
            }
            if (document.getElementsByClassName("internal-sticky-nav-desktop").length > 0) {
                document.getElementsByClassName("internal-sticky-nav-desktop")[0].style.top = "64px";
            }
            if (document.getElementsByClassName("guides__sticky-nav-mobile").length > 0) {
                document.getElementsByClassName("guides__sticky-nav-mobile")[0].style.top = "64px";
            }
            if (document.getElementsByClassName("download-pdf-sticky").length > 0) {
                document.getElementsByClassName("download-pdf-sticky")[0].style.top = "64px";
                handleDownloadSticky(isSticky);
            }
        } else {
            document.getElementById("navbar").style.top = "-64px";
            if (document.getElementsByClassName("secondaryNav").length > 0) {
                document.getElementsByClassName("secondaryNav")[0].style.top = "0";
            }
            if (document.getElementsByClassName("internal-sticky-nav-desktop").length > 0) {
                document.getElementsByClassName("internal-sticky-nav-desktop")[0].style.top = "0";
            }
            if (document.getElementsByClassName("guides__sticky-nav-mobile").length > 0) {
                document.getElementsByClassName("guides__sticky-nav-mobile")[0].style.top = "0";
            }
            if (document.getElementsByClassName("download-pdf-sticky").length > 0) {
                document.getElementsByClassName("download-pdf-sticky")[0].style.top = "0";
                handleDownloadSticky(isSticky)

            }
        }
        prevScrollpos = currentScrollPos;
    }
}
/* end sticky(secondary) nav */

/* GF Insights Module */
var gf_origin = '';
var gf_origin_text = '';
var gf_destination = '';
var gf_destination_text = '';
var gf_selections = [];
$('.gf-insights select.origin').change(function () {
    gf_origin = $.trim($(this).val());
    gf_origin_text = $.trim($(this).find("option:selected").text());
});
$('.gf-insights select.destination').change(function () {
    gf_destination = $.trim($(this).val());
    gf_destination_text = $.trim($(this).find("option:selected").text());
});
function fnGetMarketUpdatesLine() {
    if (gf_origin != '' && gf_destination != '') {
        var currentSelection = $('#' + gf_origin + '_' + gf_destination);
        if (currentSelection.length) {
            if (currentSelection.is(':visible')) {
                $('.gf-message div span').text($('p.gf-alreadyExists').text().replace('{origin}', gf_origin_text).replace('{destination}', gf_destination_text));
            } else {
                $('.gf-message div span').text(' ');
                currentSelection.show();
                $('.market-update-lanes').prepend(currentSelection);
                gf_selections.push(gf_origin + '_' + gf_destination);
                fnSaveGFSelections();
            }
        } else {
            $('.gf-message div span').text($('p.gf-notAvailable').text().replace('{origin}', gf_origin_text).replace('{destination}', gf_destination_text));
        }
        trackAddTradeLane(gf_origin_text, gf_destination_text);
    }
}
$('div.msu-x-icon').click(function () {
    $(this).closest('.market-update-lane').hide();
    const index = gf_selections.indexOf($(this).closest('.market-update-lane').attr('id'));
    if (index > -1) {
        gf_selections.splice(index, 1);
    }
    fnSaveGFSelections();
});
function fnSaveGFSelections() {
    var selections = gf_selections.join('|');
    location.hash = "ff:" + selections;
    localStorage.setItem("CHR_GF_Selections", selections);
}
$(function () {
    if (localStorage.getItem("CHR_GF_Selections") || location.hash.length > 4) {
        if (localStorage.getItem("CHR_GF_Selections")) {
            gf_selections = localStorage.getItem("CHR_GF_Selections").split('|');
        }
        if (location.hash.length > 4) {
            gf_selections = location.hash.substring(4).split('|');
            localStorage.setItem("CHR_GF_Selections", gf_selections.join('|'));
        }
        if (gf_selections.length > 0) {
            var i;
            for (i = 0; i < gf_selections.length; ++i) {
                var selected = $('#' + gf_selections[i]);
                selected.show();
                $('.market-update-lanes').prepend(selected);
            }
        }
    } else {
        $('.gf-line-default').show();
    }
});
/* end GF Insights Module */

/* bs5 Top Naviagation */
document.querySelectorAll(".chr-dd-menu-styles")
    .forEach(element => element.addEventListener("click", function (event) {
        event.stopPropagation();
    })
    );
function toggleSearch() {
    var x = document.getElementById("main-nav");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
    var y = document.getElementById("search-expanded");
    if (y.style.display === "none") {
        y.style.display = "flex";
        document.getElementById("searchInput").focus();
    } else {
        y.style.display = "none";
    }
}

var searchInputClick = document.getElementById("searchInput");
if (searchInputClick != null) {
    document.getElementById("searchInput").addEventListener('keypress', siteSearch);
}

var SubmitClickIcon = document.getElementById("iconSearchSubmit-new-Active");
if (SubmitClickIcon != null) {
    document.getElementById("iconSearchSubmit-new-Active").addEventListener('click', siteSearch);
}
function siteSearch(e) {
    if (e.keyCode == 13 || e.type == "click") {
        window.location = document.getElementById("searchSubmitMegaNav").getAttribute("data-search-url") + document.getElementById("searchInput").value;
    }
}
var backButton = document.getElementsByClassName("subnav-back");
var i;
for (i = 0; i < backButton.length; i++) {
    backButton[i].addEventListener('click', e => {
        e.currentTarget.closest('.dropdown-menu').classList.remove('show');
        e.currentTarget.closest('.dropdown-menu').previousElementSibling.classList.remove('show');
    })
}
var subnavLv2Link = document.getElementsByClassName("subnav-lv2-link");
var j;
const $width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
for (j = 0; j < subnavLv2Link.length; j++) {
    subnavLv2Link[j].addEventListener('click', e => {
        if ($width < 991.99 && e.currentTarget.nextElementSibling != null) {
            e.preventDefault();
            e.currentTarget.nextElementSibling.classList.add('show');
        }
    })
}
var backLv2Button = document.getElementsByClassName("subnav-lv2-back");
var k;
for (k = 0; k < backLv2Button.length; k++) {
    backLv2Button[k].addEventListener('click', e => {
        e.currentTarget.closest('.subnav-lv2-header').classList.remove('show');
    })
}

// start Level 4 nav
const subnavLv3Link = document.getElementsByClassName("subnav-lv3-link");

for (let m = 0; m < subnavLv3Link.length; m++) {
    subnavLv3Link[m].addEventListener('click', e => {
        if ($width < 991.99 && e.currentTarget.nextElementSibling != null) {
            e.preventDefault();
            e.currentTarget.nextElementSibling.classList.add('show');
        }
    })
}
const backLv3Button = document.getElementsByClassName("subnav-lv3-back");

for (let l = 0; l < backLv3Button.length; l++) {
    backLv3Button[l].addEventListener('click', e => {
        e.currentTarget.closest('.subnav-lv3-header').classList.remove('show');
    })
}
// end Level 4 nav

var drowpdownToggle = document.querySelectorAll(".chr-dropdown");
drowpdownToggle.forEach(function (dropdownEle, i) {
    dropdownEle.addEventListener('show.bs.dropdown', function () {
        $("body").addClass("bounce");
    });
    dropdownEle.addEventListener('hide.bs.dropdown', function () {
        $("body").removeClass("bounce");
    });
});
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function () {

//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("navbar").style.top = "0";
//         if (document.getElementsByClassName("secondaryNav").length > 0) {
//             document.getElementsByClassName("secondaryNav")[0].style.top = "64px";
//             document.getElementsByClassName("secondaryNav")[0].classList.remove("stuckNav");
//         }
//     } else {
//         document.getElementById("navbar").style.top = "-64px";
//         if (document.getElementsByClassName("secondaryNav").length > 0 && $('.secondaryNav').offset().top - thisScroll <= 64 && !$('.stuckNav').length && thisScroll > lastScroll) {
//             document.getElementsByClassName("secondaryNav")[0].style.top = "0";
//             document.getElementsByClassName("secondaryNav")[0].classList.add("stuckNav");
//         }
//     }
//     prevScrollpos = currentScrollPos;
// }

$('#navbarSupportedContent').on('show.bs.collapse', function () {
    $("nav").addClass("navTop");
    $("body").addClass("menuBody");
});
$('#navbarSupportedContent').on('hidden.bs.collapse', function () {
    $("nav").removeClass("navTop");
    $("body").removeClass("menuBody");
});

/* end bs5 Top Naviagation */



/* -------- START DOWNLOAD PDF------ */

/* Retrieving checkboxes titles and bulltes from secondary navigation */
var x = document.getElementById("downloadModal");
if (x != null) {
    var getTitles;
    var marketAccordion = document.querySelector(".market-accordion");
    if (marketAccordion !== null) {
        getTitles = marketAccordion.querySelectorAll(".accordion-item");
    }
    else {
        getTitles = document.querySelectorAll(".aContainerSection.enableSectionDownload");
    }


    getTitles.forEach(function (element, i) {

        var nextSiblingEle = element.nextElementSibling;
        if (marketAccordion !== null) {
            nextSiblingEle = element.querySelector(".accordion-collapse");

        }
        var subtitle = nextSiblingEle.querySelectorAll(".level-2");
        var subtitleHTML = "";
        if (subtitle.length) {
            subtitle.forEach(function (elem) {
                var nextLevelsubtitle = elem.querySelectorAll("h3,h4");
                nextLevelsubtitle.forEach(function (ele) {
                    subtitleHTML += `<li class="listItems">${ele.innerHTML}</li>`;
                });
            });
        }

        if (i != getTitles.length) {
            var modalBody = document.querySelector("#downloadModal .modal-body-download");
            modalBody.innerHTML += `
        <div class="form-check form-check-download">
            <input class="form-check-input form-check-input-download" type="checkbox" value="" id="flexCheck-${i + 1
                }" >
            <label class="form-check-label form-check-label-download" for="flexCheck-${i + 1}">
                ${marketAccordion !== null ? element.getAttribute("data-name") : element.getAttribute("name")}
            </label>
            ${subtitle.length && subtitleHTML
                    ? `
                        <ul class="subtitleGroup">
                            ${subtitleHTML}
                        </ul>
                    `
                    : ``
                }  
            </div>      
             `;
        }
    });

    /* Setting all checkboxes to true bydefault */
    var listCheckedLabels = [];
    defaultchecked();
    function defaultchecked() {
        var checkboxes = document.querySelectorAll("#downloadModal input[type=checkbox]");

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            var name = checkboxes[i].nextElementSibling.textContent;
            listCheckedLabels.push(name.trim());
            var getcheckboxNames;
            if (marketAccordion !== null) {
                getcheckboxNames = marketAccordion.querySelectorAll(".accordion-item");
            }
            else {
                getcheckboxNames = document.querySelectorAll(".aContainerSection.enableSectionDownload");
            }

            getcheckboxNames.forEach(function (el, j) {
                if (i === j) {
                    if (marketAccordion !== null) {
                        el.classList.add("checked");
                    }
                    else {
                        var nextEle = el.nextElementSibling;
                        nextEle.classList.add("checked");
                    }

                }
            });
        }
    }

    /* Checking and unchecking eventlistener */
    var checkboxesname = document.querySelectorAll("#downloadModal input[type=checkbox]");
    for (var x = 0; x < checkboxesname.length; x++) {
        checkboxesname[x].addEventListener("change", function (event) {
            const button = document.querySelector(".modal-footer-download .btn-primary"); //$('#downloadModal').find('button');
            var name = $(this)[0].nextElementSibling.textContent;
            str = name.trim();
            var getcheckboxNames, nextEle;
            if (marketAccordion != null) {
                getcheckboxNames = marketAccordion.querySelectorAll(".accordion-item[data-name='" + str + "']")[0];

                nextEle = getcheckboxNames;
            }
            else {
                getcheckboxNames = document.querySelectorAll(
                    ".aContainerSection.enableSectionDownload[name='" + str + "']"
                )[0];
                nextEle = getcheckboxNames.nextElementSibling;
            }


            if (!$(this).is(":checked")) {
                nextEle.classList.remove("checked");
                var listChecked = document.querySelectorAll(".checked");

                if (listChecked.length === 0) {
                    button.disabled = true;
                }
                //listCheckedLabels.pop(str);
                const index = listCheckedLabels.indexOf(str);
                if (index > -1) {
                    listCheckedLabels.splice(index, 1);
                }
            } else {
                nextEle.classList.add("checked");
                button.disabled = false;
                if (listCheckedLabels.indexOf(str) < 0) {
                    listCheckedLabels.push(str);

                }

            }
        });
    }
}
//Download PDF button action
function DownloadPDF(include, exclude, docTitle, isHtml) {
    // function fnDownloadPDF(include, exclude, docTitle, isHtml)
    var $btn = $('.modal-footer-download .btn-primary');
    var btnText = $btn.text();
    $btn.attr('disabled', 'disabled').text($btn.attr('data-text'));
    setTimeout(function () { $btn.removeAttr('disabled').text(btnText); }, 4000);
    var listChecked;
    var accordionList = "", coverPage = "", accordionResult = "", result = "", eventValue = "";
    var marketAccordion = document.querySelector(".market-accordion");
    if (marketAccordion != null) {
        eventValue = "nast";
        var logo = document.querySelector(".navbar-brand>img");
        var imgLogo = logo.outerHTML;

        coverPage += "<div class='cover-logo'>" + imgLogo + "</div>";
        var pageTitle = $(".print-intro h1").html();

        coverPage += `<h1 class="cover-title">${pageTitle}</h1>`;

        var alertBanner = document.querySelector('.cookiehide');

        if (alertBanner) {
            var alertBannerClone = alertBanner.cloneNode(true);
            console.log(alertBannerClone);
            var button = alertBannerClone.querySelector('.btn-close');
            if (button) {
                button.remove();
            }
            coverPage += alertBannerClone.innerHTML;
        }


        var marketAccordionTitle = marketAccordion.querySelector(".market-accordion__title").textContent;
        coverPage += `<h2 class="market-accordion__title">${marketAccordionTitle}</h2>`;
        var marketAccordionClone = marketAccordion.cloneNode(true);

        var marketAccordionItems = marketAccordionClone.querySelectorAll(".accordion-item.checked");

        for (var i = 0; i < marketAccordionItems.length; i++) {
            var accordionButton = marketAccordionItems[i].querySelector(".accordion-button");
            accordionButton.classList.remove("collapsed");
            var accordionTitle = marketAccordionItems[i].querySelector(".accordion-button__title");
            var accordionTitleContent = accordionTitle.textContent;
            var replacedTitle = accordionTitleContent.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            replacedTitle = replacedTitle.replace(/\s+/g, '-');
            accordionList += `<li ><a href="#${replacedTitle}" class="list-title">${accordionTitleContent}</a></li>`;
            accordionTitle.setAttribute("id", replacedTitle);
            var accordionBody = marketAccordionItems[i].querySelector(".accordion-collapse");
            accordionBody.classList.add("show");
            var accordionContent = marketAccordionItems[i].innerHTML;
            checkedTemplate = "<div class='container'><div class='row'><div class='col-12'>" + accordionContent + "</div></div></div>";
            accordionResult += checkedTemplate;
        }

        coverPage += `<ul class="market-accordion__list">${accordionList}</ul>`;
        coverPage = `<div class="row coverPage"><div class="col-lg-8"><div style="page-break-after: always;">${coverPage}</div></div></div>`;
        result += "<div class='market-accordion'><div class='accordion accordion-flush'>" + accordionResult + "</div></div>";
        result = coverPage + result;
    }
    else {
        listChecked = $(".checked .col-lg-8");
        result = '<div class="container"><div class="row"><div class="col-12">' + $(".print-intro").html() + '</div></div></div>';
        for (var x = 0; x < listChecked.length; x++) {
            u = listChecked[x].innerHTML;
            checkedTemplate = "<div class='container'><div class='row'><div class='col-12'>" + u + "</div></div></div>";
            result += checkedTemplate;
        }
    }
    var temp = document.createElement('div');
    temp.className = "pdf-links"
    temp.innerHTML = result;
    var pdfLinks = temp.querySelectorAll('a');

    if (marketAccordion != null) {
        pdfLinks = temp.querySelectorAll('a:not(.list-title)');
        console.log("inside", pdfLinks);
    }
    var utmParamQueryString, utmContent;
    utmParamQueryString = 'utm_source=' + utmSource;
    utmParamQueryString += '&utm_medium=' + utmMedium;
    //Iterate all the links in checked list and append UTM parameters
    pdfLinks.forEach(function (item) {
        if (item.href.indexOf('/') === 0 || item.href.indexOf(location.host) !== -1) {
            if (item.href.indexOf('?') === -1) {
                item.href += '?';
            } else {
                item.href += '&';
            }
            if (item.innerText) {
                var itemText = item.innerText.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

                itemText = itemText.replace(/\s+/g, '-').toLowerCase();

                utmContent = '&utm_content=' + itemText;
            }
            item.href += utmParamQueryString + utmContent + '&utm_campaign=' + utmCampaign;
        }
    });
    var output = temp.innerHTML;
    if (isHtml) {
        var baseUrl = window.location.origin;
        var uri = "/api/custom/downloadpdfcontent";
        // u = $(include).wrap("<p/>").parent().html();

        // var formData = $(include).wrap('<p/>').parent().html();
        // if (exclude != '') {
        //     var $formData = $(formData).find(exclude).remove().end();
        //     formData = $formData.wrap('<p/>').parent().html()
        // }

        var linkTags = '';
        var links = window.document.getElementsByTagName("link");
        $('link[rel="stylesheet"]').each(function () {
            linkTags += '<link href="' + $(this).attr("href") + '" rel="stylesheet">';
        });
        var body =
            '<html lang="en-us" xmlns="http://www.w3.org/1999/xhtml"><head>' +
            linkTags +
            '</head><body><div id="MainPanel">' +
            output +
            "</div></body></html>";
        console.log(body);
        var bodyEncoded = $("<div/>").text(body).html();

        trackInsightsDownload(listCheckedLabels.join(' | '));
        $.ajax({
            method: "POST",
            url: uri,
            data: { html: bodyEncoded },
            dataType: "json",
            success: function (data) {
                window.location.href =
                    uri + "?fileGuid=" + data.FileGuid + "&filename=" + docTitle + "&brand=chr&baseUrl=" + baseUrl + "&eventtype=" + eventValue;
                // $elem.removeAttr('disabled');
            },
        });
    } else {
        //trackInsightsDownload(listCheckedLabels.join(' | '));
        //var currentUrl = window.location.href;
        //window.location.href = '/api/custom/downloadpdfdocument?include=' + include + '&exclude=' + exclude + '&docTitle=' + docTitle + '&brand=chr&url=' + currentUrl;
    }
}

/* -------- END DOWNLOAD PDF------ */

/* -------- START Testimonial------ */
var testimonialContainer = document.querySelector(".testimonial");
if (testimonialContainer != null) {
    var activecarousel = testimonialContainer.querySelectorAll(".carousel-item");
    activecarousel[0].classList.add("active");
    var getCarousel = testimonialContainer.querySelector(".carousel");

    var slides = testimonialContainer.querySelectorAll(".carousel-item");
    if (slides.length > 1) {
        getCarousel.innerHTML +=
            '<button class="carousel-control-prev" type="button" data-bs-slide="prev">' +
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Previous</span>' +
            "</button>" +
            '<button class="carousel-control-next" type="button" data-bs-slide="next">' +
            '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Next</span>' +
            "</button>";
    }

    $(document).ready(function () {
        checkTestimonials();
    });
    getCarousel.addEventListener("slid.bs.carousel", checkTestimonials);

    function checkTestimonials() {
        var $testimonialCarousel = $(".testimonialCarousel");
        var $buttonprev = $testimonialCarousel.children(".carousel-control-prev");

        var $buttonnext = $testimonialCarousel.children(".carousel-control-next");
        $buttonprev.attr("disabled", false);
        $buttonprev
            .children(".carousel-control-prev-icon")
            .removeClass("iconChangePrev");
        $buttonnext.attr("disabled", false);
        $buttonnext
            .children(".carousel-control-next-icon")
            .removeClass("iconChangeNext");
        if (
            $(".testimonialCarousel .carousel-inner .carousel-item:first").hasClass(
                "active"
            )
        ) {
            $buttonprev.attr("disabled", true);
            $buttonprev
                .children(".carousel-control-prev-icon")
                .addClass("iconChangePrev");
        } else if ($(".carousel-inner .carousel-item:last").hasClass("active")) {
            $buttonnext.attr("disabled", true);
            $buttonnext
                .children(".carousel-control-next-icon")
                .addClass("iconChangeNext");
        } else {
            $buttonprev.attr("disabled", false);
            $buttonprev
                .children(".carousel-control-prev-icon")
                .removeClass("iconChangePrev");
            $buttonnext.attr("disabled", false);
            $buttonnext
                .children(".carousel-control-next-icon")
                .removeClass("iconChangeNext");
        }
    }
    var element = document.createElement("div");
    element.className = "carousel-indicators";
    getCarousel.appendChild(element);
    var indicators = testimonialContainer.querySelector(".carousel-indicators");

    var slides = testimonialContainer.querySelectorAll(".carousel-item");

    slides.forEach(function (slide, index) {
        var length = slides.length;

        indicators.innerHTML += `<button type='button' data-bs-slide-to='${index}' class='${length === 1 ? "d-none" : ""
            }' aria-label='Slide ${index}'></button>`;
    });

    var carInd = testimonialContainer.querySelectorAll(
        ".carousel-indicators button"
    );
    carInd[0].classList.add("active");
}

/* -------- END Testimonial------ */

/* -------- START Related Service------ */
var relatedServiceContainer = document.querySelector(
    ".related-service-container"
);

if (relatedServiceContainer != null) {
    var relatedServiceCards = relatedServiceContainer.querySelectorAll(
        ".related-service-card"
    );

    relatedServiceCards.forEach(function (serviceCard, index) {
        serviceCard.addEventListener("click", function () {
            window.location = serviceCard.querySelector("a").getAttribute("href");
        });
    });
}
/* -------- END Related Service------ */


/*--- start Global Solutions Module*/
var imgconvert = function imgconvert() {
    $('.imgsvg').filter(function () {
        return this.src.includes(".svg");
    }).each(function imgalter() {
        var $img = $(this);
        //   var imgID = $img.attr('id');

        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function (data) {
            var $svg = $(data).find('svg');
            //   if(typeof imgID !== 'undefined') {
            //       $svg = $svg.attr('id', imgID);
            //   }
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            $img.replaceWith($svg);
        }, 'xml');
    });
}
var serviceByRegion = document.querySelector(".services-by-region");
if (serviceByRegion !== null) {
    imgconvert();
}
/*-- end Global Solutions Module */
/*start Horizontal Accordion Module*/
//$(document).ready(function() {

var regionList = document.querySelector(".TopLevelServiceSoltuions");
if (regionList != null) {
    var regionName = regionList.querySelectorAll(".region");
    regionName[0].classList.add('active');

    var regionServices = regionList.querySelectorAll(".regionspecificSolutions");
    regionServices[0].classList.add('active');
}
var horizontalAccordionContainer = document.querySelectorAll(".horizontal__accordion-tab");
if (horizontalAccordionContainer != null) {
    horizontalAccordionContainer.forEach(function (regionContainer) {
        var activeButton = regionContainer.querySelectorAll(".nav-link");
        activeButton[0].classList.add("active");

        var activeTab = regionContainer.querySelectorAll(".horizontal__accordion-tab-pane");
        activeTab[0].classList.add("active");
    })
}

var tabContainer = $("#formSection");
var activeFormContainer = tabContainer.find(".active .form-block");
var activeId = activeFormContainer.attr("data-mktoForm");
var mktoContainer = document.querySelector(".marketoformcontainer");
if (mktoContainer != null) {
    var formElement = mktoContainer.querySelectorAll("form");
    formElement.forEach(function (ele) {
        var id = ele.getAttribute("id").split('_')[1];
        if (id === activeId) {
            $(ele).appendTo(activeFormContainer);
        }
    })
}

function activeForm() {
    var tabContainer = $("#formSection");

    if (tabContainer) {
        var activeFormContainer = tabContainer.find(".active .form-block");
        var activeId = activeFormContainer.attr("data-mktoForm");
        var mktoContainer = document.querySelector(".marketoformcontainer");

        if (mktoContainer != null) {
            var formElement = mktoContainer.querySelectorAll("form");
            formElement.forEach(function (ele) {
                var id = ele.getAttribute("id").split('_')[1];
                if (id === activeId) {
                    $(ele).appendTo(activeFormContainer);
                }
            })
        }
        var formblockContainer = document.querySelectorAll(".form-block form");
        if (formblockContainer != null) {

            formblockContainer.forEach(function (formBlock) {
                var formid = formBlock.getAttribute("id").split('_')[1];
                if (formid == activeId) {
                    $(formBlock).appendTo(activeFormContainer);
                }
            })
        }
    }
}
let url = location.href;
let leadGen = document.querySelector(".leadGen-container");


if (leadGen && location.hash) {
    const hash = url.split("#");
    if ($('.leadGen-container .region[data-bs-target="#' + hash[1] + '"]').length) {
        $('.region.nav-link').removeClass('active');
        $('.leadGen-container .regionspecificSolutions').removeClass('active');
        var activeUrltab = $('.leadGen-container .region[data-bs-target="#' + hash[1] + '"]').addClass('active');
        var activeContent = $('.leadGen-container .regionspecificSolutions[id="' + hash[1] + '"]').addClass('active');
        let scrollTab = activeContent.offset().top - 110;
        $('html,body').animate({ scrollTop: scrollTab }, 'slow');
        activeForm();
    }
}
var $toggleRegion = $("#region-active-item");
var $regionlist = $(".regionsList");
var defaultregion = $(".regionsList .region span:first");
var defaultImg = $(".regionsList .region .imgsvg");
if ($('.svgwrapper')[0]) {
    $('.appendimg').html($('.svgwrapper')[0].innerHTML);
    imgconvert();
}

var regionName = $regionlist.find(".active").find("span").html();
regionName = regionName === undefined ? defaultregion.html() : regionName;
//  $regionlist.find(".active").addClass('hide-mobile');
$toggleRegion.html(regionName);

var $regionHeader = $("#region-header");
var $regionItems = $(".regionsList .region");
$regionItems.click(function () {
    $regionlist.toggleClass("hidden");
    $regionHeader.toggleClass("imgrotate");
});
$regionHeader.click(function () {
    $regionlist.toggleClass("hidden");
    $regionHeader.toggleClass("imgrotate");
});
$('.region.nav-link').on('click', function () {
    $('.region.nav-link').removeClass('active');
    $(this).addClass('active');
    if (leadGen) {
        let newUrl;
        url = url.split("#")[0];
        newUrl = url + $(this).attr('data-bs-target');
        history.replaceState(null, null, newUrl);
    }
    if ($('.svgwrapper')[0]) {
        $('.appendimg').html($(this).find('.svgwrapper')[0].innerHTML);
        $('.appendimg .imgsvg path').css('fill', '#004986');
    }
    // var activeImg = $(this).find('.imgsvg').attr('src');
    // $('.active-img').attr('src',activeImg);
    regionName = $regionlist.find(".active").find("span").html();
    regionName = regionName === undefined ? defaultregion.html() : regionName;
    $toggleRegion.html(regionName);

    activeForm();
});
//});
$(window).on('load', function () {
    var box = document.querySelector("body");
    var container = $(".horizontal__accordion-tab-content");
    var $toggle = $(".horizontal__accordion-tab-pane");
    $toggle.on("click", function () {
        var width = box.clientWidth;
        if (width <= 1050) {
            var $next = $(this).find("h2").parent().siblings();
            var nextAccordion = $next
                .children(".accordion-body-collapse")
                .removeClass("active");
            var nextToggle = $next
                .children(".accordion-title-collapse")
                .removeClass("toggleIcon");
            var nextParent = $next.removeClass("parentCollapse");
            $(this).find("h2").toggleClass("toggleIcon");
            $(this).find("h2").parent().toggleClass("parentCollapse");
            $(this).find("h2").next(".accordion-body-collapse").toggleClass("active");
        }
    });

    container.each(function (content, element) {
        $(element).find(".horizontal__accordion-tab-pane").eq(0).trigger("click");
    })
})
function accordionFirstTab() {
    var container = $(".horizontal__accordion-tab-content");
    container.each(function (content, element) {
        console.log("resize");
        $(element).find(".horizontal__accordion-tab-pane").removeClass("parentCollapse");
        $(element).find(".horizontal__accordion-tab-pane").children(".accordion-body-collapse").removeClass("active");
        $(element).find(".horizontal__accordion-tab-pane").children(".accordion-title-collapse").removeClass("toggleIcon");
        $(element).find(".horizontal__accordion-tab-pane").eq(0).addClass("parentCollapse");
        $(element).find(".horizontal__accordion-tab-pane").eq(0).children(".accordion-body-collapse").addClass("active");
        $(element).find(".horizontal__accordion-tab-pane").eq(0).children(".accordion-title-collapse").addClass("toggleIcon");

    })
}
window.onresize = accordionFirstTab;
/*end Horizontal Accordion Module */

// MArketo Forms
MktoForms2.onFormRender(function (form) {
    var $mktform = $("form.mktoForm");
    $($mktform)
        .find(
            'input[type="text"],input[type="tel"],input[type="email"],input[type="number"],textarea'
        )
        .on("focus", function () {
            $(this).prev().prev("label").addClass("mktolabelTransition");
        })
        .on("blur", function () {
            if ($(this).val().length <= 0) {
                $(this).prev().prev("label").removeClass("mktolabelTransition");
            }
        })
    $($mktform).find("select").prev().prev("label").addClass("mktoSelectLabel");
    $($mktform).find('input[type="checkbox"]').parent().prev().prev("label").addClass("mktoCheckboxLabel");;

    $($mktform)
        .find(
            'input[type="text"],input[type="tel"],input[type="email"],input[type="number"], textarea'
        ).on("focus keyup", function () {
            var $self = $(this);
            setTimeout(function () {

                if ($self.hasClass("mktoInvalid")) {

                    $self.prev().prev("label").addClass("mktolabelTransitionColor");
                }

                if ($self.hasClass("mktoValid")) {

                    $self.prev().prev("label").removeClass("mktolabelTransitionColor");
                }
            }, 30);
        })
    var dotField = document.querySelector('#MC_DOT_Number');
    $(dotField).on('input', function (event) {

        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 8) {
            this.value = this.value.substring(0, 8);
        }

        if ((this.value.length < 6 || this.value.length > 8)) {

            $(this).addClass('mcdotInvalid');
            $(this).prev().prev("label").addClass("mcdotLabel");

        }
        else {

            $(this).removeClass('mcdotInvalid');
            $(this).prev().prev("label").removeClass("mcdotLabel");
        }
    });
});

//end  MArketo Forms

//start add to calendar

var calendarBtn = document.getElementsByClassName("btn__calendar")[0];

var calendarLinks = document.getElementsByClassName("calendar__links")[0];
if (calendarBtn != null) {
    calendarBtn.addEventListener("click", function () {
        calendarLinks.classList.toggle("calendar__block");

    });
    document.addEventListener('mouseup', function (e) {

        if (!calendarBtn.contains(e.target)) {
            calendarLinks.classList.remove("calendar__block");
        }
    });
}
//end add to calendar

if (window.location.search.indexOf('utm') > -1) {
    const params = new URLSearchParams(window.location.search);

    if (params.get('utm_source') != null) {
        localStorage.setItem('chr-utm_source', params.get('utm_source'));
    }

    if (params.get('utm_medium') != null) {
        localStorage.setItem('chr-utm_medium', params.get('utm_medium'));
    }

    if (params.get('utm_content') != null) {
        localStorage.setItem('chr-utm_content', params.get('utm_content'));
    }

    if (params.get('utm_campaign') != null) {
        localStorage.setItem('chr-utm_campaign', params.get('utm_campaign'));
    }

    if (params.get('utm_term') != null) {
        localStorage.setItem('chr-utm_term', params.get('utm_term'));
    }
}
/* Client Advisories Result List */

function fnGetClientAdvisories(activeRegion, activeAdvosory, activeRow, page) {
    var $divClientAdv = $('.clientadvisories-list');
    var url = '/api/custom/clientadvisoriespager';
    var dataToPost = {
        activeRegion: activeRegion,
        activeAdvosory: activeAdvosory,
        activeRow: activeRow,
        pageNumber: page//, rcParameters: $divClientAdv.find('.clParameters').val()
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(dataToPost),
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        //contentType: "application/jsonrequest; charset=utf-8",
        success: function (data) {
            generateData(data.Items, activeRow);

            $('.clientadvisories-pager').html(data.Pager);
        }
    });
}

if ($('.clientadvisories-list').length) {
    window.onload = fnGetClientAdvisories("", "", 10, 1);
}

function generateData(jsonData, numberofrows) {
    //jsonData.length = numberofrows;
    var tableRow = '';
    var table = "";
    var rowHeader = $('.clientadvisories-rowheader').html();

    table = table.concat(rowHeader);
    if (jsonData.length == 0) {
        table = table.concat($('#clientadvisories-nodata').html());
    }

    jsonData.map((item, i) => {
        var innerContent = "";
        var dateCell = `<div class= "clientadvisories-cell"> <span>${jsonData[i].date}</span></div> `;
        var advisorCell = `<div class= "clientadvisories-cell"><a href="${jsonData[i].link}"><span>${jsonData[i].title}</a></span></div> `;
        var reg = "";
        var regionLength = jsonData[i].region.length;
        var regionValue = "";
        for (var j = 0; j < regionLength; j++) {
            var regionName = $.trim(jsonData[i].region[j]);
            regionValue += `<li>${regionName}  ${(j != (regionLength - 1)) ? "<span>|</span>" : ""}</li>`;
        }
        reg += regionValue;
        var region = `<div class= "clientadvisories-cell"> <ul>${reg}</ul></div>`
        innerContent = innerContent.concat(dateCell);
        innerContent = innerContent.concat(advisorCell);
        innerContent = innerContent.concat(region);
        tableRow = `<div id = "row-${i + 1}" class= "clientadvisories-row" >${innerContent}</div> `;
        table = table.concat(tableRow);
    })
    var appendContent = document.getElementById("clientadvisories-table");
    appendContent.innerHTML = "";
    appendContent.insertAdjacentHTML("beforeend", table);
}

var clientAdvisoriesFilter = document.querySelector(".clientadvisories-filter");
if (clientAdvisoriesFilter != null) {
    var customSelectList = clientAdvisoriesFilter.querySelectorAll(".custom-select-group");
    customSelectList.forEach(function (customEle, index) {
        var eachSelect = customEle.getAttribute("data-name");
        var customSelect = customEle.querySelector(".custom-select");
        var affectedRegionDefault = customEle.querySelector(".custom-select-list > ul > li:first-child");
        affectedRegionDefault.classList.add("active");
        var initialRegion = affectedRegionDefault.innerHTML;
        var customSelectLabel = customEle.querySelector(".custom-select span");
        customSelectLabel.innerHTML = initialRegion;
        var affectedRegionList = customEle.querySelectorAll(".custom-select-list > ul > li");
        var affectedRegion = customEle.querySelector(".custom-select-list");
        customSelect.addEventListener("click", function () {
            affectedRegion.classList.toggle("d-none");
            $(this).parents('.custom-select-group').siblings().find(".custom-select-list").addClass('d-none');
        })
        affectedRegionList.forEach(function (ele, i) {
            ele.addEventListener("click", function () {
                customSelectLabel.innerHTML = ele.innerHTML;
                affectedRegion.classList.toggle("d-none");
                setActive(ele);
                selectClicked();

            })
        })
    })
    const setActive = ele => {
        [...ele.parentElement.children].forEach(sib => sib.classList.remove('active'))
        ele.classList.add('active')
    }
}

function selectClicked() {
    var activeRegion = document.querySelector(".affectedregion>ul>li.active").getAttribute('id'); //region
    var activeAdvosory = document.querySelector(".advisorytype>ul>li.active").getAttribute('id');
    var activeRow = document.querySelector(".rows>ul>li.active").innerText;
    fnGetClientAdvisories(activeRegion, activeAdvosory, activeRow, 1);
}
window.onclick = function (event) {
    if (!event.target.matches('.custom-select')) {
        var dropdowns = document.getElementsByClassName("custom-select-list");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (!openDropdown.classList.contains('d-none')) {
                openDropdown.classList.add('d-none');
            }
        }
    }
}
/* end Client Advisories Result List */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//Shippers Tracking Module start
const shippersModule = document.querySelector("#shippers-module");
const shippersContainer = document.querySelector("#shippers-container");
if (shippersModule !== null || shippersContainer !== null) {
    var shipmentTracking = function (inputValue, urlValue, error) {
        if (inputValue === '' || inputValue === undefined) {
            error.classList.add('d-block');
            return false;
        }
        else {
            window.open(urlValue + inputValue, "_blank");
            if (error.classList.contains("d-block")) {
                error.classList.remove('d-block');
            }
        }
    }
    function shippersModuleFunc(formId, inputId, errormsg, trackMsg) {
        let shippersForm = document.getElementById(formId);
        //console.log(shippersForm);
        let trackingID = document.getElementById(inputId);
        let dataURL = trackingID.dataset.url;
        let errorMsg = document.querySelector("." + errormsg);
        //console.log(errorMsg);
        trackingID.addEventListener("input", function () {
            let updatedData = this.value.replace(/[^a-zA-Z0-9]/g, '');
            if (this.value !== updatedData) {
                this.value = updatedData;
            }
        });
        shippersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            trackOrder(trackingID.value, trackMsg);
            shipmentTracking(trackingID.value, dataURL, errorMsg);
        });
        shippersForm.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { //enter key
                e.preventDefault();
                trackOrder(trackingID.value, trackMsg);
                shipmentTracking(trackingID.value, dataURL, errorMsg);
            }
        })
    }
    if (shippersModule !== null) {
        shippersModuleFunc("shippers-form", "shippers-trackId", "shippers__error-msg", "topNavMktg");
    }
    if (shippersContainer !== null) {
        shippersModuleFunc("shippers-module-form", "shippers-trackingId", "shippers__error-div", "trackingPage");
    }
}

//Shippers Tracking Module cv1 end

//global solution new start
const cardBars = document.getElementsByClassName("card__bar");
if (cardBars != null) {
    toggleCard(cardBars[0]);
    function toggleCard(clickedBar) {
        if (clickedBar != null) {
            const icon = clickedBar.childNodes[2].childNodes[0];
            const upArrow = '/-/media/CHRGlobal/icons-svg/global-solution/arrow-up.svg';
            const downArrow = '/-/media/CHRGlobal/icons-svg/global-solution/arrow-down.svg';
            // is closed
            if (clickedBar.classList.contains('closed')) {
                const cardContainer = clickedBar.nextElementSibling;
                // has card
                if (cardContainer && cardContainer.classList.contains('card__container') && cardContainer.classList.contains('d-none')) {
                    //open card
                    cardContainer.classList.remove('d-none', 'closed');
                    clickedBar.classList.remove('closed');
                    clickedBar.classList.add('open', 'card__bar-outline', 'shadow-md');
                    icon.src = upArrow;
                }
            }
            // is open
            else if (clickedBar.classList.contains('open')) {
                const cardContainer = clickedBar.nextElementSibling;
                // has card
                if (cardContainer && cardContainer.classList.contains('card__container') && !cardContainer.classList.contains('d-none')) {
                    //close card
                    cardContainer.classList.add('d-none');
                    clickedBar.classList.add('closed');
                    clickedBar.classList.remove('open', 'card__bar-outline', 'shadow-md');
                    icon.src = downArrow;
                }
            }
        }

    }

}




//global solution new end
//Product Callout Module start
const setActiveEle = ele => {
    [...ele.parentElement.children].forEach(sib => sib.classList.remove('active'))
    ele.classList.add('active')
}
let productCalloutModule = document.querySelector(".product-callout");
if (productCalloutModule != null) {
    var productCalloutFeatures = productCalloutModule.querySelector(".product-callout__features");
    var duration = productCalloutFeatures.querySelector(".product-accordion").getAttribute("data-duration");
    duration = Number(duration);
    var defaultColor = productCalloutFeatures.querySelector(".product-accordion").getAttribute("data-bgcolor");
    var mainColor = productCalloutFeatures.querySelector(".product-accordion").getAttribute("data-maincolor");
    var accordionItems = productCalloutFeatures.querySelectorAll(".product-accordion-item");
    var accordionButtons = productCalloutFeatures.querySelectorAll(".product-accordion-button");
    var desktopImages = productCalloutModule.querySelectorAll(".product-callout__desktop-media .product-callout__desktop-image");
    var currentIndex = 0;
    var intialLoad = function () {
        currentIndex = currentIndex % accordionItems.length; // set to 0 if over max
        let currentElement = productCalloutFeatures.querySelector(`#product-accordion-item-${currentIndex}`);
        productCalloutCollpase(currentElement, currentIndex);
        let progressDiv = currentElement.querySelector(".progress");
        progressDiv.style.backgroundColor = defaultColor;
        let progressBar = currentElement.querySelector(".progress-bar");
        progressBar.style.transitionDuration = duration + 's';
        currentIndex++;
    }
    intialLoad();
    var intervalID = setInterval(function () {
        intialLoad();
    }, (duration * 1000), true);
    function productCalloutCollpase(element, index) {
        setActiveEle(element);
        let currentAccordionBtn = element.querySelector(".product-accordion-button");
        accordionButtons.forEach(function (btn) {
            btn.setAttribute("aria-expanded", false);
        })
        currentAccordionBtn.setAttribute("aria-expanded", true);
        let progressBar = element.querySelector(".progress-bar");
        progressBar.style.backgroundColor = mainColor;
        if (desktopImages) {
            desktopImages.forEach(function (imageEle, value) {
                if (index === value) {
                    imageEle.classList.add("activeImg");
                }
                else {
                    if (imageEle.classList.contains("activeImg")) {
                        imageEle.classList.remove("activeImg");
                    }
                }
            })
        }
    }
    accordionItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            productCalloutCollpase(item, index);
            let progressContainer = item.querySelector(".progress-bar");
            progressContainer.classList.add("remove-transition");
            clearInterval(intervalID);
        })
    })
}
//Product Callout Module end


//Image POP up module start
var imageElements = document.querySelectorAll(".image-popup");
if(imageElements !=null){
    var imageBody = document.querySelector("body");
    imageElements.forEach(function(img,index){
   
        var modalDiv = `
        <div id="imgModal-${index}" class="modal img-popup-modal">
            <div class="modal-content">
                <div class="img-close">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>          
                <img  id="modal-img-${index}" >
            </div>
            <div id="caption-${index}"></div>
        </div>`;
        const newElement = document.createElement("div");
        newElement.innerHTML = modalDiv;
        img.insertAdjacentElement('afterend', newElement); 
      
        img.addEventListener("click", function(){
           var modal = document.querySelector(`#imgModal-${index}`);
            modal.style.display = "block";
            var modalImg = document.querySelector(`#modal-img-${index}`);
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            imageBody.classList.add("popupImage-body");
           
        })   
    })
    var imagePopUpModals = document.querySelectorAll(".img-popup-modal");
    
    imagePopUpModals.forEach(function(imageModal){
        imageModal.addEventListener("click",function(){   
            
            imageModal.style.display = "none";  
            imageBody.classList.remove("popupImage-body");            
        })
    });   
}

//Image POP up module end

//var guidesContainer = document.querySelector(".guides__new-container");

var guidesHeadings = document.querySelectorAll(".scroll-links");
if (guidesHeadings.length > 0) {
    var stickyList =document.querySelector(".internal-sticky-nav__links");
    var mobileDropdown =document.querySelector(".guides__dropdown");
    var mobileStickyList = document.querySelector(".guides__nav-mobile");

    //dropdown mobile
    var bodyEle = document.querySelector("body");
    mobileDropdown.addEventListener("click", function () {
        mobileStickyList.classList.toggle("d-none");
        bodyEle.classList.toggle("guide-mobile-overflow");
    })

    //Creating internal nav list from heading content
    guidesHeadings.forEach(function (heading) {
        //desktop list
        var headingContent = heading.getAttribute("data-navattr");
        var navListItem = document.createElement("li");
        navListItem.classList.add("internal-sticky-nav__links-item");
        navListItem.setAttribute("data-navItem", headingContent)
        navListItem.innerHTML = headingContent;
        stickyList.appendChild(navListItem);

        //mobile list
        var mobileList = document.createElement("li");
        mobileList.classList.add("guides__nav-mobile-item");
        mobileList.setAttribute("data-navmobileItem", headingContent);
        mobileList.innerHTML = headingContent;
        mobileStickyList.appendChild(mobileList);
    })
    var internalListItems = document.querySelectorAll(".internal-sticky-nav__links-item");

    // On click of internal list item
    internalListItems.forEach(function (item) {
        item.addEventListener("click", function () {
            var itemAttr = item.getAttribute("data-navItem");
            var headTag = document.querySelector(`.scroll-links[data-navattr='${itemAttr}']`);
            scrollToPosition(headTag);
        })
    })
    var earlierScrollPostion = 0;
    function scrollToPosition(element) {
        var scrollPosition = element.offsetTop;             
        var rootElement = document.documentElement;
        function scrollToTop() {
            if (scrollPosition < earlierScrollPostion) {
                scrollPosition = element.offsetTop - 64;
            }
            else {
                scrollPosition = element.offsetTop;
            }
            earlierScrollPostion = scrollPosition;

            rootElement.scrollTo({
                top: scrollPosition,
                behavior: "smooth"
            })
        }
        scrollToTop();
    }

    var mobileListItems = document.querySelectorAll(".guides__nav-mobile-item");
    var guidesDropdownElement = document.querySelector(".guides__element-active");
    var firstItemMobile = document.querySelector(".guides__nav-mobile> li:first-child");

    firstItemMobile.classList.add("active");
    var firstListContent = firstItemMobile.textContent;
    guidesDropdownElement.textContent = firstItemMobile.textContent;
    mobileListItems.forEach(function (eachItem) {
        eachItem.addEventListener("click", function () {
            var mobileDataItem = eachItem.getAttribute("data-navmobileItem");
            var mobileItemContent = eachItem.textContent;
            guidesDropdownElement.textContent = mobileItemContent;
            mobileStickyList.classList.add('d-none');
            bodyEle.classList.remove("guide-mobile-overflow");
            var mobileheadTag = document.querySelector(`.scroll-links[data-navattr='${mobileDataItem}']`);
            scrollToPositionMobile(mobileheadTag);
        })

    })
    function scrollToPositionMobile(element) {
        var scrollPosition = element.offsetTop;
  
        var rootElement = document.documentElement;
        function scrollToTop() {

            if (scrollPosition < earlierScrollPostion) {
                scrollPosition = element.offsetTop - 64 - 60;
            }
            else {
                scrollPosition = element.offsetTop - 60;
            }
            earlierScrollPostion = scrollPosition;

            rootElement.scrollTo({
                top: scrollPosition,
                behavior: "smooth"
            })
        }
        scrollToTop();
    }
    var prevScrollposNav = window.pageYOffset;
    window.addEventListener('scroll', function () {
        thisScroll = window.pageYOffset;
        var currentScrollPosNav = window.pageYOffset;
        guidesHeadings.forEach(function (heading) {
            var currentScrollNav = thisScroll + 10;
            var mobileCurrentScroll = thisScroll + 70;
            if (prevScrollposNav > currentScrollPosNav) {
                currentScrollNav += 64;
                mobileCurrentScroll += 64;
            }

            if (heading.offsetTop <= currentScrollNav) {
                textName = heading.getAttribute("data-navattr");
                item = document.querySelector(`li[data-navitem='${textName}']`);
                const setActive = ele => {
                    [...ele.parentElement.children].forEach(sib => sib.classList.remove('active'))
                    ele.classList.add('active')
                }
                setActive(item);
            }

            if (heading.offsetTop <= mobileCurrentScroll) {
                textName = heading.getAttribute("data-navattr");
                guidesDropdownElement.textContent = textName;
                item = document.querySelector(`li[data-navmobileItem='${textName}']`);
                const setActive = ele => {
                    [...ele.parentElement.children].forEach(sib => sib.classList.remove('active'))
                    ele.classList.add('active')
                }
                setActive(item);

            }
        })
        prevScrollposNav = currentScrollPosNav;
    })
}

//Alert Banner
var alertBanner = document.querySelector(".cookiehide");
if (alertBanner!=null){ 
    var cookieName = alertBanner.dataset.name;    
    var alertDismissBtn =alertBanner.querySelector('.alert .btn-close');
    alertDismissBtn.addEventListener('click', function () {
        alertBanner.style.display= 'none';
        setCookie(cookieName,'true',30);    
    });
    var showAlert = getCookie(cookieName);
    if (!showAlert){
        alertBanner.style.display= 'block';
    }
    else{
        alertBanner.style.display= 'none';
    }
}


//Feedback Module

var feedbackModule = document.querySelectorAll( ".feedback-module" );
if(feedbackModule !=null){
var marketAccordion = document.querySelector(".market-accordion");
feedbackModule.forEach(function(feedbackElement){
    var elementName = feedbackElement.getAttribute("data-name");
    var like = feedbackElement.querySelector(".feedback-like");
    var likeCookie=like.getAttribute("data-cookie");
    likeCookie = elementName+"-"+likeCookie;
    // var likeTrk = elementName+"-helpful";
    var dislike = feedbackElement.querySelector(".feedback-dislike");
    var dislikeCookie = dislike.getAttribute("data-cookie");
    dislikeCookie = elementName + "-"+dislikeCookie;
    function setFeedbackAccordionTrkDesc(element,stringValue){
        var getAccordionItem = element.closest('.accordion-item');
        if(getAccordionItem){
            var accordionName = getAccordionItem.getAttribute("data-name");
            element.setAttribute("trk-desc",accordionName+"-"+stringValue);
        } 
    }
    if(marketAccordion!=null){
        setFeedbackAccordionTrkDesc(like,"helpful");
        setFeedbackAccordionTrkDesc(dislike,"not helpful")       
    } 
    // var dislikeTrk = elementName+"-not helpful";
    var activeLike = getCookie(likeCookie);
    if(activeLike){       
        like.classList.add("active");
    }
    var activedisLike = getCookie(dislikeCookie);
    if(activedisLike){
        dislike.classList.add("active");
    }
    function deleteCookie(cookieName) {
        const date = new Date();
        date.setTime(date.getTime() - (3600 * 1000)); // Subtract one hour
        document.cookie = `${cookieName}=; expires=${date.toUTCString()}; path=/`;
    }
    function handleClick(activeEle,inActiveEle,activeCookie,inactiveCookie){
        if(activeEle.classList.contains("active")){
            activeEle.classList.remove("active");
            
            deleteCookie(activeCookie);
        }
        else{
            activeEle.classList.add("active");                          
            setCookie(activeCookie,'true',30);
        }
       
        inActiveEle.classList.remove("active")
        
        deleteCookie(inactiveCookie);
    }
    like.addEventListener("click",function(){ 
         
        handleClick(like,dislike,likeCookie,dislikeCookie);                
    })
    dislike.addEventListener("click",function(){ 
         
        handleClick(dislike,like,dislikeCookie,likeCookie );                
    })

})
}
//FAQ Accordion Tracking
var faqmodule = document.querySelector(".faq-component");
if (faqmodule !== null) {
    var faqAccordions = faqmodule.querySelectorAll(".faqcontainer-title");
    faqAccordions.forEach(function (faqAccordion) {        
        faqAccordion.addEventListener("click", function () {
            var isclicked = faqAccordion.getAttribute("data-clicked");
            if (isclicked === "false") {
                var accodionstate = "closed";
                if (!faqAccordion.classList.contains("collapsed")) {
                    accodionstate = "open";
                }
                var faqAccordionText = faqAccordion.getAttribute("data-question");

                trackAccordion(accodionstate, faqAccordionText, "FAQ");
                faqAccordion.setAttribute("data-clicked", "true");

            }          

        });
        
    })
}