/********* JS for PhyloCanvas API Site **************/
var phylocanvas;
$(document).ready(function () {
  $('[data-toggle="leftMenuToggle"]').click(function () {
    $('#leftmenu').toggleClass('hidden-xs');
  });

  /**** For github fork stick on scroll ****/
  var s = $('#fork');
  var pos = s.position();
  $(window).scroll(function () {
    var windowpos = $(window).scrollTop();
    if (windowpos >= pos.top) {
      s.addClass('stick');
    } else {
      s.removeClass('stick');
    }
  });
});

function colour(response) {
  var colours = [ 'teal', '#762a83', '#777' ];

  var data = JSON.parse(response.response);

  phylocanvas.setNodeColourAndShape(data.positive, colours[0], 'x');
  phylocanvas.setNodeColourAndShape(data.negative, colours[1], 'o');

  phylocanvas.backColour = function (node) {
    if (node.children.length) {
      var childColours = node.getChildColours();
      if (childColours.length === 1) {
        return childColours[0];
      } else {
        return colours[2];
      }
    } else {
      return node.colour;
    }
  };
}

function getData() {
  phylocanvas.AJAX('data/mrsa.json', 'GET', '', colour);
}

function createOverviewTree() {
  // Construct tree object
  phylocanvas = new PhyloCanvas.Tree('phylocanvas');
  phylocanvas.showLabels = true;
  phylocanvas.hoverLabel = true;
  phylocanvas.setTreeType('circular');
  // phylocanvas.nodeAlign = false;
  // phylocanvas.setTreeType('rectangular');
  phylocanvas.addListener('loaded', getData);
  phylocanvas.addListener('error', function (evt) {
    alert(evt.message);
  });

  // load tree via AJAX and render using default params
  phylocanvas.load('data/tree.nwk');
}


$(document).on('click', '#pc-buttons .btn', {}, function () {
  $('#pc-buttons .btn').removeClass('btn-info');
  $('#pc-buttons .btn').addClass('btn-default');
  $(this).addClass('btn-info');
  phylocanvas.setTreeType(this.id);
});

$(document).on('click', '.showExample', {}, function () {
  if ($(this).html() === 'View live') {
    console.log($(this).next('#jsbin_example').length);
    $(this).next('#jsbin_example').show();
    if ($(this).next('#jsbin_example').length <= 0) {
      var ifr = document.createElement('iframe');
      ifr.width = '100%';
      ifr.height = $(this).attr('data-height');
      ifr.src = $(this).attr('data-href');
      var div = document.createElement('div');
      div.id = 'jsbin_example';
      div.appendChild(ifr);
      $(div).insertAfter($(this));
    } else {
      $(this).next('#jsbin_example').show();
    }
    $(this).html('Hide');
  } else {
    $(this).next('#jsbin_example').hide();
    $(this).html('View live');
  }
});
