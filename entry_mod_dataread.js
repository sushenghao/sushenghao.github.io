$(function(){var e={elem:$("#dataread"),init:function(){this.fetch()},fetch:function(){var e=this,t=Baike.Info.ename,n=Baike.Info.eid,r=Baike.Info.sid;$.net.jsonp("dataread","/Asyncdata/getStarsAwardInfo"),$.net.connect("dataread",{eid:n,sid:r,query:t},function(t){t.errno==0&&(e.elem.show(),e.setData(t,"#dataread-data"),e.logicHandler(),e.showPoint())})},showPoint:function(){var e={cId:"dr-show",c:"dr-show"};monitor.log(e,"click")},logicHandler:function(){this.topTitle(),this.moreHandler(),this.priDisTimeEv(),this.competeStar(),this.back()},topTitle:function(){var e=this,t,n={nominate:0,award:0,ratio:0},r=this.getData("#dataread-data"),i=r.rank;tmpl="\u83b7\u5956 ${award} \u6b21\uff0c\u63d0\u540d ${nominate} \u6b21\uff0c\u83b7\u5956\u6548\u7387\u503c\uff1a${ratio}%";for(var s in r)s!="awards_infos"&&(r[s].award&&(n.award+=r[s].award.length),r[s].nominate&&(n.nominate+=r[s].nominate.length));t=n.nominate+n.award,t!=0&&(n.ratio=Math.round(n.award/t*100)),this.elem.find(".dataread-toptitle").html($.tmpl(tmpl,n)),this.elem.find(".dataread-topinfobox .num").html(i.personal||"-"),this.elem.find(".dataread-topinfobox .total").html(i.total)},setData:function(e,t){var e=e.data;$(t).val(JSON.stringify(e))},getData:function(e){return JSON.parse($(e).val())},moreHandler:function(){var e=this,t;this.elem.on("click",".more",function(){t=$(this).attr("data-more"),$(this).hasClass("hide")?($(this).removeClass("hide").html("<span class='icon'></span>\u5c55\u5f00"),$(this).siblings(".more-c").hide()):($(this).addClass("hide").html("<span class='icon'></span>\u6536\u8d77"),$(this).siblings(".more-c").show()),Baike.Tool.scrollTo(e.elem.offset().top),e.echartsHandler()}),$("body").on("click",".dataread-tips-more",function(){var t=$.extend({},e.myChart.data,{large:1,more:0,close:1});$("#dr-pdistime-chart").append($("#dataread-tmpl").tmpl(t)),$(".echarts-tooltip").hide(),$(".dataread-tips-large").css({marginTop:-$(".dataread-tips-large").height()/2,marginLeft:-$(".dataread-tips-large").width()/2})})},echartsHandler:function(){this.przDisTime(),this.przDataContrast(),this.relPrzKnow()},przDisTime:function(){var e=this,t=this.priDisTimeAxis();zrender.require(["echarts","echarts/chart/line"],function(n){var r=n.init(document.getElementById("dr-pdistime-chart")),i={legend:{data:[{name:"\u83b7\u5956"},{name:"\u63d0\u540d"},{name:"\u7535\u5f71"}]},tooltip:{enterable:!0,trigger:"item",position:function(e){return[e[0]-20,e[1]-20]},formatter:function(t,n,i){var t=r.data=e.priDisTimeDataHandler(t);if(!t.list)return"";t.list.length<=3&&(t.more=0),$(".dataread-tips-large").length&&$(".dataread-tips-large").remove();var s=$("#dataread-tmpl").tmpl(t).html();return s},padding:0},xAxis:[{boundaryGap:!1,data:t.x}],yAxis:[{data:[]}],series:[{name:"\u83b7\u5956",type:"line",data:t.series.award,symbol:"emptyCircle",itemStyle:{normal:{color:"#2BA6EF"}},showAllSymbol:!0},{name:"\u63d0\u540d",type:"line",data:t.series.nominate,symbol:"emptyCircle",itemStyle:{normal:{color:"#86D552",lineStyle:{type:"dashed"}}},showAllSymbol:!0},{name:"\u7535\u5f71",type:"line",data:t.series.film,symbol:"emptyCircle",itemStyle:{normal:{color:"#F5BF0D",lineStyle:{type:"dashed"}}},showAllSymbol:!0}]};r.setOption(i),e.myChart=r})},przDataContrast:function(){var e=this,t=this.przDataConAxis();zrender.require(["echarts","echarts/chart/line"],function(n){var r=n.init(document.getElementById("pdatacon-chart")),i={legend:{data:[{name:"\u63d0\u540d"},{name:"\u63d0\u540d(\u5386\u53f2\u6700\u591a)"},{name:"\u83b7\u5956"},{name:"\u83b7\u5956(\u5386\u53f2\u6700\u591a)"}]},tooltip:{formatter:function(t){var n=e.przDataContrastTmpl(t);return n},padding:0},xAxis:[{type:"value",data:t.x,axisLabel:{formatter:function(e){return Math.abs(e)}}}],grid:{x:120},yAxis:[{type:"category",axisTick:{show:!1},data:t.y}],series:[{name:"\u63d0\u540d",type:"bar",stack:"g1",barWidth:9,itemStyle:{normal:{label:{show:!0,position:"left",formatter:function(e){return Math.abs(e.value)}},color:"#2BA6EF"}},data:t.series.nominate},{name:"\u63d0\u540d(\u5386\u53f2\u6700\u591a)",type:"bar",barWidth:9,stack:"g2",itemStyle:{normal:{label:{show:!0,position:"left",formatter:function(e){return Math.abs(e.value)}},color:"#F5590D"}},data:t.series.his_nominate},{name:"\u83b7\u5956",type:"bar",barWidth:9,stack:"g1",itemStyle:{normal:{label:{show:!0},color:"#86D552"}},data:t.series.award},{name:"\u83b7\u5956(\u5386\u53f2\u6700\u591a)",type:"bar",barWidth:9,stack:"g2",itemStyle:{normal:{label:{show:!0},color:"#F5BF0D"}},data:t.series.his_award}]};r.setOption(i)})},relPrzKnow:function(){this.relPrzKndgeData(),this.relPrzKndgeEv(),this.relPrzKnowFlip()},priDisTimeAxis:function(){var e=this.getData("#dataread-data"),t={film:[],award:[],nominate:[]},n={x:[],series:t};for(var r in e)$.isNumeric(r)&&(n.x.push(r),t.film.push(e[r].film?e[r].film.length:0),t.award.push(e[r].award?e[r].award.length:0),t.nominate.push(e[r].nominate?e[r].nominate.length:0));return n.series=t,n},priDisTimeDataHandler:function(e){var t=this.getData("#dataread-data"),n=function(e){var t={film:"\u7535\u5f71",award:"\u83b7\u5956",nominate:"\u63d0\u540d"};for(var n in t)if(t[n]==e[0])return n},r=n(e),i={list:t[e[1]][r],more:1,close:0,large:0,year:e[1],type:"\u7535\u5f71"};r!="film"&&(i.type=e[0]);var s;if(i.list)for(var o=0,u=i.list.length;o<u;o++)s=i.list,s[o].img||(s[o].img="http://p0.qhimg.com/dmsmty/110_150_/t012792c05d015021cd.png");return i},priDisTimeEv:function(){var e=this;$("body").on("click",".dataread-tips-close",function(t){e.elem.find(".dataread-tips-large").remove()}),$("body").click(function(e){var t=$(e.target).hasClass("dataread-tips")||$(e.target).parents(".dataread-tips").length||$(e.target).parents(".chart").length;t||$(".dataread-tips-large").remove()})},przDataConAxis:function(){var e=this.przDataContrastData(),t=e.list,n={x:[],y:e.award_list,series:{award:[],nominate:[],his_award:[],his_nominate:[]}},r=n.series;for(var i=0,s=t.length;i<s;i++)r.award.push(t[i].award),r.nominate.push(-t[i].nominate),r.his_award.push(t[i].his_award),r.his_nominate.push(-t[i].his_nominate);return n},przDataContrastData:function(){var e=this.getData("#dataread-data"),t,n,r,i,s,o={list:[],award_list:[],ename:Baike.Info.ename};for(var u in e)if(u!="awards_infos"){t=e[u].award,n=e[u].nominate;if(t)for(var a=0,f=t.length;a<f;a++)r=t[a].award_name,s=$.inArray(r,o.award_list),s==-1?(o.award_list.push(r),o.list.push({award_name:r,award:1,nominate:1,his_award:0,his_nominate:0,his_nom_name:""})):(o.list[s].award++,o.list[s].nominate++);if(n)for(var a=0,f=n.length;a<f;a++)r=n[a].award_name,s=$.inArray(r,o.award_list),s==-1?(o.award_list.push(r),o.list.push({award_name:r,award:0,nominate:1,his_award:0,his_nominate:0,his_nom_name:""})):o.list[s].nominate++}i=e.awards_infos;if(!i)return o;for(var u=0,f=i.length;u<f;u++){r=i[u].award_name,s=$.inArray(r,o.award_list);if(s==-1)continue;o.list[s].his_award=i[u].awarded_actor[0].count,o.list[s].his_award_name=i[u].awarded_actor[0].name,o.list[s].his_nominate=i[u].nominate_actor[0].count,o.list[s].his_nom_name=i[u].nominate_actor[0].name}return o},przDataContrastTmpl:function(e){var t=this.przDataContrastData(),n,r=e[1],i=e[0].substring(0,2),s=t.ename,o=t.list,u,a,f={award_name:r,type:i,name_max:"",count_max:0,name:s,count:0};return n=$.inArray(r,t.award_list),i=="\u63d0\u540d"?(f.count=o[n].nominate,f.name_max=o[n].his_nom_name,f.count_max=o[n].his_nominate):(f.name_max=o[n].his_award_name,f.count_max=o[n].his_award,f.count=o[n].award),a=$("#pdc-tmpl").tmpl(f).html(),a},relPrzKndgeData:function(){function s(e){var t={award_name:e.award_name,award_item:[]},n=function(e){return e||(e="http://p8.qhimg.com/t011d1245dc8f2b9e60.png"),e=e.replace("com","com/dmfd/151_197_"),e},r=function(e,t){var r={url:"",img:"",num:"",unit:"",title:"",filmname:"",islist:!1,list:[]};for(var i=0,s=t.length;i<s;i++)r.url=t[i].url,r.img=n(t[i].img),r.num=t[i].award_age||t[i].count,r.unit=e.unit,r.title=e.title,r.filmname=t[i].name,s==1?r.islist=!1:(r.islist=!0,r.list.push({url:t[i].url,filmname:t[i].name}));return r},i={create_year:function(e){var n={url:"",img:"",num:e,unit:"\u5e74",title:"\u8d77\u6e90",filmname:"",islist:!1,list:[]};n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},old_movie_king:function(e){var n=r({title:"\u6700\u5e74\u8001\u5f71\u5e1d",unit:"\u5c81"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},young_movie_king:function(e){var n=r({title:"\u6700\u5e74\u8f7b\u5f71\u5e1d",unit:"\u5c81"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},old_movie_queen:function(e){var n=r({title:"\u6700\u5e74\u8001\u5f71\u540e",unit:"\u5c81"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},young_movie_queen:function(e){var n=r({title:"\u6700\u5e74\u8f7b\u5f71\u540e",unit:"\u5c81"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},nominate_actor:function(e){var n=r({title:"\u63d0\u540d\u6700\u591a\u6f14\u5458",unit:"\u6b21"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},awarded_actor:function(e){var n=r({title:"\u83b7\u5956\u6700\u591a\u6f14\u5458",unit:"\u6b21"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},nominate_film:function(e){var n=r({title:"\u63d0\u540d\u6700\u591a\u5f71\u7247",unit:"\u6b21"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},awarded_film:function(e){var n=r({title:"\u83b7\u5956\u6700\u591a\u5f71\u7247",unit:"\u6b21"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},awarded_director:function(e){var n=r({title:"\u83b7\u5956\u6700\u591a\u5bfc\u6f14",unit:"\u6b21"},e);n.num||(n.num="\u6682\u65e0"),t.award_item.push(n)},constellation:function(e){},zodiac:function(e){},blood:function(e){},award_name:function(e){var n=t.award_item[0];n.filmname=e},baike_url:function(e){var n=t.award_item[0];n.url=e},award_img:function(e){var r=t.award_item[0];r.img=n(e)}};for(var s in e)i[s](e[s]);return t}var e=this.getData("#dataread-data"),t=e.awards_infos,n=[];if(t)for(var r=0,i=t.length;r<i;r++)n.push(s(t[r]));$("#dr-relpknow-list").html($("#relpknow-tmpl").tmpl({awards_list:n}))},relPrzKndgeEv:function(){var e=this,t=$("#dr-relpknow-list"),n=Baike.Menu.tab({nav:t.find(".relpknow-tabs"),menu:t.find(".relpknow-list, .relpknow-radars"),query:"li",evt:"click",hoverClass:"active"});$(n).on("tab-show",function(t,n){var r=n.index;e.relPrzKnowRadar(r)}),e.relPrzKnowRadar(1),this.relPrzKnowTabsEv()},relPrzKnowTabsEv:function(){var e=$(".relpknow-tab").outerWidth(),t=$(".relpknow-tabs"),n=0,r=t.find(".relpknow-tab").length;if(!($(".relpknow-tab").length>7))return!1;this.elem.find(".module-paging").show(),$(".related-prize-knowledge").on("click",".module-paging a",function(i){if($(this).hasClass("prev_off")||$(this).hasClass("next_off"))return!1;$(i.target).hasClass("prev")?(n--,n==0?$(this).addClass("prev_off"):$(this).siblings().removeClass("next_off"),t.stop().animate({left:-e*n})):(n++,n==r-7?$(this).addClass("next_off"):$(this).siblings().removeClass("prev_off"),t.stop().animate({left:-e*n}))})},relPrzKnowFlip:function(){function t(e){var t=$(this).find(".relpknow-item-flip"),n=e?"front":"back",r=e?"back":"front";t.removeClass("flip-to-"+n).addClass("flip-to-"+r),setTimeout(function(){t.find(".relpknow-item-"+r).show(),t.find(".relpknow-item-"+n).hide(),e||t.removeClass("flip-to-front")},250)}var e;$(".relpknow-item").hover(function(){var n=$(this);e=setTimeout(function(){$.proxy(t,n)(!0)},300)},function(){clearTimeout(e),$.proxy(t,$(this))(!1)})},relPrzKnowRadar:function(e){var t=this.relPrzKnowRadarAxis(e-1);zrender.require(["echarts","echarts/chart/line"],function(n){var r=n.init($(".relpknow-radar").eq(e-1).get(0)),i={tooltip:{trigger:"item",formatter:function(e){if($.isNumeric(e[3])){var t=$("#relpknowrader-tmpl").tmpl({title:e[1],count:e.value[e.indicator]}).html();return t}return""},padding:0},polar:[{indicator:[{text:"\u767d\u7f8a\u5ea7"},{text:"\u53cc\u9c7c\u5ea7"},{text:"\u6c34\u74f6\u5ea7"},{text:"\u9b54\u874e\u5ea7"},{text:"\u5c04\u624b\u5ea7"},{text:"\u5929\u874e\u5ea7"},{text:"\u5929\u79e4\u5ea7"},{text:"\u5904\u5973\u5ea7"},{text:"\u72ee\u5b50\u5ea7"},{text:"\u5de8\u87f9\u5ea7"},{text:"\u53cc\u5b50\u5ea7"},{text:"\u91d1\u725b\u5ea7"}],center:["16%","50%"],radius:80,type:"circle"},{indicator:[{text:"\u9f20"},{text:"\u732a"},{text:"\u72d7"},{text:"\u9e21"},{text:"\u7334"},{text:"\u7f8a"},{text:"\u9a6c"},{text:"\u86c7"},{text:"\u9f99"},{text:"\u5154"},{text:"\u864e"},{text:"\u725b"}],radius:80,center:["50%","50%"],type:"circle"},{indicator:[{text:"A"},{text:"O"},{text:"AB"},{text:"B"}],center:["83%","50%"],radius:80,type:"circle"}],series:[{type:"radar",itemStyle:{normal:{areaStyle:{type:"default"},color:"rgba(43,166,239,0.5)"}},data:[{value:t.constellation,name:"constellation"}]},{type:"radar",polarIndex:1,itemStyle:{normal:{areaStyle:{type:"default"},color:"rgba(245,191,13,0.5)"}},data:[{value:t.zodiac,name:"zodiac"}]},{type:"radar",polarIndex:2,itemStyle:{normal:{areaStyle:{type:"default"},color:"rgba(134,213,82,0.5)"}},data:[{value:t.blood,name:"blood"}]}]};r.setOption(i)})},relPrzKnowRadarAxis:function(e){var t={constellation:[],zodiac:[],blood:[]},n=this.getData("#dataread-data").awards_infos&&this.getData("#dataread-data").awards_infos[e];if(!n)return t;var r=n.constellation,i=n.blood,s=n.zodiac;for(var o=0,u=r.length;o<u;o++)t.constellation.push(r[o].count);for(var o=0,u=i.length;o<u;o++)t.blood.push(i[o].count);for(var o=0,u=s.length;o<u;o++)t.zodiac.push(s[o].count);return t},topInfoBox:function(){var e=this;this.elem.find(".dataread-topinfobox").hover(function(){$(this).addClass("hover").find(".topinfobox-tips").show()},function(){$(this).removeClass("hover").find(".topinfobox-tips").hide()})},competeStar:function(){var e=this;$.net.jsonp("dataread-com","/Asyncdata/getStarsPkInfo"),this.elem.on("keydown",".dataread-search-i input",function(e){e.keyCode==13&&$(".dataread-btn").trigger("click")}),this.elem.on("click",".dataread-btn, .dataread-topfother a",function(t){var n=Baike.Info.ename,r=Baike.Info.sid,i;$(t.target).hasClass("dataread-btn")?i=$(".dataread-search-i input").val():i=$(t.target).html();if(!i)return!1;$.net.connect("dataread-com",{sid:r,main:n,second:i},function(t){t.errno==0&&(e.elem.find(".mod-bd1").hide().end().find(".mod-bd2").show(),e.renderStarPk(t),e.contrastTopDivider())})}),this.cooperate(),this.compete(),this.competeRecommend()},renderStarPk:function(e){this.setData(e,"#dataread-data-pk"),$("#contrast-top").html($("#contrast-top-tmpl").tmpl(e.data,{format:function(e){return e?e.replace("com/","com/dmsmty/100_100_/"):""}})),$("#contrast-mid").html($("#contrast-mid-tmpl").tmpl(e.data,{width:function(e,t){var n=e/(t+e)*100+"%";return n},ratiolarge:function(e,t){return Math.round(e/(e+t))==1?"ratiolarge":""}}));var t,n,r,t=e.data.corp_films.length,n=e.data.award_pk.length,i=0,s=0;for(var o=0,u=e.data.award_pk.length;o<u;o++){var a=e.data.award_pk;if(a[o]["main_star"]["award"]==0&&a[o]["second_star"]["award"]==0)continue;a[o].main_star.award?i++:s++}r=i+":"+s,$("#contrast-bottom").html($("#contrast-bottom-tmpl").tmpl({corp_films:t,award_pk:n,rezult:r}))},competeRecommend:function(){var e=this.getData("#dataread-data"),t="<a href='javascript:;'>${name}</a>",n=e.recommend,r=[];for(var i=0;i<n.length;i++)r.push({name:n[i]});$("#dataread-topfother-n").html($.tmpl(t,r))},cooperate:function(){var e=this;this.elem.on("click",".contrast-bottom-cooperate",function(t){var n=e.getData("#dataread-data-pk"),r=n.corp_films.length;if(n.corp_films.length==0)return!1;n.title=n.starInfo[0].name+" \u548c "+n.starInfo[1].name+" \u5408\u4f5c\u8fc7\u7684\u5f71\u7247\uff1a"+r+"\u90e8",$(".contrast-tips").remove(),$(".dataread-tips-large").remove(),e.elem.find(".mod-bd2").append($("#contrast-coo-tips-tmpl").tmpl(n)),e.elem.find(".dataread-tips-large").css({marginLeft:-$(".dataread-tips-large").width()/2,marginTop:-$(".dataread-tips-large").height()/2}),monitor.log({cId:"dr-contrast-bottom-cooperate",c:"dr-contrast-bottom-cooperate"},"click"),t.stopPropagation()})},compete:function(){var e=this;this.elem.on("click",".contrast-bottom-compete",function(){var t=e.getData("#dataread-data-pk"),n=t.award_pk,r={star_name1:"",star_name2:"",width:"",award_pk_len:"",award_pk_list:[]};for(var i=0,s=n.length;i<s;i++){r.star_name1=n[i].main_star.name,r.star_name2=n[i].second_star.name,r.award_pk_len=s;var o=-1;n[i].main_star.award&&(o=0),n[i].second_star.award&&(o=1),r.award_pk_list.push({title:n[i].award_name,img1:n[i].main_star.film.img,url1:n[i].main_star.film.url,filmname1:n[i].main_star.film.filmname,name1:n[i].main_star.name,img2:n[i].second_star.film.img,url2:n[i].second_star.film.url,filmname2:n[i].second_star.film.filmname,name2:n[i].second_star.name,win:o})}r.width=s*340+"px";if(!s)return!1;e.elem.find(".mod-bd2").find(".contrast-tips").remove(),e.elem.find(".mod-bd2").append($("#contrast-tips-tmpl").tmpl(r,{img:function(e){return e?e.replace("com/","com/dmt/273_351_/"):""},title:function(e){var t=e.split("_"),n=t[2].split("-");return t[0]+"\u5e74 "+t[1]+" "+n[n.length-1]}})),monitor.log({cId:"dr-contrast-bottom-compete",c:"dr-contrast-bottom-compete"},"click")}),this.elem.on("click",".contrast-tips-close",function(){$(this).parents(".contrast-tips").remove()}),$("body").click(function(e){var t=$(e.target).hasClass("dataread-tips")||$(e.target).parents(".contrast-bottom-compete").length||$(e.target).hasClass("contrast-bottom-compete")||$(e.target).parents(".dataread-tips").length||$(e.target).parents(".contrast-tips").length||$(e.target).parents(".chart").length||$(e.target).hasClass("contrast-tips-close")||$(e.target).hasClass("contrast-tips");t||($(".dataread-tips-large").remove(),$(".contrast-tips").remove())}),this.elem.on("click",".compete-list-btns span",function(){var e=$(".compete-list-items"),t=$(".compete-list"),n=$(".compete-list-btns"),r=$(".prev"),i=$(".next"),s=n.attr("data-control"),o=e.find(".compete-list-item").length/2;if($(this).hasClass("disabled"))return!1;$(this).hasClass("prev")?(s--,e.css("left",-s*340)):$(this).hasClass("next")&&(s++,e.css("left",-s*340)),s==0?(r.addClass("disabled"),i.removeClass("disabled")):s==o-1?(r.removeClass("disabled"),i.addClass("disabled")):s>0&&s<o-1&&(r.removeClass("disabled"),i.removeClass("disabled")),n.attr("data-control",s),t.find("[data-index]").removeClass("active"),t.find("[data-index="+s+"]").addClass("active"),t.find("[data-title]").hide(),t.find("[data-title="+s+"]").show()})},contrastTopDivider:function(){var e=this.getData("#dataread-data-pk"),t=function(){var t={0:{name:"",data:[]},1:{name:"",data:[]}},n=e.pk;for(var r=0,i=n.length;r<i;r++)n[r].name=="\u7535\u5f71\u6570"?(t[0].data[0]=n[r].main_star,t[1].data[0]=n[r].second_star):n[r].name=="\u83b7\u5956\u6570"?(t[0].data[1]=n[r].main_star,t[1].data[1]=n[r].second_star):n[r].name=="\u63d0\u540d\u6570"&&(t[0].data[2]=n[r].main_star,t[1].data[2]=n[r].second_star);return t[0].name=e.starInfo[0].name,t[1].name=e.starInfo[1].name,t};zrender.require(["echarts","echarts/chart/line"],function(e){var n=e.init($("#ctd-radar").get(0)),r=t(),i={tooltip:{show:!1},polar:[{indicator:[{text:"\u5f71\u7247"},{text:"\u83b7\u5956"},{text:"\u63d0\u540d"}],radius:"60"}],series:[{type:"radar",data:[{value:r[0].data,name:r[0].name,itemStyle:{normal:{color:"#3F9FFF"}}},{value:r[1].data,name:r[1].name,itemStyle:{normal:{color:"#FF5D5D"}}}]}]};n.setOption(i)})},back:function(){var e=this;this.elem.on("click",".dataread-back",function(){e.elem.find(".mod-bd1").show().end().find(".mod-bd2").hide()})}};e.init()});