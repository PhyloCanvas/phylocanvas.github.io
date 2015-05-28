var phylocanvas;
var metadata;
var treeTypeSelected;
(function () {
  function loadSlider(val) {
    $('.slider_text' ).slider({
      value: val,
      min: val - 10,
      max: val + 10
    });
  }
  // Render Tree
  function renderPhyloCanvas(tree) {
    // Construct tree object
    phylocanvas = new PhyloCanvas.Tree('phylocanvas', {
      historyCollapsed: true
    });
    if (treeTypeSelected) {
      phylocanvas.setTreeType(treeTypeSelected);
    } else {
      phylocanvas.setTreeType('rectangular');
    }
    phylocanvas.nodeAlign = true;

    phylocanvas.addListener('loaded', function () {
      loadSlider(phylocanvas.textSize);
    });
    phylocanvas.addListener('subtree', function () {
      loadSlider(phylocanvas.textSize);
    });
    phylocanvas.addListener('typechanged', function () {
      loadSlider(phylocanvas.textSize);
    });

    phylocanvas.load(tree);
    window.phylocanvas = phylocanvas;
  }

  function createColumnCheckboxes(columnHeaders) {
    var container = document.getElementById('metadataColumns');
    var div = document.createElement('div');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    var i;

    checkbox.type = 'checkbox';
    checkbox.name = 'selectAll';
    checkbox.value = 'metadataColumnSelectAll';
    checkbox.id = 'metadataColumnSelectAllCheckbox';
    checkbox.checked = true;

    label.htmlFor = 'Select All';
    label.appendChild(document.createTextNode('Select All'));

    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);

    for (i = 0; i < columnHeaders.length; i++) {
      div = document.createElement('div');
      checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'metadata_columns_checkbox';
      checkbox.value = columnHeaders[i];
      checkbox.id = 'metadata_columns_checkbox';
      checkbox.checked = true;

      label = document.createElement('label');
      label.htmlFor = columnHeaders[i];
      label.appendChild(document.createTextNode(columnHeaders[i]));

      div.appendChild(checkbox);
      div.appendChild(label);
      container.appendChild(div);
    }
  }

  function renderMetadata() {
    var id;
    $('#metadata_li').show();
    phylocanvas.clearMetadata();
    for (id in metadata.parsedData) {
      if (phylocanvas.branches[id]) {
        phylocanvas.branches[id].data = metadata.parsedData[id];
      }
    }
    phylocanvas.viewMetadataColumns();
    createColumnCheckboxes(metadata.columnHeaders);
  }

  // output information
  function outputMessage(msg) {
    $('#messages').html(msg).effect('highlight', { color: 'orange' }, 3000);
  }

  // file drag hover
  function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    // e.target.className = (e.type == "dragover" ? "hover" : "");
    if (e.type === 'dragover') {
      $('body').addClass('hover');
      $('.centermiddle').children('i').addClass('fa-spin');
    } else {
      $('.centermiddle').children('i').removeClass('fa-spin');
      $('body').removeClass('hover');
    }
  }

  function colorTree(colorData) {
    var id;
    for (id in colorData.parsedData) {
      if (phylocanvas.branches[id]) {
        phylocanvas.branches[id].colour = colorData.parsedData[id];
      }
    }
    phylocanvas.backColour = true;
    phylocanvas.draw();
  }

  function validateColor(color) {
    var color2 = '';
    var result = true;
    var e = document.createElement('mydiv');
    e.style.borderColor = '';
    e.style.borderColor = color;
    color2 = e.style.borderColor;
    if (color2.length === 0) {
      result = false;
    }
    e.style.borderColor = '';
    return result;
  }

  // Parse CSV file with headers
  function csvToJson(csv) {
    var lines = csv.split('\n');
    var result = {};
    var headers = lines[0].split(',');
    var isColorFile = false;
    var i;
    var j;
    var currentline;
    var hash = {};
    if (/color|colour|colours/i.test(headers[1])) {
      isColorFile = true;
    } else if (validateColor(headers[1])) {
      isColorFile = true;
    }

    for (i = 1; i < lines.length; i++) {
      if (lines[i] === '') continue;
      currentline = lines[i].split(',');
      result[currentline[0]] = {};
      for (j = 1; j < headers.length; j++) {
        if (isColorFile) {
          result[currentline[0]] = currentline[j];
        } else {
          result[currentline[0]][headers[j]] = currentline[j];
        }
      }
    }
    headers.shift();
    hash = {
      'type': (isColorFile) ? 'color' : 'metadata',
      'columnHeaders': headers,
      'parsedData': result
    };
    return hash; // JSON
  }

  function checkIfTreeFile(tree) {
    if (tree.match(/^#NEXUS[\s\n;\w\.\*\:(\),-=\[\]\/&]+$/i)
      || tree.match(/^[\w\.\*\:(\),-\/]+;\s?$/gi)) {
      return true;
    }
    return false;
  }

  // output file information
  function parseFile(filedrag, file) {
    var fileType = /.*\.nwk|.*\.txt|.*\.tree|.*\.csv/i;
    var reader;
    var csvData;
    if (file.name.match(fileType)) {
      reader = new FileReader();

      reader.onload = function () {
        if (checkIfTreeFile(reader.result)) {
          $('.slideDiv, #tools_li').show();
          // Clear canvas div before drawing new tree
          $(filedrag).find('#phylocanvas').children().remove();
          $('.centermiddle').remove();
          renderPhyloCanvas(reader.result);

          if (metadata && Object.keys(metadata).length > 0) {
            renderMetadata(metadata);
          }
        } else {
          csvData = csvToJson(reader.result);
          if (phylocanvas.root !== undefined) {
            if (csvData.type === 'metadata') {
              metadata = csvData;
              renderMetadata(csvData);
            } else if (csvData.type === 'color') {
              colorTree(csvData);
            }
          }
        }
      };
      reader.readAsText(file);
    } else {
      outputMessage('File not supported!');
    }
  }

  // file selection
  function fileSelectHandler(e) {
    var files;
    var i;
    var file;
    // Cancel event and hover styling
    fileDragHover(e);

    // fetch FileList object
    files = e.target.files || e.dataTransfer.files;
    // process all File objects
    for (i = 0, file; file = files[i]; i++) {
      parseFile(this, file);
    }
    $('body').removeClass('hover');
  }


  // initialize
  function init() {
    var filedrag = document;
    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // file drop
      filedrag.addEventListener('dragover', fileDragHover, false);
      filedrag.addEventListener('dragleave', fileDragHover, false);
      filedrag.addEventListener('drop', fileSelectHandler, false);
    }
  }

  // call initialization file
  if (window.File && window.FileList && window.FileReader) {
    init();
  }
})();

function changeButtonColorToDefault() {
  $('.pc-buttons .btn').removeClass('btn-info');
  $('.pc-buttons .btn').addClass('btn-default');
}

$(document).ready(function () {
  /******** Metadata column checkbox functions ***************/
  $(document).on('change', '#metadataColumnSelectAllCheckbox', {}, function () {
    var checked = this.checked;
    $('input[name="metadata_columns_checkbox"').each(function () {
      this.checked = checked;
    });
    $('#metadata_columns_checkbox').change();
  });
  $(document).on('change', '#metadata_columns_checkbox', {}, function () {
    var viewColArray = [];
    $('#metadata_columns_checkbox:checked').each(function () {
      viewColArray.push($(this).val());
    });
    if (viewColArray.length > 0) {
      phylocanvas.viewMetadataColumns(viewColArray);
    } else {
      phylocanvas.showMetadata = false;
    }
    phylocanvas.draw();
  });

  var highlightSlideButton = function (ele, bool) {
    if (bool) {
      $('.slideUl li').removeClass('btn-warning');
      $('.slideUl li').addClass('btn-default');
      $(ele).removeClass('btn-default');
      $(ele).addClass('btn-warning');
      $('.slideUl li').css({
        'width': '35px'
      });
      $(ele).animate({
        'width': '100px'
      });
    } else {
      $('.slideUl li').removeClass('btn-warning');
      $('.slideUl li').addClass('btn-default');
      $('.slideUl li').css({
        'width': '35px'
      });
    }
  };

  /******* Slide Menu *************/
  var defaultHideLeft = '-180px';
  // $('.slideDiv').css('left', defaultHideLeft);

  $('.slideUl li').on('click', function () {
    if ($(this).hasClass('btn-warning')) {
      defaultHideLeft = '-180px';
      highlightSlideButton(this, false);
    } else {
      defaultHideLeft = '0px';
      highlightSlideButton(this, true);
    }

    $('.slideDiv').animate({
      'left': defaultHideLeft
    });

    $('.slideDivContent').hide();
    var ele = document.getElementById($(this).attr('data-toggle-id'));
    $(ele).show();
  });


  /**********  Tools Menu  *****************/
  $(document).on('click', '.pc-buttons .btn, .input', {}, function () {
    if (phylocanvas.root) {
      if ($(this).hasClass('btn')) {
        changeButtonColorToDefault();
      }
      $(this).addClass('btn-info');
      if (this.id === 'rectangular' || this.id === 'circular' || this.id === 'diagonal' || this.id === 'hierarchy' || this.id === 'radial') {
        phylocanvas.setTreeType(this.id);
        treeTypeSelected = this.id;
      } else if (this.id === 'nodeAlign') {
        phylocanvas.nodeAlign = !phylocanvas.nodeAlign;
      } else if (this.id === 'metadata') {
        phylocanvas.showMetadata = !phylocanvas.showMetadata;
      } else if (this.id === 'toggleLabel') {
        phylocanvas.toggleLabels();
      } else if (this.id === 'redraw') {
        phylocanvas.branches.pcn5.redrawTreeFromBranch();
      } else if (this.id === 'revert_redraw') {
        phylocanvas.origRoot.redrawTreeFromBranch();
      } else if (this.id === 'nodeColorTrue') {
        phylocanvas.backColour = false;
        phylocanvas.setNodeColourAndShape('1,2,3', 'orange', 'o', 5);
      } else if (this.id === 'nodeColorFalse') {
        phylocanvas.backColour = false;
        phylocanvas.setNodeColourAndShape('1,2,3', 'black', 'o', 1);
      } else if (this.id === 'branchColorTrue') {
        phylocanvas.backColour = true;
        phylocanvas.setNodeColourAndShape('1', 'rgb(20,120,250)', 'x', 5);
        phylocanvas.setNodeColourAndShape('2', 'rgb(250,120,20)', 't', 5);
        phylocanvas.setNodeColourAndShape('9', 'rgb(120,20,250)', 's', 5);
      } else if (this.id === 'branchColorFalse') {
        phylocanvas.backColour = false;
        phylocanvas.setNodeColourAndShape('1', 'black', 'o', 1);
        phylocanvas.setNodeColourAndShape('2', 'black', 'o', 1);
        phylocanvas.setNodeColourAndShape('9', 'black', 'o', 1);
      } else if (this.id === 'rotate') {
        phylocanvas.branches.pcn5.rotate(event);
      } else if (this.id === 'collapse') {
        phylocanvas.branches.pcn5.collapsed = true;
      } else if (this.id === 'expand') {
        phylocanvas.branches.pcn5.collapsed = false;
      }

      phylocanvas.draw();
    } else {
      $('.info').effect('highlight', { color: 'lightblue' }, 3000);
    }
  });

  $('.slider_node').slider({
      range: 'min',
      value: 1,
      min: 1,
      max: 10,
      slide: function (event, ui) {
        phylocanvas.setNodeSize(ui.value);
      }
  });

  $('.slider_text').slider({
      range: 'min',
      value: 1,
      min: 5,
      max: 10,
      slide: function (event, ui) {
        if (ui.value <= 0) {
          ui.value = 1;
        }
        phylocanvas.setTextSize(ui.value);
      }
  });

  $('#searchbox').keyup(function () {
    if (phylocanvas.root) {
      if (this.value !== '') {
        phylocanvas.findBranch(this.value);
      } else {
        phylocanvas.root.setSelected(false, true);
        phylocanvas.draw();
      }
    }
  });
});

$(document).ready(function () {
  $('[data-toggle="leftMenuToggle"]').click(function () {
    $('#leftmenu').toggleClass('hidden-xs');
  });
});
