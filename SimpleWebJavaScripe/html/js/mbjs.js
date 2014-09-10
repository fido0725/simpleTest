function showMyAnswer(dom){
	   var domObj=dom.parentNode.getElementsByTagName("p");
	   if(domObj[2].style.display == "block"){
		   domObj[2].style.display = "none";
	   }else{
		   domObj[2].style.display = "block";
	   }
   }
   function selectTab(dom,id){
	   var tag=dom.parentNode.parentNode.getElementsByTagName("div");
	   var tagTab0=0;
	   var tagTab1=0;
	   for(var i=0;i<tag.length;i++){
		   if(tag[i].id!=""&&tag[i].id!=null&&typeof(tag[i].id)!="undefined"){
			   if(tag[i].id=="tab0"){
				   tagTab0=i;
			   }
			   if(tag[i].id=="tab1"){
				   tagTab1=i;
			   }
		   }
	   }  
	   if(id=='0'){
	      tag[tagTab0].className="_moreArea";
		  tag[tagTab1].className="_moreArea_hide";
		  tag[0].getElementsByTagName("span")[0].className="_selectedTabBtn";
		  tag[0].getElementsByTagName("span")[1].className="_notSelectedTabBtn";
	   }else{
		  tag[tagTab0].className="_moreArea_hide";
		  tag[tagTab1].className="_moreArea";
		  tag[0].getElementsByTagName("span")[0].className="_notSelectedTabBtn";
		  tag[0].getElementsByTagName("span")[1].className="_selectedTabBtn";
	   }
   }