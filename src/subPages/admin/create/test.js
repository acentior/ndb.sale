$(function(){
    var svgText = $('#svg-txt'),
        svgSize = $('#svg-size'),
        svgFixedSize = $('.svg-fixed-size'),
        svgPreviewPlaceholder = $('.svg-preview-placeholder'),
        svgPreview = $('#svg-preview'),
        fileinfo = $('#fileinfo');

    if ('' == svgSize.val()) {
        svgSize.val(48);
    }

    function render() {
        var size = svgSize.val();
        if (size>200)
        {
          svgPreviewPlaceholder.addClass('large'); 
        } else
        {
          svgPreviewPlaceholder.removeClass('large');
        }
        svgPreview.html(svgText.val());
        svgPreview.css({width: size + 'px', height: size + 'px'})
        $('svg', svgPreview).css({width: '100%', height: '100%'})
    }

    function resize(event, element) {
        svgFixedSize.removeClass('active');
        $(this).addClass('active');
        svgSize.val($(this).text())
        render();
    }

    function readFile(evt) {
        //Retrieve the first (and only!) File from the FileList object
        var file = evt.target.files[0];

        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var contents = e.target.result;
                fileinfo.html("<pre>Got the file: " +
                    "name: " + file.name + "\n" +
                    "type: " + file.type + "\n" +
                    "size: " + file.size + " bytes\n" +
                    "starts with: " + contents.substr(0, contents.indexOf("n") + '</pre>')
                );

                if (file.type.indexOf('svg')>0) {
                    svgText.val(contents)
                    svgPreview.html(svgText.val());
                    render();
                } else {
                    fileinfo.html('<div class="ui red message"><i class="icon red alert"></i> Wrong file type. Only SVG files allowed</div>');
                }
            }
            reader.readAsText(file);
        } else {
            fileinfo.html('<div class="ui red message"><i class="icon red alert"></i> Failed to load file</div>');
        }
    }
  
        svgText.val('<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">\
            <path fill="#4CAF50" d="M40,14H8l3.8,28.3c0.1,1,1,1.7,2,1.7h20.5c1,0,1.8-0.7,2-1.7L40,14z"></path>\
            <g>\
    <path fill="#81C784" d="M42,14H6v-3c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4V14z"></path>\
    <path fill="#81C784" d="M37.2,10H10.8l1.7-4.7c0.3-0.8,1-1.3,1.9-1.3h19.2c0.8,0,1.6,0.5,1.9,1.3L37.2,10z"></path>\
    </g>\
    <path fill="#E8F5E9" d="M28,28.5c1.2-1.1,2-2.7,2-4.5c0-3.3-2.7-6-6-6c-3.3,0-6,2.7-6,6c0,1.8,0.8,3.4,2,4.5c-1.2,1.1-2,2.7-2,4.5\
    c0,3.3,2.7,6,6,6c3.3,0,6-2.7,6-6C30,31.2,29.2,29.6,28,28.5z M24,36c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3\
    C27,34.7,25.7,36,24,36z M24,27c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3C27,25.7,25.7,27,24,27z"></path>\
    </svg>');

    svgText.bind('keyup', render).bind('blur', render);
    svgSize.bind('keyup', render).bind('blur', render);
    svgFixedSize.bind('click', resize);

    render();

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#svg-file').show().bind('change', readFile);
    } else {
        fileinfo.html('<div class="ui red message"><i class="icon red alert"></i> The File APIs are not fully supported by your browser.</div>');
    }
});

$('.dropdown').dropdown();