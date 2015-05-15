/********* JS for PhyloCanvas API Site **************/

$(document).ready(function(){
  $('[data-toggle="leftMenuToggle"]').click(function () {
    $('#leftmenu').toggleClass('hidden-xs')
  });

	/**** For github fork stick on scroll ****/
	var s = $("#fork");
	var pos = s.position();
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top) {
			s.addClass("stick");
		} else {
			s.removeClass("stick");
		}
	});

});

var phylocanvas;
function createOverviewTree() {
    // Construct tree object
    phylocanvas = new PhyloCanvas.Tree('phylocanvas', { historyCollapsed : true });
    phylocanvas.showLabels = true;
    phylocanvas.hoverLabel = true;
    phylocanvas.setTreeType('circular');
    // phylocanvas.nodeAlign = false;
    // phylocanvas.setTreeType('rectangular');
    phylocanvas.addListener('loaded', getData);
    phylocanvas.addListener('error', function(evt){
        alert(evt.message);
    });

    // load tree via AJAX and render using default params
    phylocanvas.load('docs/data/tree.nwk');
}


function getData()
{
    phylocanvas.AJAX('docs/data/mrsa.json', 'GET', '', colour);
}

function colour(response) {
    var colours = ['teal', '#762a83', '#777'];

    var data = JSON.parse(response.response);

    phylocanvas.setNodeColourAndShape(data.positive, colours[0], 'x');
    phylocanvas.setNodeColourAndShape(data.negative, colours[1], 'o');

    phylocanvas.backColour = function(node){
        if(node.children.length) {
            var child_cols = node.getChildColours();
            if(child_cols.length === 1) {
                return child_cols[0];
            }
            else {
                return colours[2];
            }
        }
        else {
            return node.colour;
        }
    };
}

$(document).on('click','#pc-buttons .btn', {} ,function(e){
    $('#pc-buttons .btn').removeClass('btn-info');
    $('#pc-buttons .btn').addClass('btn-default');
    $(this).addClass('btn-info');
	phylocanvas.setTreeType(this.id);
});

$(document).on('click','.showExample', {}, function(e){
    if($(this).html() == "View live") {
      console.log($(this).next('#jsbin_example').length);
        $(this).next('#jsbin_example').show();
        if($(this).next('#jsbin_example').length <= 0) {
            var ifr = document.createElement('iframe');
            ifr.width = "100%";
            ifr.height = $(this).attr('data-height');
            ifr.src = $(this).attr('data-href');
            var div = document.createElement('div');
            div.id = "jsbin_example";
            div.appendChild(ifr);
            $(div).insertAfter($(this));
        }
        else {
          $(this).next('#jsbin_example').show();
        }
        $(this).html('Hide');
    }
    else {
      $(this).next('#jsbin_example').hide();
      $(this).html('View live');
    }
});

