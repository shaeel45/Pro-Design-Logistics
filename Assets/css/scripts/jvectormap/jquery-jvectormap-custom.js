
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0;i < hashes.length;i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
function getUrlVar(name) {
  return getUrlVars()[name];
}

$(document).ready(function() {
  map = new jvm.Map({
    map: 'continents_merc',
    container: $('#world-map'),
    onRegionClick: function(event, code) {
      $('#language-accordion #' + code).trigger('click');
    },
    scrollWheelZoom: false,
    zoomMin: 1,
    zoomMax: 1,
    backgroundColor: 'transparent',
    regionsSelectable: true,
    regionsSelectableOne: true,
    regionStyle: {
      initial: {
        fill: '#ccc',
        "fill-opacity": 1,
        stroke: 'none',
        "stroke-width": 0,
        "stroke-opacity": 1
      },
      hover: {
        "fill-opacity": .8,
        cursor: 'pointer'
      },
      selected: {
        fill: '#00a3e0'
      },
      selectedHover: {
        "fill-opacity": .8,
        cursor: 'pointer'
      }
    }
  });

  // $('[data-code="AF"]').removeClass('jvectormap-element').attr('fill', '#f0f0f0');
  $('[data-code="RU"]').removeClass('jvectormap-element').attr('fill', '#f0f0f0');
  $('[data-code="GL"]').removeClass('jvectormap-element').attr('fill', '#f0f0f0');
  map.setSelectedRegions({NA: true});

  function selectedRegions(regionCode) {
    if(regionCode === 'NA') {
      map.setSelectedRegions({NA: true, SA: false, EU: false, AS: false, IN: false, OC: false, AF: false, ME: false});
    } else if(regionCode === 'SA') {
      map.setSelectedRegions({NA: false, SA: true, EU: false, AS: false, IN: false, OC: false, AF: false, ME: false});
    } else if(regionCode === 'EU') {
      map.setSelectedRegions({NA: false, SA: false, EU: true, AS: false, IN: false, OC: false, AF: false, ME: false});
    } else if(regionCode === 'AS') {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: true, IN: false, OC: false, AF: false, ME: false});
    } else if(regionCode === 'IN') {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: false, IN: true, OC: false, AF: false, ME: false});
    } else if(regionCode === 'OC') {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: false, IN: false, OC: true, AF: false, ME: false});
    } else if(regionCode === 'AF') {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: false, IN: false, OC: false, AF: true, ME: false});
    } else if(regionCode === 'ME') {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: false, IN: false, OC: false, AF: false, ME: true});
    } else {
      map.setSelectedRegions({NA: false, SA: false, EU: false, AS: false, IN: false, OC: false, AF: false, ME: false});
    }
  }

  //$('a.accordion-toggle').click(function (evt) {
  //    evt.preventDefault();
  //    var code = $(this).attr('id');
  //    selectedRegions(code);
  //if ($('.panel-collapse.in')) {
  //       $('.panel-collapse').slideUp();//.removeClass('show').css("transition","");
  //       $($(this).attr('href')).slideDown();//.addClass('show').css("transition","display 0.3s");
  //}
  //});
  $('a.accordion-toggle').click(function(evt) {
    evt.preventDefault();
  });
  $('.panel-heading').click(function() {
    var code = $(this).find("a.accordion-toggle").attr('id');
    selectedRegions(code);
    $(this).siblings().removeClass("toggleHeading");
    $(this).toggleClass("toggleHeading");
    $('.panel-collapse').slideUp();//.removeClass('show').css("transition","");
    $($(this).find("a.accordion-toggle").attr('href')).slideDown();
    //.addClass('show').css("transition","display 0.3s");
    //}
  });



  var qsRegion = getUrlVar('region');
  var qsCurrentID = $('.panel-title #' + qsRegion).attr('href');
  if(qsRegion) {
    selectedRegions(qsRegion);
    $(qsCurrentID).addClass('show');
  } else {
    var currentRegion = $('.current-region').attr('data-region');
    var currentID = $('.panel-title #' + currentRegion).attr('href');
    if(currentRegion) {
      selectedRegions(currentRegion);
      $(currentID).addClass('show');
      $(currentID).prev().addClass('toggleHeading');
    }
  }
});