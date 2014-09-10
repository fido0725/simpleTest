var ismb=true;    //是否为模板
var isEditAble=true;  
var selid = '';
var selAll = false;
var apptype ="android"; 


$(document).ready(function() {
	$(".column").sortable({
		connectWith : ".column",
		handle : ".portlet-header",
		 axis: "y",
//		containment:"#column",
		revert: true
	});

	$("#content1").focus();
	$(".portlet-close").click(function() {
		$(this).parent().remove();
		selid = '';
	}).hover(function() {
		$(this).addClass("por_bg");
		$(this).parent().addClass("por_br");
	}, function() {
		$(this).removeClass("por_bg");
		$(this).parent().removeClass("por_br");
	});
	$(".portlet-header").hover(function(){
		$(this).parent().addClass("por_br");
		},function(){
		$(this).parent().removeClass("por_br");	
			});
		
		$(".we_abc").focus(function(){
		$(this).next("span").hide();
		}).blur(function(){
		var text = $.trim($(this).text());
				if(text =='' ){
					$(this).next("span").show();
			
				}	
			})
			
		//$(".we_abc").each(function(index, el) {
//		var html = $.trim($(this).text());
//		$(this).focus(function() {
//		var text = $.trim($(this).text());
//				if(text == html){
//					$(this).text('');
//				}	
//		}).blur(function() {
//			var text = $.trim($(this).text());
//					if(text == ''){
//						$(this).text(html);
//						}	
//		});
//	    });
//		
		
	//for(var i=0;i<titles.length;i++){
//		if($("#"+titles[i]).html()==''){
//			$("#"+titles[i]).html(values[i]);
//		}
//	}
	
	//for(var i=0;i<titles.length;i++){
//	//标题隐藏
//		$("#"+titles[i]).focus(titilefocus(titles[i],values[i]));
//		//$("#"+titles[i]).blur(titileblur(titles[i],values[i])); 
//	}
//	
	//$("#"+titles[0]).focus(function() {
//		var text = $.trim($(this).html());
//				if(text == values[0]){
//					$(this).text("");
//				}	
//	}).blur(function() {
//		var text = $.trim($(this).html());
//				if(text == ''){
//					$(this).text(values[0]);
//				}	
//	});
// 
//	
//	$("#"+titles[3]).focus(function() {
//		var text = $.trim($(this).html());
//				if(text == values[3]){
//					$(this).html("");
//				}	
//	}).blur(function() {
//		var text = $.trim($(this).html());
//				if(text == ''){
//					$(this).html(values[3]);
//				}	
//	});
	
	
	
}); 
 

function onendedEnd() {
	imgPlayObj.src=pausedImg;
}


function _getSelection() {
	if (document.selection) {
		return document.selection.createRange();
	} else if (window.getSelection()) {
		return window.getSelection();
	}
	return null;
}

function _selectNode(selectId) {
	var selection = _getSelection();
	if (selection != undefined && selection != null
			&& selection.toString() != null && selection.toString().length < 1) {
		var nodes = document.getElementById(selectId).childNodes;
		selection.removeAllRanges();
		for ( var i = 0; nodes != null && i < nodes.length; i++) {
			var range = document.createRange();
			range.selectNode(nodes[i]);
			selection.addRange(range);
		}
		selAll = true;
	}
}

function _removeAllSelectNode() {
	var selection = _getSelection();
	if (selection != undefined && selection != null && selAll) {
		selection.removeAllRanges();
		selAll = false;
	}
}

// 选择层
function seldiv(a) {
	selid = a.id;
}

function add(editable) {
	var idl = parseInt($('#idl').val()) + 1;
	selid = "content" + idl;

	var drap = $('<div class="drap">');
	var portlet = $('<div class="portlet"></div>');
	var portletClose = $('<div class="portlet-close"></div>').click(function() {
		$(this).parent().remove();
		selid = '';
	}).hover(function() {
		$(this).addClass("por_bg");
		$(this).parent().addClass("por_br");
	}, function() {
		$(this).removeClass("por_bg");
		$(this).parent().removeClass("por_br");
	});

	var portletHeader = $('<div class="portlet-header"></div>').hover(
			function() {
				$(this).addClass("portlet-drop");
				$(this).parent().addClass("por_br");
			}, function() {
				$(this).removeClass("portlet-drop");
				$(this).parent().removeClass("por_br");
			});
	//var portletContent = $('<div onfocus="seldiv(this);" class="portlet-content" contenteditable="true"></div>');
	var portletContent="";
	
	if(editable==false){
	   portletContent = $('<div onfocus="seldiv(this);" class="portlet-content portlet-content-center" ></div>');
	}else{
	   portletContent = $('<div onfocus="seldiv(this);" class="portlet-content portlet-content-left" contenteditable="true"></div>');
	}
	portletContent.attr('id', selid);
	portlet.append(portletClose);
	portlet.append(portletHeader);
	portlet.append(portletContent);
	drap.append(portlet);
	$('#column').append(drap);

	portletContent.focus();
	$('#idl').val(idl);
}

function addImg(imgName, width, height) {
	imgName = "resources/" + imgName;
	var img = $("<img/>").attr("src", imgName);
	if (width) {
		img.attr("width", width);
	}
	if (height) {
		img.attr("height", height);
	}
	add(false);
	$('#' + selid).append(img);

}

var voicePlayName;
var voicePlayFlag; 
var imgPlayObj;
var playImg="images/play_loading.gif";
var pausedImg="images/play.png";
function playVoice(voiceName,self) {

         imgPlayObj = self; 
 
         if(voicePlayName==voiceName){
	        var music = document.getElementById("audio");
		if (music.paused) { 
                  music.play(); 
		  imgPlayObj.src=playImg;
                 }else{
		  music.pause(); 
		  imgPlayObj.src=pausedImg;
		}
	}else{
		$('#audio').attr("src", voiceName);
                var music = document.getElementById("audio");
		music.load();
		music.play(); 
		imgPlayObj.src=playImg;
	}
	 voicePlayName=voiceName; 
}

function playVoice1(voiceName) {
	$('#audio').attr("src", voiceName);
 
         if(voicePlayName==voiceName){
	 	if(voicePlayFlag==true){ 
	 	document.getElementById('audio').pause();
		//$('#audio').pause();
		 voicePlayFlag=false;
		}else{
 
		//document.getElementById('audio').load();
		document.getElementById('audio').play();
		// $('#audio').load();
		// $('#audio').play();
		 voicePlayFlag=true;
		}
	}else{
                //document.getElementById('audio').load();
		document.getElementById('audio').play();
		//$('#audio').load();
		//$('#audio').play();
		 voicePlayFlag=true;
	}
	 voicePlayName=voiceName;

	 window.open('play.html?voiceName='+voiceName,'_blank');
}

function addVoice(voice, width, height) {
	var imgName="resources/drop_ico_hover.png";
	voice = "resources/" + voice ;
	//var img = $("<img/>").attr("src", imgName);
	var img = ' <img src="' + pausedImg + '"  onclick="playVoice(\'' + voice + '\',this)" width="100%" height="100%" /> ';   
	// html += '</embed>';
	 
	//img.bind('click',function(){playVoice(voiceName);}   );
	//img.click(function(){ playVoice(voiceName);}  );
	add(false);
	$('#' + selid).append(img);
}

function addVideo(videoName, width, height) {
	videoName = "resources/" + videoName;
	// var html = ' <embed type="video/x-ms-asf-plugin" src="' + imgName + '"
	// width="100" height="100" //> ';
	// var html = ' <video type="video/x-ms-asf-plugin" src="' + videoName
	// + '" width="100" height="100" /> ';
	// html += '</embed>';
	var video = $('<video type="video/x-ms-asf-plugin"/>').attr("src",
			videoName);
	if (width) {
		video.attr("width", width);
	}
	if (height) {
		video.attr("height", height);
	}
	add(false);
	$('#' + selid).append(video);
}

var fontSize = {};
function add_size(type) {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		if (!fontSize[selid]) {
			// 默认大小
			fontSize[selid] = 3;
		}
		var size = fontSize[selid];
		if ("+" == type && size < 7) {
			size += 1;
		} else if ("-" == type && size > 1) {
			size -= 1;
		}
		fontSize[selid] = size;

		document.execCommand('FontSize', false, size);

		// {n:'x-small',s:'10px',t:'极小'},{n:'small',s:'13px',t:'特小'},{n:'medium',s:'16px',t:'小'},
		//{n:'large',s:'18px',t:'中'},{n:'x-large',s:'24px',t:'大'},{n:'xx-large',s:'32px',t:'特大'},{n:'-webkit-xxx-large',s:'48px',t:'极大'}
		switch (size) {
		case 1:
			$("#" + selid).css({
				"line-height" : "22px"
			});
			break;
		case 2:
			$("#" + selid).css({
				"line-height" : "25px"
			});
			break;
		case 3:
			$("#" + selid).css({
				"line-height" : "28px"
			});
			break;
		case 4:
			$("#" + selid).css({
				"line-height" : "30px"
			});
			break;
		case 5:
			$("#" + selid).css({
				"line-height" : "36px"
			});
			break;
		case 6:
			$("#" + selid).css({
				"line-height" : "44px"
			});
			break;
		case 7:
			$("#" + selid).css({
				"line-height" : "60px"
			});
			break;
		default:
			$("#" + selid).css({
				"line-height" : "24px"
			});
			break;
		}

		_removeAllSelectNode();
	}

};

function add_bold() {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand('Bold');

		_removeAllSelectNode();
	}
};

function add_italic() {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand('Italic');

		_removeAllSelectNode();
	}
};

function add_line() {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand('Underline');

		_removeAllSelectNode();
	}
};

function add_color(colorValue) {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand('ForeColor', false, colorValue);

		_removeAllSelectNode();
	}
};

function add_align(alignValue) {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		if ('left' == alignValue) {
			document.execCommand('JustifyLeft');
		} else if ('center' == alignValue) {
			document.execCommand('JustifyCenter');
		} else if ('right' == alignValue) {
			document.execCommand('JustifyRight');
		}

		_removeAllSelectNode();
	}
};

function add_order(type) {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		if (type == "ordered") {
			document.execCommand('insertorderedlist');
		} else if (type == "unordered") {
			document.execCommand('insertunorderedlist');
		}

		_removeAllSelectNode();
	}
};
 
function add_link(value) {
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand('CreateLink',false,value);

		_removeAllSelectNode();
	}
};
 

function getPreViewHtml(android) {
	var viewHtml = '';

	viewHtml = viewHtml + '<div class="view view_h1" >' + $('#content0').html() + '</div>';

	var idl = $('.portlet-content').length;

	if (idl > 0) {
		$('.portlet-content').each(function() {
			//图片居中
			if($(this).html().indexOf("img")>-1 || $(this).html().indexOf("video")>-1   ){
			viewHtml = viewHtml + '<div class="view-contentimg " >' + $(this).html() + '</div>';
			}else{
			viewHtml = viewHtml + '<div class="view-contenttext " >' + $(this).html() + '</div>';
			}
		});
	}
	var preViewHtml = '<!doctype html>  <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8">   <script src="js/jquery-1.10.2.js"></script> \n   <script src="js/jquery-ui.js"></script> \n   <script src="js/js.js"></script> \n   <link rel="stylesheet" href="css/css.css"> \n  </head> ';
	preViewHtml = preViewHtml + '  <body>  <div id="play" > <audio id="audio" /> </div>  ' + viewHtml + ' <body> </html>';
	if (android == 'android') {
		window.jsHtml.setJsReturn(preViewHtml);// 调用android 中的setJsReturn方法。
	} 

	return preViewHtml;
}

function getEditViewHtml(android) {
	var viewHtml = $('.container').html();
	viewHtml = ' <div class="container"> \n ' + viewHtml + ' \n </div> ';

	var preViewHtml = ' <!DOCTYPE html> \n ';
	preViewHtml = preViewHtml + ' <html> \n';
	preViewHtml = preViewHtml + ' <head> \n';
	preViewHtml = preViewHtml
			+ ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="yes" name="apple-mobile-web-app-capable" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="black" name="apple-mobile-web-app-status-bar-style" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="telephone=no" name="format-detection" /> \n';
	preViewHtml = preViewHtml
			+ ' <link rel="stylesheet" href="css/css.css"> \n';
	preViewHtml = preViewHtml
			+ ' <script src="js/jquery-1.10.2.js"></script> \n';
	preViewHtml = preViewHtml + ' <script src="js/jquery-ui.js"></script> \n';
	preViewHtml = preViewHtml + ' <script src="js/js.js"></script> \n';
	preViewHtml = preViewHtml
			+ ' <script src="js/jquery.ui.touch-punch.min.js"></script> \n';
	preViewHtml = preViewHtml + ' </head> \n';
	preViewHtml = preViewHtml + ' <body>   <div id="play" > <audio id="audio" /> </div>    \n';
	preViewHtml = preViewHtml + viewHtml + ' <body> </html>';
	if (android == 'android') {
		window.jsEditHtml.setJsReturnB(preViewHtml);// 调用android 中的setJsReturn方法。
	}
	return preViewHtml;
}

function createLink(){
	if (selid != null && selid != "" && _getSelection() != null) {
		_selectNode(selid);

		document.execCommand("CreateLink", true);

		_removeAllSelectNode();
	}
}


function add_html() {
	alert($('.container').html());
}


function getIsMb(android) {
	 if (android == 'android') {
		window.getIsMb.setJsgetIsMb(ismb);
	 }
	return ismb;
}

function getIsEditAble(android) {
	 if (android == 'android') {
		window.jsTitle.setJsIsEditAble(isEditAble);
	} 
	return isEditAble;
}

 
function getTitle(android) {
	var title="";
	if(ismb){
	  title = $('#title0').text();
	}else{
	  title = $('#content0').text();
	}
	if (android == 'android') {
		window.jsTitle.setJsTitle(title);
	} 
	return title;
}

function getHtmlValueById(name,img){
	var selid=$(name);
	if(selid[0]==null){
		return false;
	}else{
		if(img==true){
			return selid.html();
		}
		if(selid.next("span").is(":hidden")){
			return selid.text();
		}else{
			
			return "";
		}
		
	} 
} 

function setIsEditAble(isEditAble1){
	isEditAble=isEditAble1;
	
	if(apptype =="android"){
		window.popShow.setJsPopShow(isEditAble1);
	}else{
		sendCommand("editedBarShow",isEditAble1);  
	}
}


function sendCommand(cmd,param){  
    var url="callBackObjc://"+cmd+":"+param;  
    document.location = url;  
}  
 

function getPreViewHtmlByMb(android) {
	var preViewHtml='';
	var viewTmp=getHtmlValueById('#title0');
	if(viewTmp!=false || viewTmp=="" ){
		preViewHtml = preViewHtml+ ' <div id="mb_layout">  \n  <div id="title_0">  \n   <h1 class="_title1"><span>'+viewTmp+'</span> </h1>  \n ';
	}
	
	viewTmp=getHtmlValueById('#title1');
	if(viewTmp!=false || viewTmp==""){
		preViewHtml= preViewHtml + ' <h2 class="_course_bel"><span>  \n '+viewTmp+' </span></h2>  \n ';
	}
	
	viewTmp=getHtmlValueById('#title0');
	if(viewTmp!=false || viewTmp==""){
		preViewHtml= preViewHtml + '</div>  \n ';
	} 
	 
	viewTmp=getHtmlValueById('#title2');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="dialog_0">  \n <p class="_dialog"><span> \n ' +viewTmp+ ' </span><span class="_dialog_cor1"></span><span class="_dialog_cor2"></span></p> \n  </div>';
	}
	
	 viewTmp=getHtmlValueById('#title3');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="dialog_0">  \n <p class="_dialog_bel"> \n ' +viewTmp+ ' </p> </div> ';
	}
	
	viewTmp=getHtmlValueById('#title4');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="text_0">  \n <div class="_text"> \n ' +viewTmp+ ' </div> </div> ';
	}
	
	viewTmp=getHtmlValueById('#img1',true);
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div class="img_con" style="text-align:center;"> \n ' +viewTmp+ '   </div> ';
	}   
	
	viewTmp=getHtmlValueById('#title5');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="subTitle_0">  \n <div class="_subTitle0"> \n ' +viewTmp+ ' </div> <br> </div> ';
	}
	
	viewTmp=getHtmlValueById('#title6');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="videoAbout_0 ">  \n <div class="_videoAbout  "> \n ' +viewTmp+ ' </div> <br> </div> ';
	}
      
	viewTmp=getHtmlValueById('#img2',true);
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="video_0">  \n <div class="_video"> \n  <div> ' +viewTmp+ ' </div> </div> </div> ';
	}
      
     viewTmp=getHtmlValueById('#title7');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="subTitle_1">  \n <div class="_subTitle1"> \n ' +viewTmp+ ' </div> <br> </div> ';
	}
	 
	viewTmp=getHtmlValueById('#title8');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="clickShow_0"> <p class="_text"> \n ' +viewTmp+ ' </p>  <p id="answerBtnArea1" class="_clickBtn" onclick="javascript:showMyAnswer(this)">单击查看</p> ';
	preViewHtml= preViewHtml + ' <p id="answerArea1" class="_showArea" style="display: none;"><span> ' +getHtmlValueById('#title9')+ ' </span><span class="_showArea_cor1"></span> <span class="_showArea_cor2"></span></p> </div> ';
	}
	
	
	viewTmp=getHtmlValueById('#title10');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="clickShow_1"> <p class="_text"> \n ' +viewTmp+ ' </p>  <p id="answerBtnArea1" class="_clickBtn" onclick="javascript:showMyAnswer(this)">单击查看</p> ';
	preViewHtml= preViewHtml + ' <p id="answerArea1" class="_showArea" style="display: none;"><span> ' +getHtmlValueById('#title11')+ ' </span><span class="_showArea_cor1"></span> <span class="_showArea_cor2"></span></p> </div> ';
	}   
	
	viewTmp=getHtmlValueById('#title12');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="clickShow_2"> <p class="_text"> \n ' +viewTmp+ ' </p>  <p id="answerBtnArea1" class="_clickBtn" onclick="javascript:showMyAnswer(this)">单击查看</p> ';
	preViewHtml= preViewHtml + ' <p id="answerArea1" class="_showArea" style="display: none;"><span> ' +getHtmlValueById('#title13')+ ' </span><span class="_showArea_cor1"></span> <span class="_showArea_cor2"></span></p> </div> ';
	}   
	 
	 viewTmp=getHtmlValueById('#title14');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="clickShow_3"> <p class="_text"> \n ' +viewTmp+ ' </p>  <p id="answerBtnArea1" class="_clickBtn" onclick="javascript:showMyAnswer(this)">单击查看</p> ';
	preViewHtml= preViewHtml + ' <p id="answerArea1" class="_showArea" style="display: none;"><span> ' +getHtmlValueById('#title15')+ ' </span><span class="_showArea_cor1"></span> <span class="_showArea_cor2"></span></p> </div> ';
	}   
	
	viewTmp=getHtmlValueById('#title16');
	if(viewTmp!=false || viewTmp==""){
	preViewHtml= preViewHtml + ' <div id="clickShow_4"> <p class="_text"> \n ' +viewTmp+ ' </p>  <p id="answerBtnArea1" class="_clickBtn" onclick="javascript:showMyAnswer(this)">单击查看</p> ';
	preViewHtml= preViewHtml + ' <p id="answerArea1" class="_showArea" style="display: none;"><span> ' +getHtmlValueById('#title17')+ ' </span><span class="_showArea_cor1"></span> <span class="_showArea_cor2"></span></p> </div> ';
	}   
	
	preViewHtml= preViewHtml + ' <div id="subTitle_2">  <div class="_subTitle2">更多资料 - More about it</div> <br> </div> '  ;
	preViewHtml= preViewHtml + ' <div id="news_0"><br> <div align="center"> <span id="tabBtn1" onclick="javascript:selectTab(this,&quot;0&quot;)" class="_notSelectedTabBtn">相关资讯</span> <span id="tabBtn2" '  ;
     preViewHtml= preViewHtml + '  onclick="javascript:selectTab(this,&quot;1&quot;)" class="_selectedTabBtn">类似话题</span> </div>  '  ;
      
    viewTmp=getHtmlValueById('#title18');
    if(viewTmp==false){
      viewTmp='';
	}
	preViewHtml= preViewHtml + ' <div id="tab0" name="tab0" class="_moreArea_hide"> '  +viewTmp+ '</div>' ;
     viewTmp=getHtmlValueById('#title19');
    if(viewTmp==false){
      viewTmp='';
	}
	preViewHtml= preViewHtml + ' <div id="tab1" name="tab1" class="_moreArea"> '  +viewTmp+ '</div>' ; 
	preViewHtml= preViewHtml + '  <br>  </div>' ;
     
    preViewHtml= preViewHtml + '  </div>  </div>' ; 
	 
    preViewHtml= preViewHtml + ' </body> </html>' ; 

preViewHtml= ' <!DOCTYPE html> \n <html> \n  <head> \n <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> \n <title>生成模板</title> <link rel="stylesheet" href="css/main.css">   <script src="js/mbjs.js"></script> \n </head> <body> ' +  preViewHtml; 
	 
	if (android == 'android') {
		window.jsHtml.setJsReturn(preViewHtml);// 调用android 中的setJsReturn方法。 
	}
	
	return preViewHtml;
}


function getEditViewHtmlByMb(android) {
	var viewHtml = $('.mb_layout').html();
	viewHtml = ' <div class="mb_layout"> \n ' + viewHtml + ' \n </div> ';

	var preViewHtml = ' <!DOCTYPE html> \n ';
	preViewHtml = preViewHtml + ' <html> \n';
	preViewHtml = preViewHtml + ' <head> \n';
	preViewHtml = preViewHtml
			+ ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="yes" name="apple-mobile-web-app-capable" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="black" name="apple-mobile-web-app-status-bar-style" /> \n';
	preViewHtml = preViewHtml
			+ ' <meta content="telephone=no" name="format-detection" /> \n';
	preViewHtml = preViewHtml
			+ ' <link rel="stylesheet" href="css/css.css"> \n';
	preViewHtml = preViewHtml
			+ ' <script src="js/jquery-1.10.2.js"></script> \n';
	preViewHtml = preViewHtml + ' <script src="js/jquery-ui.js"></script> \n';
	preViewHtml = preViewHtml + ' <script src="js/js.js"></script> \n  <style type="text/css"> html, body { background: #e8f2f9; } </style> ';  

	preViewHtml = preViewHtml
			+ ' <script src="js/jquery.ui.touch-punch.min.js"></script> \n';
	preViewHtml = preViewHtml + ' </head> \n';
	preViewHtml = preViewHtml + ' <body>   <div id="play" > <audio id="audio" /> </div>    \n';
	preViewHtml = preViewHtml + viewHtml + ' <body> </html>';
	if (android == 'android') {
		window.jsEditHtml.setJsReturnB(preViewHtml);// 调用android 中的setJsReturn方法。
	}
	return preViewHtml;
}

function getIsImg(android) {
	if (selid != null && selid != "" && _getSelection() != null) {
	var selectObjTmp = $('#'+selid);
	var objtype= selectObjTmp.html();
	var isImg=false;
	if(objtype.indexOf("img")>-1){
		isImg=true;
	}
	if (android == 'android') {
		window.jsEditHtml.setJsIsImg(isImg);// 调用android 中的setJsReturn方法。
	}
	return isImg;
	}
	return false;
}

function getIsVideo(android) {
	if (selid != null && selid != "" && _getSelection() != null) {
	var selectObjTmp = $('#'+selid);
	var objtype= selectObjTmp.html();
	var isImg=false;
	if(objtype.indexOf("video")>-1){
		isImg=true;
	}
	if (android == 'android') {
		window.jsEditHtml.setJsIsImg(isImg);// 调用android 中的setJsReturn方法。
	}
	return isImg;
	}
	return false;
}

function updateImg(selid,imgName,width,height){
		imgName = "resources/" + imgName;
		var selectObjTmp = $('#'+selid);
	    var objtype= selectObjTmp.html();
		var img = $($("<img/>")).attr("src", imgName);
		if (width) {
			img.attr("width", width);
		}
		if (height) {
			img.attr("height", height);
		}
		selectObjTmp.html('');
		selectObjTmp.html(img); 
} 

function changeObj(selid,type){
	 var param=selid+":"+type;
	if(apptype == "android"){
		window.changeVideo.setJsChangeVideo(param); 
	}else{ 
		sendCommand("setPopAddButtonIndex",param);  
	} 
}  
function updateVideo(selid,videoName,width,height){
	videoName = "resources/" + videoName;
	var selectObjTmp = $('#'+selid);
	var objtype= selectObjTmp.html();
	var video = $('<video type="video/x-ms-asf-plugin"/>').attr("src",
			videoName);
	if (width) {
		video.attr("width", width);
	}
	if (height) {
		video.attr("height", height);
	}
	selectObjTmp.html('');
	selectObjTmp.html(video); 
} 


function setApptype(appName){
	 apptype = appName;
}  

// 课件模板
$(function(){
	$(".mb_edit").click(function(){
	$(this).addClass("mb_br").siblings().removeClass("mb_br");
	$(this).find(".portlet-close").show();
	$(this).siblings().find(".portlet-close").hide();
		});
	})