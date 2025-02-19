var vidyard_player_width_JCTFDAUADSfgYDec2FwMPw = 640;
var vidyard_player_height_JCTFDAUADSfgYDec2FwMPw = 360;
var vidyard_html5_JCTFDAUADSfgYDec2FwMPw = false;
var vidyard_secure_JCTFDAUADSfgYDec2FwMPw = false;
var vidyard_integration_check_JCTFDAUADSfgYDec2FwMPw = function() {};
var vidyard_JCTFDAUADSfgYDec2FwMPw_params = {};
var vidyard_JCTFDAUADSfgYDec2FwMPw_raw_params = '';
if (typeof(Vidyard) !== 'object') {
  var Vidyard = {
    _players: {}
  };
}
Vidyard.currently_playing = Vidyard.currently_playing || false;

Vidyard.Helpers = Vidyard.Helpers || {};
Vidyard.Helpers.addListener = function(eventName, ie8EventName, handler, element, useCapture) {
  element = element || window;
  useCapture = useCapture || false;

  if (element.addEventListener) {
    element.addEventListener(eventName, handler, useCapture);
  } else if (element.attachEvent) {
    element.attachEvent(ie8EventName, handler);
  }
};
Vidyard.Helpers.removeListener = function(eventName, ie8EventName, handler, element, useCapture) {
  element = element || window;
  useCapture = useCapture || false;

  if (element.removeEventListener) {
    element.removeEventListener(eventName, handler, useCapture);
  } else if (element.detachEvent) {
    element.detachEvent(ie8EventName, handler);
  }
};

Vidyard.Helpers.getPlayerIFrame = function(player_uuid) {
  return document.getElementById('vidyard_iframe_' + player_uuid);
};

Vidyard.Helpers.remove = function(element) {
  if (element) {
    if (element.remove) {
      element.remove();
    } else {
      element.removeNode();
    }
  }
};

(function() {
  var query_params = {};
  var query_player_width;
  var query_player_height;
  var embed_script = document.getElementById('vidyard_embed_code_JCTFDAUADSfgYDec2FwMPw');
  var playerDetails = {"keywords":"","thumbnailUrl":"https://play.vidyard.com/JCTFDAUADSfgYDec2FwMPw.jpg","@context":"http://schema.org/","@type":"VideoObject","id":"JCTFDAUADSfgYDec2FwMPw","description":"To gain internal support for a TMS project, a strong business case is a necessary first step. Here are eight valuable benefits and outcomes to include in your TMS business case.","name":"Building a Business Case for Managed TMS","transcript":"","uploadDate":"2018-11-01T15:54:04.000Z","duration":"T1M38S","embedUrl":"https://play.vidyard.com/JCTFDAUADSfgYDec2FwMPw","height":360,"width":640};

  if (playerDetails.id && window.JSON) {
    var playerDetailsScriptTag = document.createElement('script');

    playerDetailsScriptTag.text = window.JSON.stringify(playerDetails);
    playerDetailsScriptTag.type = 'application/ld+json';
    document.getElementsByTagName('head')[0].appendChild(playerDetailsScriptTag);
  }


  // --- Begin Duplicate Player Embed Handling ---

  function check_for_duplicate_embeds() {
    // Check for an already existing player with the same ID, pop a console error and remove it
    var all_scripts = document.getElementsByTagName("script");
    var dupe_scripts = [];

    // Finding all duplicate scripts tags in an IE7 friendly way
    for (var i = 0; i < all_scripts.length; ++i) {
      if (all_scripts[i].getAttribute('id') === "vidyard_embed_code_JCTFDAUADSfgYDec2FwMPw") {
        dupe_scripts.push(all_scripts[i]);
      }
    }
    dupe_scripts.shift();

    if (dupe_scripts.length >= 1) {
      // Remove the duplicate script tags
      for (var i = 0; i < dupe_scripts.length; ++i) {
        dupe_scripts[i].parentNode.removeChild(dupe_scripts[i]);
      }

      if (typeof document.querySelectorAll === 'function') {
        // Find duplicate vidyard_wrapper div tags from lightbox embeds
        var wrappers = document.querySelectorAll('.vidyard_wrapper');
        dupe_wrappers = [];
        for (var i = 0; i < wrappers.length; ++i) {
          if (wrappers[i].getAttributeNode('onclick').value === "fn_vidyard_JCTFDAUADSfgYDec2FwMPw();") {
            dupe_wrappers.push(wrappers[i]);
          }
        }
        dupe_wrappers.shift();

        // Remove any duplicate vidyard_wrapper divs
        for (var i = 0; i < dupe_wrappers.length; ++i) {
          dupe_wrappers[i].parentNode.removeChild(dupe_wrappers[i]);
        }
      }

      // Throw a console error if it exists
      if (window.console && window.console.error) {
        console.error("Duplicate Embedded Players Detected. Vidyard only supports embedding the same player once in a page.");
      }
    }
  }

  if (document.readyState === 'complete') {
    check_for_duplicate_embeds();
  } else {
    Vidyard.Helpers.addListener('load', 'onload', check_for_duplicate_embeds);
  }

  if (!embed_script || !embed_script.src) {
    // If ID is not reliable, search script objects for the script
    scripts = document.getElementsByTagName('script');
    for (var i in scripts) {
      var script = scripts[i];
      
      // Find the script from the vidyard domain that contains the player's id
      if (script.src && /^.+(vidyard\.com).*\/JCTFDAUADSfgYDec2FwMPw.*/.test(script.src)) {
        embed_script = script;
        break;
      }
    }
  }

  // --- Begin Player Rendering ---

  if (embed_script && embed_script.src) {
    // Player is signed, cannot change url parameters, Add 1 to the index to not include the '?'
    var queryParamIndex = embed_script.src.search(/\?/) + 1;
    var rawQueryParams = '';

    if (queryParamIndex !== 0 && embed_script.src.length >= queryParamIndex) {
      rawQueryParams = embed_script.src.slice(queryParamIndex);
    }
    vidyard_JCTFDAUADSfgYDec2FwMPw_raw_params = rawQueryParams;

    // Find all query string key value pairs and loop over each pair
    embed_script.src.replace(/(?:[\?&])([^&=]*)=?([^&#]*)/g, function ($0, $1, $2) {
      if ($1) {
        switch ($1) {
          case 'playlist_always_open':
          case 'disable_ctas':
          case 'disable_popouts':
          case 'bwm_preview':
          case 'preview':
          case 'autoplay':
          case 'hide_playlist':
          case 'hide_html5_playlist':
          case 'name_overlay':
          case 'viral_sharing':
          case 'embed_button':
          case 'redirect_whole_page':
          case 'vylegacy':
            vidyard_JCTFDAUADSfgYDec2FwMPw_params[$1] = (parseInt($2, 10) !== 0);
            break;
          case 'chapter':
            vidyard_JCTFDAUADSfgYDec2FwMPw_params[$1] = parseInt($2, 10);
            break;
          case 'width':
            query_player_width = parseInt($2, 10);
            break;
          case 'height':
            query_player_height = parseInt($2, 10);
            break;
          case 'X-VY-Signature':
            vidyard_secure_JCTFDAUADSfgYDec2FwMPw = true;
          default:
            vidyard_JCTFDAUADSfgYDec2FwMPw_params[$1] = $2;
            break;
        }
      }
    });
  }

  // Determine Embed Type
  if (!vidyard_JCTFDAUADSfgYDec2FwMPw_params.type || vidyard_JCTFDAUADSfgYDec2FwMPw_params.type !== 'lightbox') {
    vidyard_JCTFDAUADSfgYDec2FwMPw_params.type = 'inline';
  }

  // Determine Player Settings which effect embed
  var multi_chapter = false && !(typeof vidyard_JCTFDAUADSfgYDec2FwMPw_params.hide_html5_playlist !== 'undefined' && vidyard_JCTFDAUADSfgYDec2FwMPw_params.hide_html5_playlist);
  var playlist_always_open = false;
  if (typeof vidyard_JCTFDAUADSfgYDec2FwMPw_params.playlist_always_open !== 'undefined') {
    playlist_always_open = vidyard_JCTFDAUADSfgYDec2FwMPw_params.playlist_always_open;
  }

  // Setting default player widths (also checking that query_player widht/height are valid)
  if (query_player_width && query_player_width > 0 && query_player_height && query_player_height > 0) {
    vidyard_player_width_JCTFDAUADSfgYDec2FwMPw = query_player_width;
    vidyard_player_height_JCTFDAUADSfgYDec2FwMPw = query_player_height;
  } else if (query_player_width && query_player_width > 0) {
    query_player_height = (query_player_width * vidyard_player_height_JCTFDAUADSfgYDec2FwMPw) / vidyard_player_width_JCTFDAUADSfgYDec2FwMPw;
    vidyard_player_width_JCTFDAUADSfgYDec2FwMPw = query_player_width;
    vidyard_player_height_JCTFDAUADSfgYDec2FwMPw = query_player_height;
  } else if (query_player_height && query_player_height > 0) {
    query_player_width = (query_player_height * vidyard_player_width_JCTFDAUADSfgYDec2FwMPw) / vidyard_player_height_JCTFDAUADSfgYDec2FwMPw;
    vidyard_player_width_JCTFDAUADSfgYDec2FwMPw = query_player_width;
    vidyard_player_height_JCTFDAUADSfgYDec2FwMPw = query_player_height;
  }

  var iframe_container = document.getElementById("vidyard_JCTFDAUADSfgYDec2FwMPw");

  // Gets cookie of the supplied cookie_name
  function fn_getCookie(cookie_name) {
    var i, found_name, contained_id;
    var ARRcookies = document.cookie.split(";");
    
    for (i = 0; i < ARRcookies.length; i++) {
      found_name = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      contained_id = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      found_name = found_name.replace(/^\s+|\s+$/g, "");

      if (found_name == cookie_name) {
        return decodeURIComponent(contained_id);
      }
    }
  }

  // if no iframe present and inline embed, insert the player via the embed_script
  if (!iframe_container && vidyard_JCTFDAUADSfgYDec2FwMPw_params.type === 'inline') {
    iframe_container = document.createElement("span");
    iframe_container.id = 'vidyard_JCTFDAUADSfgYDec2FwMPw';
    iframe_container.className = 'vidyard_player';
    embed_script.parentNode.insertBefore(iframe_container, embed_script);
  }

  // Only add these ids to the url parameter if the play is not signed
  if (vidyard_secure_JCTFDAUADSfgYDec2FwMPw === false) {
    // Get cookie data/ids from various MAPs/CRMs
    var pardot_id = fn_getCookie("pardot");
    if (pardot_id) {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.pardot_id = pardot_id;
    }

    var hubspot_id = fn_getCookie("hubspotutk");
    if (hubspot_id) {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.hubspot_id = hubspot_id;
    }

    var marketo_id = fn_getCookie("_mkto_trk");
    var munchkin_id = '';
    
    munchkin_id = '313-rrt-629';
    
    if (marketo_id && munchkin_id && marketo_id.toLowerCase().indexOf(munchkin_id) > -1) {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_id = encodeURIComponent(marketo_id);
    }

    var dreamforce_id = fn_getCookie("vy_dreamforce");
    if (dreamforce_id) {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.dreamforce_id = encodeURIComponent(dreamforce_id);
    }

    // Gets the vycustomid query string param, used to identify personalized videos
    var vycustom_id = get_parameter_by_name('vycustom_id');
    if (vycustom_id !== "") {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.custom_id = vycustom_id;
    }

    // Gets the vyemail query string param, which connects views to an email entered
    var vyemail = get_parameter_by_name('vyemail');
    if (vyemail !== "") {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.email = vyemail;
    }

    var vyac = get_parameter_by_name('vyac');
    var vyplayer = get_parameter_by_name('vyplayer');
    if (vyplayer === 'JCTFDAUADSfgYDec2FwMPw') {
      vidyard_JCTFDAUADSfgYDec2FwMPw_params.access_code = vyac;
    }
  }

  //Reference: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values
  function get_parameter_by_name(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) {
      return "";
    } else {
      return results[1];
    }
  }

  // Check for android or ios mobile, if found then force a lightbox embed type
  // and disable popouts
  if (navigator.userAgent.toLowerCase().match(/ip(ad|od|hone)|android/)) {
    vidyard_html5_JCTFDAUADSfgYDec2FwMPw = true;
    vidyard_JCTFDAUADSfgYDec2FwMPw_params.disable_popouts = true;
  }

  // Find the provided play button from the embed code and replace it/leave if not found
  function replacePlayButton() {
    

    // Since there's no solid way to replace only *this* embed's play button,
    // we find all buttons and update any that need updating.
    var buttons;
    if (typeof document.querySelectorAll === 'function') {
      buttons = document.querySelectorAll('.vidyard_wrapper .vidyard_play_button, .vidyard_wrapper .play-btn');
    } else {
      buttons = [];
      // Go through *all* divs on the page to find wrappers:
      var divs = document.getElementsByTagName('div');
      for (var i = 0; i < divs.length; i++) {
        var wrapper = divs[i];
        if (wrapper.className === 'vidyard_wrapper') {
          // See if we have any buttons in here:
          var els = wrapper.getElementsByTagName('button');

          // If there are no buttons, try divs instead:
          if (els.length === 0) {
            els = wrapper.getElementsByTagName('div');
          }

          for (var j = 0; j < els.length; j++) {
            // Only update this embed, not all others
            if (els[j].className !== 'vidyard_play_button' && els[j].className !== 'play-btn') { continue; }

            buttons.push(els[j]);
            break;
          }
        }
      }
    }

    // Check each button to see if it needs replacing:
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      // Don't replace buttons we've already updated:
      if (parseInt(button.getAttribute('data-version')) >= 1) { continue; }

      // Otherwise, remove this button:
      var wrapper = button.parentNode;
      wrapper.removeChild(button);

      // Replace with new play button:
      wrapper.innerHTML +=
      '<button type="button" class="play-btn" title="Play Video" style="display:block;" data-version="1">' +
        '<div class="play-btn-size"></div>' +
        '<div class="arrow-size">' +
          '<div class="arrow-size-ratio"></div>' +
          '<div class="arrow"></div>' +
        '</div>' +
      '</button>';
    }
  }

  // Setup inline/lightbox embeds
  function create_embed() {
    var integration_tracking_check_retry = 10;
    var referringUrlSent = false;
    var eloquaSent = false;
    var playerReady = false;

    var integration_tracking_check = function() {
      if (playerReady) {
        integration_tracking_check_original();
      } else {
        window.addEventListener('message', function callback(e) {
          var data;
          try {
            data = JSON.parse(e.data);
          } catch (e) {
            return;
          }
          if (data.event === "ready" && data.uuid === "JCTFDAUADSfgYDec2FwMPw") {
            window.removeEventListener('message', callback);
            playerReady = true;
            integration_tracking_check_original();
          }
        });
      }
    }

    var integration_tracking_check_original = function () {
      if (!window.postMessage) {
        return;
      }

      if (!referringUrlSent && vidyard_secure_JCTFDAUADSfgYDec2FwMPw === true && vidyard_JCTFDAUADSfgYDec2FwMPw_params.referring_url) {
        var playerFrame = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
        var message = {
          'event': 'parentReferer',
          'uuid': 'JCTFDAUADSfgYDec2FwMPw',
          'data': {
            'value': vidyard_JCTFDAUADSfgYDec2FwMPw_params.referring_url
          }
        }

        if (playerFrame && window.postMessage) {
          playerFrame.contentWindow.postMessage(JSON.stringify(message), window.location.protocol + '//play.vidyard.com');
        }
      }

      var messages = [];
      // Get cookie data/ids from various MAPs/CRMs if we haven't already
      if (!vidyard_JCTFDAUADSfgYDec2FwMPw_params.pardot_id) {
        var pardot_id = fn_getCookie("pardot");
        if (pardot_id) {
          vidyard_JCTFDAUADSfgYDec2FwMPw_params.pardot_id = pardot_id;
          messages.push({'data': {'type': 'pardot', 'value': pardot_id }});
        }
      }

      if (!vidyard_JCTFDAUADSfgYDec2FwMPw_params.hubspot_id) {
        var hubspot_id = fn_getCookie("hubspotutk");
        if (hubspot_id) {
          vidyard_JCTFDAUADSfgYDec2FwMPw_params.hubspot_id = hubspot_id;
          messages.push({'data': {'type': 'hubspot', 'value': hubspot_id}});
        }
      }

      if (!vidyard_JCTFDAUADSfgYDec2FwMPw_params.dreamforce_id) {
        var dreamforce_id = fn_getCookie("vy_dreamforce");
        if (dreamforce_id) {
          dreamforce_id = encodeURIComponent(dreamforce_id);
          vidyard_JCTFDAUADSfgYDec2FwMPw_params.dreamforce_id = dreamforce_id;
          messages.push({'data': {'type': 'dreamforce', 'value': dreamforce_id}});
        }
      }
      if (!vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_id) {
        var marketo_id = fn_getCookie("_mkto_trk");
        var munchkin_id = '';
        
        munchkin_id = '313-rrt-629';
        
        if (marketo_id && munchkin_id && marketo_id.toLowerCase().indexOf(munchkin_id) > -1) {
          marketo_id = encodeURIComponent(marketo_id);
          vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_id = marketo_id;
          messages.push({'data': {'type': 'marketo', 'value': marketo_id}});
        }
      }

      

      // inline embeds are ready to receive api requests
      // lightbox will pass data through querystring params
      if (vidyard_JCTFDAUADSfgYDec2FwMPw_params.type === "inline" || vidyard_secure_JCTFDAUADSfgYDec2FwMPw === true) {
        for(var i in messages) {
          messages[i].event = 'associateVisitor';
          messages[i].uuid = 'JCTFDAUADSfgYDec2FwMPw';
          Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw').contentWindow.postMessage(JSON.stringify(messages[i]), window.location.protocol + '//play.vidyard.com');
        }
      }

      if (integration_tracking_check_retry-- > 0) {
        setTimeout(integration_tracking_check, 500);
      }
    }

    vidyard_integration_check_JCTFDAUADSfgYDec2FwMPw = integration_tracking_check;

    // Display the inline or lightbox
    if (vidyard_JCTFDAUADSfgYDec2FwMPw_params.type === "inline") {
      // Load the iframe
      iframe_container.innerHTML = fn_vidyard_build_iframe_JCTFDAUADSfgYDec2FwMPw(false, vidyard_player_width_JCTFDAUADSfgYDec2FwMPw, vidyard_player_height_JCTFDAUADSfgYDec2FwMPw);

      Vidyard.Helpers.addListener(
        'load',
        'onload',
        function() {
          fn_vidyard_iframe_after_load_JCTFDAUADSfgYDec2FwMPw();
          integration_tracking_check();
        },
        Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw')
      );

    } else if (vidyard_JCTFDAUADSfgYDec2FwMPw_params.type === "lightbox") {
      // Dynamically insert CSS for the splash screen's play button
      var vidyard_stylesheet = [
        '.vidyard_wrapper {' +
          'position: relative;' +
          'float: left;' +
          'cursor: pointer;' +
        '}',

        '.play-btn, .vidyard_play_button {' +
          'display: none;' +
        '}',

        '@media (min-width: 0) { .vidyard_wrapper img {' +
          'max-width: 100%;' +
        '} }',

        
          '.vidyard_wrapper .play-btn {' +
          'position: absolute;' +
          'top: 50%;' +
          'left: 50%;' +
          'margin: -7.5% 0 0 -7.5%;' +
          'width: 15%;' +
          'height: auto;' +
          'border-radius: 500px;' +
          'border: none;' +
          'cursor: pointer;' +
          'background-color: #003a63;' +
          'opacity: 0.65;' +
          'filter: alpha(opacity = 65);' +
          'transition: opacity 0.2s linear;' +
          'overflow: visible;' +
          'font-size: 0px;' +
          'padding: 0;' +
        '}',

        '.vidyard_wrapper .play-btn .play-btn-size {' +
          'padding-top: 100%;' +
          'width: 100%;' +
        '}',

        '.vidyard_wrapper .play-btn .arrow-size {' +
          'position: absolute;' +
          'top: 50%;' +
          'left: 50%;' +
          'width: 35%;' +
          'height: auto;' +
          'margin: -25% 0 0 -12%;' +
          'overflow: hidden;' +
        '}',

        '.vidyard_wrapper .play-btn .arrow-size-ratio {' +
          'padding-top: 150%;' +
          'width: 100%;' +
        '}',

        '.vidyard_wrapper .play-btn .arrow {' +
          'position: absolute;' +
          'top: 50%;' +
          'left: auto;' +
          'right: 0px;' +
          'bottom: auto;' +
          'width: 0px;' +
          'height: 0px;' +
          'margin: -200px 0 -200px -300px;' +
          'border: 200px solid transparent;' +
          'border-left: 300px solid #ffffff;' +
          'border-right: none;' +
        '}',

        '.splash-screen-wrapper:hover .play-btn,',
        '.vidyard_wrapper:hover .play-btn {' +
          'opacity: 1;' +
          'filter: alpha(opacity = 100);' +
          'zoom: 1;' +
        '}',
        

      ''].join('\n');

      fn_vidyard_create_stylesheet(vidyard_stylesheet);

      if (document.readyState === 'complete') {
        if (!vidyard_secure_JCTFDAUADSfgYDec2FwMPw) {
          integration_tracking_check();
        }

        replacePlayButton();
      } else {
        Vidyard.Helpers.addListener('load', 'onload', function() {
          if (!vidyard_secure_JCTFDAUADSfgYDec2FwMPw) {
            integration_tracking_check();
          }
          replacePlayButton();
        });
      }
    }
  }

  

  create_embed();
  // create an entry in the players dictionary
  Vidyard._players['JCTFDAUADSfgYDec2FwMPw'] = '';
}());



// Fetch Marketo lead data right when DOM loads to make it available
// for form CTAs to be able to prefill or skip if known lead.
Vidyard.marketoData = Vidyard.marketoData || [];

// Callback for JSONP request to contactEmbed.js to fetch contact info
// If the lead is known, make Lead data available to CTAs
var vyContactCallback = function(data) {
  var message,
      marketoData,
      playerIframe;
  if (data === undefined || data.length <= 0) {
    // Marketo lead is not known to us
    return false;
  }
  try {
    marketoData = JSON.parse(data);
  } catch (err) {
    console.error("Error parsing Marketo contact.", err, data);
  }
  if (!marketoData || marketoData.length <= 0) { return false; }

  // Set player param so it gets picked up by iframe url param setter
  vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_lead = marketoData;

  // Send identifyVisitor event into Player IFrame with contact info for forms
  // If IFrame not yet loaded this will either get passed in through query params (lightbox)
  // or tried again after IFrame loads in fn_vidyard_iframe_after_load_JCTFDAUADSfgYDec2FwMPw
  playerIframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
  if ( playerIframe ) {
    message = {'data': {'type': 'marketo', 'value': marketoData}};
    message.event = 'identifyVisitor';
    message.uuid = 'JCTFDAUADSfgYDec2FwMPw';
    playerIframe.contentWindow.postMessage(
      JSON.stringify(message), window.location.protocol + '//play.vidyard.com');
  }
};

(function () {
  function async_load() {
    var contactId = vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_id;
    if (!contactId) {
      // If Marketo cookie not already on DOM, we can safely assume any
      // cookie written subsequently will not be known to us
      return false;
    }

    // Inject script tag into DOM to trigger JSONP request
    var url = window.location.protocol + '//play.vidyard.com'
        + '/v3/JCTFDAUADSfgYDec2FwMPw/contact/' + encodeURIComponent(contactId) + '/marketoContact.js';
    var script = document.createElement('script');
    script.src = url + '?callback=vyContactCallback';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  if (document.readyState === 'complete') {
    async_load();
  } else {
    Vidyard.Helpers.addListener('DOMContentLoaded', 'onload', async_load);
  }
})();
// END Marketo lead pre-fetch

// Creates & returns the iframe html with all the proper widths, heights and query strings

function fn_vidyard_build_iframe_JCTFDAUADSfgYDec2FwMPw(lightbox, iframe_width, iframe_height) {
  if (lightbox) {
    vidyard_JCTFDAUADSfgYDec2FwMPw_params.autoplay = true;
  }

  var referring_url = encodeURIComponent(document.referrer);
  if (referring_url) {
    vidyard_JCTFDAUADSfgYDec2FwMPw_params.referring_url = referring_url;
  }

  var iframe_resizer = "100%";

  // IE compatibility mode has difficulty matching responsive iframe code unless you manually trigger the re-paint:
  if (document.documentMode === 7) {
    var resizeQueued = false;
    var ie7RepaintIframe = function() {
      var iframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
      if (!iframe) { return window.detachEvent('onresize', ie7OnResize); }

      var from = iframe.style.position || 'relative';

      iframe.style.position = from === 'relative' ? 'absolute' : 'relative';
      setTimeout(function() { iframe.style.position = from; }, 1);

      resizeQueued = false;
    };
    var ie7OnResize = function() {
      if (resizeQueued === false) {
        resizeQueued = setTimeout(ie7RepaintIframe, 50);
      }
    };
    window.attachEvent('onresize', ie7OnResize);

    // Try binding to the iframe load as well to make sure it shows then without a resize:
    setTimeout(function() {
      var iframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
      if (!iframe) { return setTimeout(ie7OnResize, 1000); }

      iframe.attachEvent('onload', ie7OnResize);
    }, 300);
  }

  var query_params_string = '';
  if (vidyard_secure_JCTFDAUADSfgYDec2FwMPw === true) {
    query_params_string = vidyard_JCTFDAUADSfgYDec2FwMPw_raw_params;
  } else {
    for (var param in vidyard_JCTFDAUADSfgYDec2FwMPw_params) {
      var param_value = vidyard_JCTFDAUADSfgYDec2FwMPw_params[param];
      if (param_value === true) {
        param_value = '1';
      }
      else if (param_value === false) {
        param_value = '0';
      }
      query_params_string += encodeURIComponent(param) + '=' + encodeURIComponent(param_value) + '&';
    }
  }

  // Fixes incorrect iframe width on IOS when the device is rotated
  var is_ios_mobile = navigator.userAgent.toLowerCase().match(/ip(ad|od|hone)/);
  var ios_width_fix = is_ios_mobile ? 'max-width: 100%; min-width: 100%; width: 100vw;' : '';

  return '<span id="vidyard_span_JCTFDAUADSfgYDec2FwMPw" style="display: block; margin: auto; position: relative; width: ' + iframe_width + 'px; height: ' + iframe_height + 'px;"><iframe id="vidyard_iframe_JCTFDAUADSfgYDec2FwMPw" class="vidyard_iframe" src="//play.vidyard.com/JCTFDAUADSfgYDec2FwMPw?' + query_params_string + '" width="' + iframe_resizer + '" height="100%" title="Video" aria-label="Video" scrolling=no frameborder=0 allowtransparency="true" allowfullscreen allow="autoplay" referrerpolicy="no-referrer-when-downgrade" style="opacity: 0; background-color: transparent; position: absolute; ' + ios_width_fix + ' right: 0px; top: 0px;"></iframe></span>';
}

// --- If the browser is FF, reload the iframe with the given id
function fn_vidyard_iframe_after_load_JCTFDAUADSfgYDec2FwMPw() {
  var _theframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
  if (_theframe) {
    _theframe.style.opacity = '1';

    _theframe.focus();
    _theframe.contentWindow.focus();

    // If this is a secure lightbox embed, we have to start checking for integrations now
    if (vidyard_secure_JCTFDAUADSfgYDec2FwMPw === true && vidyard_JCTFDAUADSfgYDec2FwMPw_params.type === 'lightbox') {
      vidyard_integration_check_JCTFDAUADSfgYDec2FwMPw();
    }
    // Pass Marketo Lead data into Player iFrame
    // There still exists a small race condition if player is started before contact callback
    // this event will reach CtaManager AFTER showCta has already been triggered.
    if (vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_lead) {
      var message = {'data': {'type': 'marketo', 'value': vidyard_JCTFDAUADSfgYDec2FwMPw_params.marketo_lead }};
      message.event = 'identifyVisitor';
      message.uuid = 'JCTFDAUADSfgYDec2FwMPw';
      Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw')
        .contentWindow.postMessage(JSON.stringify(message), window.location.protocol + '//play.vidyard.com');
    }
  }
}

function fn_vidyard_create_stylesheet(cssString) {
  var styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');

  if (styleElement.styleSheet) {
    // IE
    styleElement.styleSheet.cssText = cssString;
  } else {
    // All others
    var textElement = document.createTextNode(cssString);
    styleElement.appendChild(textElement);
  }

  var headElement = document.getElementsByTagName('head')[0];
  headElement.appendChild(styleElement);
}

// --- Begin Embed JS (resizing, opening/closing, fading in/out) ---

function fn_vidyard_JCTFDAUADSfgYDec2FwMPw() {
  var vidyard = {};

  vidyard.box = function() {
    var j, m, b, g, s, iframe_settings, vidyard_tinner = 0;

    return {
      show:function(initial_iframe_settings) {
        var showCore = function () {
          // If already playing a lightbox player, should not play another one.
          if (Vidyard.currently_playing) {
            return;
          }
          Vidyard.currently_playing = true;
          iframe_settings = { opacity: 95, close: 1, animate: 1, fixed: 1, maskid: '', boxid: '', topsplit: 2, url: 0, post: 0, height: 0, width: 0, html: 0, iframe: 0 };
          // Set all the properties of
          for(s in initial_iframe_settings){
            iframe_settings[s] = initial_iframe_settings[s];
          }

          var width_height = this.lock_to_aspect_ratio(iframe_settings.width, iframe_settings.height, (319 + (vidyard_player_width_JCTFDAUADSfgYDec2FwMPw / 5)));
          iframe_settings.width = width_height[0];
          iframe_settings.height = width_height[1];

          if(!vidyard_tinner) {
            // This is the only way to define pseudo class styles programatically without using javascript events

            var vidyard_stylesheet2 = [
              '.vidyard_tclose { position:absolute; top:0px; left:2px; width:30px; height:30px; cursor:pointer; background-image:url(https://play.vidyard.com/close.png); background-repeat:no-repeat; background-position: 2px 2px; background-color: rgba(0,0,0,0); border: none; opacity: 0.75; padding: 0; }',
              '.vidyard_tclose:hover, .vidyard_tclose:focus { background-position: 2px -28px; opacity: 1; }'].join('\n');

            fn_vidyard_create_stylesheet(vidyard_stylesheet2);

            Vidyard.Helpers.remove(window.vidyard_tbox);
            Vidyard.Helpers.remove(window.vidyard_tmask);

            // Div which contains the vidyard iframe / tinner
            vidyard_tbox = document.createElement('div');
            vidyard_tbox.className = 'vidyard_tbox';
            vidyard_tbox.style.cssText = 'display:none; padding:14px 17px; z-index:900;';

            // Black side bars around player, directly inside vidyard_tbox
            vidyard_tinner = document.createElement('div');
            vidyard_tinner.className = 'vidyard_tinner';
            vidyard_tinner.style.cssText = "padding:0; background:#000000 url(https://play.vidyard.com/loader_black.gif) no-repeat 50% 50%;";

            // Directly within vidyard_tinner
            vidyard_tcontent = document.createElement('div');
            vidyard_tcontent.className ='vidyard_tcontent';

            // Dark overlay over site
            vidyard_tmask = document.createElement('div');
            vidyard_tmask.className = 'vidyard_tmask';
            vidyard_tmask.style.cssText = 'position:fixed; width:100%; overflow:hidden; height:100%; display:none; top:0px; left:0px; background-color:#111; z-index:800;';

            // Little close circle on top left of player
            vidyard_tclose = document.createElement('button');
            vidyard_tclose.className ='vidyard_tclose';
            vidyard_tclose.iframe_settings = 0;
            vidyard_tclose.setAttribute('aria-label', 'Close Video' );
            vidyard_tclose.setAttribute('role', 'button');

            // Add/create heierarchy of divs
            document.body.appendChild(vidyard_tmask);
            document.body.appendChild(vidyard_tbox);
            vidyard_tbox.appendChild(vidyard_tinner);
            vidyard_tinner.appendChild(vidyard_tcontent);

            vidyard_tmask.onclick = vidyard_tclose.onclick = vidyard.box.hide;
            Vidyard.Helpers.addListener('resize', 'onresize', vidyard.box.resize);
          } else {
            vidyard_tbox.style.display = 'none';
            clearTimeout(vidyard_tinner.ah);

            if(vidyard_tclose.iframe_settings) {
              vidyard_tinner.removeChild(vidyard_tclose);
              vidyard_tclose.iframe_settings = 0;
            }
          }

          vidyard_tinner.id = iframe_settings.boxid;
          vidyard_tmask.id = iframe_settings.maskid;
          vidyard_tbox.style.position = iframe_settings.fixed ? 'fixed' : 'absolute';

          // Setup tinner depending on if animations are going to be used
          if(iframe_settings.html && !iframe_settings.animate) {
            vidyard_tinner.style.backgroundImage = 'none';
            vidyard_tcontent.innerHTML = iframe_settings.html;
            vidyard_tcontent.style.display = '';
            vidyard_tinner.style.width = iframe_settings.width ? iframe_settings.width + 'px' : 'auto';
            vidyard_tinner.style.height = iframe_settings.height ? iframe_settings.height + 'px' : 'auto';
          } else {
            vidyard_tcontent.style.display = 'none';
            if(!iframe_settings.animate && iframe_settings.width && iframe_settings.height) {
              vidyard_tinner.style.width=  iframe_settings.width + 'px';
              vidyard_tinner.style.height = iframe_settings.height + 'px';
            } else {
              vidyard_tinner.style.width = vidyard_tinner.style.height = '100px';
            }
          }

          this.create_focus_intercepts();

          // Fade in the mask & setup the iframe to play on complete
          this.start_alpha_animation(vidyard_tmask, 1, iframe_settings.opacity);

          document.onkeyup = vidyard.box.escape;
        }.bind(this);

        // requestAnimationFrame doesn't exist in browsers lower than ie10
        if(window.requestAnimationFrame) {
          // Repeated opening and closing of the lightbox iniates a fresh page re-paint causing thrashing.
          // This affects the browser history, notably in Chrome. requestAnimationFrame reduces the amount function
          // calls to max 60fps which also reduces the amount of thrashing that occurs.
          window.requestAnimationFrame(function() {
            showCore();
          });
        } else {
          showCore();
        }

      },
      lock_to_aspect_ratio: function(w, h, minimum_width) {
        var v_box = vidyard.box;
        var viewport_width = this.width() - 60;
        var viewport_height = this.height() - 60;
        var aspect_ratio = w / h;

        // If neither width or height is larger than viewport, do nothing
        if(w < viewport_width && h < viewport_height) {
          return [w, h];
        }

        w = v_box.locked_width(w);

        h = w / aspect_ratio;
        if(h > viewport_height) {
          h = v_box.locked_height(h);
          w = h * aspect_ratio;
        }

        return [w, h];
      },
      locked_width: function(w) {
        var v_box = vidyard.box;

        if(w > v_box.width() - 60) {
          w = v_box.width() - 60;
        }

        return w;
      },
      locked_height: function(h) {
        var v_box = vidyard.box;

        if(h > v_box.height() - 60) {
          h = v_box.height() - 60;
        }

        return h;
      },
      // Fills the iframe with content OR calls set_tinner_size
      fill_iframe: function(settings_html_url, has_element, use_post_request, should_animate, width, height) {
        if(has_element) {
          if(iframe_settings.image) {
            // Fill the iframe with a splash screen
            var i = new Image();
            i.onload = function() {
              width = width || i.width;
              height = height || i.height;
              vidyard.box.set_tinner_size(i, should_animate, width, height);
            }

            i.src = iframe_settings.image;
          } else if(iframe_settings.iframe) {
            this.set_tinner_size(fn_vidyard_build_iframe_JCTFDAUADSfgYDec2FwMPw(true, width, height), should_animate, width, height);
          } else {
            // Fill the iframe with an email gate
            var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            x.onreadystatechange = function() {
              if(x.readyState == 4 && x.status == 200) {
                vidyard_tinner.style.backgroundImage = '';
                vidyard.box.set_tinner_size(x.responseText, should_animate, width, height);
              }
            }

            //Either get or set the email gate form
            if(use_post_request) {
              x.open('POST', settings_html_url, true);
              x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              x.send(use_post_request);
            } else {
              x.open('GET', settings_html_url, true);
              x.send(null);
            }
          }
        } else {
          this.set_tinner_size(settings_html_url, should_animate, width, height);
        }
      },
      // This finds the target tinner width/height then starts the animation process
      set_tinner_size: function(settings_html_url, should_animate, width, height) {
        if (typeof settings_html_url == 'object') {
          vidyard_tcontent.appendChild(settings_html_url);
        } else {
          vidyard_tcontent.innerHTML = settings_html_url;
        }

        var iframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
        var iframeIsLoaded = false;
        var iframeLoadedCallback = function() {
          if (iframeIsLoaded) { return; }
          iframeIsLoaded = true;

          fn_vidyard_iframe_after_load_JCTFDAUADSfgYDec2FwMPw();
        };
        var windowMessageCallback = function(postMessageEvent) {
          try {
            // Invoke the callback on the first message from the iframe
            if (postMessageEvent.source !== iframe.contentWindow) { return; }
            iframeLoadedCallback();

          // If this fails, just rely on the iframe load event to invoke the callback
          } catch(e) {}
        };

        Vidyard.Helpers.addListener('load', 'onload', iframeLoadedCallback, iframe);
        Vidyard.Helpers.addListener('message', 'onmessage', windowMessageCallback);

        var x = vidyard_tinner.style.width;
        var y = vidyard_tinner.style.height;

        if (!width || !height) {
          vidyard_tinner.style.width = width ? width + 'px' : '';
          vidyard_tinner.style.height = height ? height + 'px' : '';
          vidyard_tcontent.style.display = '';

          if (!height) {
            height = parseInt(vidyard_tcontent.offsetHeight);
          }

          if (!width) {
            width = parseInt(vidyard_tcontent.offsetwidth);
          }

          vidyard_tcontent.style.display = 'none';
        }

        vidyard_tinner.style.width = x;
        vidyard_tinner.style.height = y;

        this.start_tinner_animation(should_animate, width, height);
      },
      // setups tinner animation or just auto snaps to the correct width/height
      start_tinner_animation: function(should_animate, width, height) {
        if (should_animate) {
          clearInterval(vidyard_tinner.si);
          var width_moving_outwards = parseInt(vidyard_tinner.style.width) > width ? -1 : 1;
          var height_moving_outwards = parseInt(vidyard_tinner.style.height) > height ? -1 : 1;

          // Update tinner size every 20ms
          vidyard_tinner.si = setInterval(function() {
            vidyard.box.animate_tinner_size(width, width_moving_outwards, height, height_moving_outwards);
          }, 20);
        } else {
          vidyard_tinner.style.backgroundImage = 'none';

          if(iframe_settings.close) {
            vidyard_tinner.appendChild(vidyard_tclose);
            vidyard_tclose.v = 1;
          }

          vidyard_tinner.style.width = width + 'px';
          vidyard_tinner.style.height = height + 'px';
          vidyard_tcontent.style.display = '';
          this.set_absolute_top_left();

          if (iframe_settings.openjs) {
            iframe_settings.openjs();
          }
        }
      },
      // Animate tinner to the correct size (width/height_moving_outwards is whether or not the box is expanding)
      animate_tinner_size: function(target_width, width_moving_outwards, target_height, height_moving_outwards) {
        var width = parseInt(vidyard_tinner.style.width);
        var height = parseInt(vidyard_tinner.style.height);

        if(this.within_target(width, 2, target_width) && this.within_target(height, 2, target_height)) {
          // Done animating make video visible and show the close button
          clearInterval(vidyard_tinner.si);

          vidyard_tinner.style.backgroundImage = 'none';
          vidyard_tcontent.style.display = 'block';

          if (iframe_settings.close) {
            vidyard_tinner.appendChild(vidyard_tclose);
            vidyard_tclose.v = 1;
          }

          if (iframe_settings.openjs) {
            iframe_settings.openjs();
          }
        } else {
          // Not done animating, update width/ height
          if(!this.within_target(width, 2, target_width)) {
            vidyard_tinner.style.width = (target_width - Math.floor(Math.abs(target_width - width) * .6) * width_moving_outwards) + 'px';
          }
          if(!this.within_target(height, 2, target_height)) {
            vidyard_tinner.style.height = (target_height - Math.floor(Math.abs(target_height - height) * .6) * height_moving_outwards) + 'px';
          }

          this.set_absolute_top_left();
        }
      },
      escape: function(e) {
        e = e || window.event;
        if(e.keyCode == 27) { vidyard.box.hide(); }
      },
      hide: function() {
        var hideCore = function () {
          vidyard.box.start_alpha_animation(vidyard_tbox, -1, 0);
          document.onkeypress = null;
          Vidyard.currently_playing = false;

          Vidyard.Helpers.removeListener('resize', 'onresize', vidyard.box.resize);
          Vidyard.Helpers.removeListener('focusin', 'onfocusin', this.move_focus_to_iframe, vidyard_tfocus_top, true);
          Vidyard.Helpers.removeListener('focusin', 'onfocusin', this.move_focus_to_iframe, vidyard_tfocus_lightbox, true);
          Vidyard.Helpers.removeListener('blur', 'onblur', this.move_focus_to_iframe_body, window, true);

          Vidyard.Helpers.remove(window.vidyard_tfocus_top);
          Vidyard.Helpers.remove(window.vidyard_tfocus_lightbox);
        }.bind(this);

        // requestAnimationFrame doesn't exist in browsers lower than ie10
        if(window.requestAnimationFrame) {
          // Repeated opening and closing of the lightbox iniates a fresh page re-paint causing thrashing.
          // This affects the browser history, notably in Chrome. requestAnimationFrame reduces the amount function
          // calls to max 60fps which also reduces the amount of thrashing that occurs.
          window.requestAnimationFrame(function() {
            hideCore();
          });
        } else {
          hideCore();
        }
      },
      // Fired on every resize event
      resize: function() {
        var v_box = vidyard.box;

        var width_height = v_box.lock_to_aspect_ratio(
            vidyard_player_width_JCTFDAUADSfgYDec2FwMPw,
            vidyard_player_height_JCTFDAUADSfgYDec2FwMPw,
            319 + (vidyard_player_width_JCTFDAUADSfgYDec2FwMPw / 5)
        );

        iframe_settings.width = width_height[0];
        iframe_settings.height = width_height[1];

        var vidyard_iframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
        var vidyard_span = document.getElementById('vidyard_span_JCTFDAUADSfgYDec2FwMPw');

        // Increase the size of the iframe if there are CTA's present & not disabled
        var iframe_width = iframe_settings.width;

        vidyard_iframe.style.width = iframe_width + 'px';
        vidyard_tinner.style.width = iframe_settings.width + 'px';
        vidyard_tbox.style.width = iframe_settings.width + 28 + 'px';
        vidyard_tcontent.style.width = iframe_settings.width + 'px';
        vidyard_span.style.width = iframe_settings.width + 'px';

        vidyard_tinner.style.height = iframe_settings.height + 'px';
        vidyard_tbox.style.height = iframe_settings.height + 28 + 'px';
        vidyard_tcontent.style.height = iframe_settings.height + 'px';
        vidyard_span.style.height = iframe_settings.height + 'px';
        vidyard_iframe.style.height = iframe_settings.height + 'px';

        vidyard.box.set_absolute_top_left();
      },
      set_absolute_top_left: function() {
        var top_offset;

        if (typeof iframe_settings.top != 'undefined') {
          top_offset = iframe_settings.top;
        } else {
          top_offset = (this.height() / iframe_settings.topsplit) - (vidyard_tbox.offsetHeight / 2);
        }

        if (!iframe_settings.fixed && !iframe_settings.top) {
          top_offset += this.top();
        }

        vidyard_tbox.style.top = top_offset + 'px';
        if (typeof iframe_settings.left != 'undefined') {
          vidyard_tbox.style.left = iframe_settings.left + 'px';
        } else {
          vidyard_tbox.style.left = (this.width() / 2) - (vidyard_tbox.offsetWidth / 2) + 'px';
        }

        if(parseInt(vidyard_tbox.style.left, 10) < 16) {
          vidyard_tbox.style.left = '16px';
        }

        if(parseInt(vidyard_tbox.style.top, 10) < 16) {
          vidyard_tbox.style.top = '16px';
        }
      },
      start_alpha_animation: function(element_to_fade, fading_in, target_alpha) {
        if (window.requestAnimationFrame) {
          window.cancelAnimationFrame(element_to_fade.ai);
        } else {
          clearInterval(element_to_fade.ai);
        }

        if (fading_in) {
          element_to_fade.style.opacity = 0;
          element_to_fade.style.filter = 'alpha(opacity=0)';
          element_to_fade.style.display = 'block';
          vidyard.box.set_absolute_top_left();
        }

        var startAnimationCore = function() {
          element_to_fade.ai = window.requestAnimationFrame(startAnimationCore);
          vidyard.box.fade_element(element_to_fade, fading_in, target_alpha);
        };

        // Update the alpha of element_to_fade every 20ms
        if (window.requestAnimationFrame) {
          startAnimationCore();
        } else {
          element_to_fade.ai = setInterval(function() {
            vidyard.box.fade_element(element_to_fade, fading_in, target_alpha);
          }, 20);
        }
      },
      fade_element: function(element_to_fade, fading_in, target_alpha) {
        var old_opacity = Math.round(element_to_fade.style.opacity * 100);
        if (old_opacity == target_alpha) {
          if (window.requestAnimationFrame) {
            window.cancelAnimationFrame(element_to_fade.ai);
          } else {
            clearInterval(element_to_fade.ai);
          }

          if (fading_in == -1) {
            // Not fading in? then are fading out, destroy iframe content etc
            element_to_fade.style.display = 'none';
            Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw').src = '';

            if(element_to_fade == vidyard_tbox) {
              vidyard.box.start_alpha_animation(vidyard_tmask, -1, 0);
            } else {
              vidyard_tcontent.innerHTML = vidyard_tinner.style.backgroundImage = '';
            }
          } else {
            if(element_to_fade == vidyard_tmask) {
              this.start_alpha_animation(vidyard_tbox, 1, 100);
            } else {
              // vidyard_tbox is done fading
              vidyard_tbox.style.filter = '';
              vidyard.box.fill_iframe(iframe_settings.html || iframe_settings.url, iframe_settings.url || iframe_settings.iframe || iframe_settings.image, iframe_settings.post, iframe_settings.animate, iframe_settings.width, iframe_settings.height);
            }
          }
        } else {
          // Not done fading, update alpha
          var new_opacity = target_alpha - Math.floor(Math.abs(target_alpha - old_opacity) * .5) * fading_in;
          element_to_fade.style.opacity = new_opacity / 100;
          element_to_fade.style.filter = 'alpha(opacity=' + new_opacity + ')';
        }
      },
      // The below functions just get whichever version of top, width, height that is available
      top: function() { return document.documentElement.scrollTop || document.body.scrollTop; },
      width: function() {
        if(typeof(window.innerWidth) === 'number') {
          // Modern Browsers
          return window.innerWidth;
        } else if(document.documentElement && document.documentElement.clientHeight) {
          // IE6 and above
          return document.documentElement.clientWidth;
        } else if(document.body && document.body.clientWidth) {
          // IE 4 and some other versions of IE
          return document.body.clientWidth;
        }
      },
      height: function() {
        if(typeof(window.innerHeight) === 'number') {
          // Modern Browsers
          return window.innerHeight;
        } else if(document.documentElement && document.documentElement.clientHeight) {
          // IE6 and above
          return document.documentElement.clientHeight;
        } else if(document.body && document.body.clientHeight) {
          // IE 4 and some other versions of IE
          return document.body.clientHeight;
        }
      },
      within_target: function(base, range, target) { return (base + range) > target && (base - range) < target; },
      largest_document_measurement: function(get_height) {
        var doc_body = document.body, doc_element = document.documentElement;

        if (get_height) {
          return Math.max(Math.max(doc_body.scrollHeight, doc_element.scrollHeight),
              Math.max(doc_body.clientHeight, doc_element.clientHeight));
        }

        return Math.max(Math.max(doc_body.scrollWidth, doc_element.scrollWidth),
            Math.max(doc_body.clientWidth, doc_element.clientWidth));
      },
      create_focus_intercepts: function() {
        // Create an empty div element (vidyard_tfocus_top) with tabindex=0 at the top of the body, with position="fixed".
        // Doing captures the tabbing as the focus goes from the address bar to the first element in the body,
        // and with fixed positioning, prevents the page from scrolling up. (Interrupting the focus event could not prevent this.)
        // When tabbing to vidyard_tfocus_top, it will shift the focus to the lightbox iframe.
        if (!document.querySelector('.vidyard_tfocus_top')) {
          vidyard_tfocus_top = document.createElement('div');
          vidyard_tfocus_top.className = "vidyard_tfocus_top";
          vidyard_tfocus_top.style.position = "fixed";
          vidyard_tfocus_top.tabIndex = 0;
        }
        // Create another empty div element (vidyard_tfocus_start) with the same goal, except to prevent
        // the page from scrolling when you shift-tab from the iframe out to the parent frame.
        // This element will prevent the page from scrolling and keep the focus in the lightbox.
        if (!document.querySelector('.vidyard_tfocus_lightbox')) {
          vidyard_tfocus_lightbox = document.createElement('div');
          vidyard_tfocus_lightbox.className = "vidyard_tfocus_lightbox";
          vidyard_tfocus_lightbox.tabIndex = 0;
        }

        // Insert vidyard_tfocus_top as the first element in the body.
        document.body.insertBefore(vidyard_tfocus_top, document.body.firstChild);
        // Insert vidyard_tfocus_lightbox as the first element before the lightbox
        vidyard_tbox.insertBefore(vidyard_tfocus_lightbox, vidyard_tbox.firstChild);

        Vidyard.Helpers.addListener('focusin', 'onfocusin', this.move_focus_to_iframe, vidyard_tfocus_top, true);
        Vidyard.Helpers.addListener('focusin', 'onfocusin', this.move_focus_to_iframe, vidyard_tfocus_lightbox, true);
        Vidyard.Helpers.addListener('focusin', 'onfocusin', this.move_focus_to_iframe_from_body, window, true); // In case focus does go outside vidyard_tbox
        vidyard_tfocus_lightbox.focus();
      },
      move_focus_to_iframe: function(event) {
        var vidyard_iframe = Vidyard.Helpers.getPlayerIFrame('JCTFDAUADSfgYDec2FwMPw');
        if (vidyard_iframe && window.postMessage) {
          vidyard_iframe.focus();
          var message = {
            'event': 'resetFocus',
            'uuid': 'JCTFDAUADSfgYDec2FwMPw'
          };
          vidyard_iframe.contentWindow.postMessage(JSON.stringify(message), window.location.protocol + '//play.vidyard.com');
        }
      },
      move_focus_to_iframe_from_body: function(event) {
        if (event.target !== window && !vidyard_tbox.contains(event.target)) {
          vidyard.box.move_focus_to_iframe(event);
        }
      }
    }
  }();

  vidyard.box.show({
    iframe: '#', width: vidyard_player_width_JCTFDAUADSfgYDec2FwMPw,
    height: vidyard_player_height_JCTFDAUADSfgYDec2FwMPw,
    animate: !vidyard_html5_JCTFDAUADSfgYDec2FwMPw,
    fixed: true
  });
}
