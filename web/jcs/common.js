var RESULTMAP = {0:'AC',1:'WA',2:'TLE',3:'MLE',4:'RF',5:'RE',6:'CE',7:'ERR',100:'WAIT'};
var RESULTCOLOR = {0:'#00FF00',1:'#FF0000',2:'#FFFFFF',3:'#FFFFFF',4:'#FFFFFF',5:'#FFFFFF',6:'#FFFFFF',7:'#FFFFFF',100:'#FFFFFF'};

var USER_PER_USER	    = 0x00000001;
var USER_PER_PROCREATOR	    = 0x00000002;
var USER_PER_PROADMIN	    = 0x00000004;

var USER_LEVEL_USER	    = 0x00000001;
var USER_LEVEL_PROCREATOR   = 0x00000003;
var USER_LEVEL_PROADMIN	    = 0x00000007;
var USER_LEVEL_ADMIN	    = 0x0000ffff;
var USER_LEVEL_SUPERADMIN   = -1;

var __extend = function(child,parent){
    child.prototype.__super = parent;
};

var vus = new function(){
    var that = this;
    
    that.node = function(name){
	var that = this;
	that.name = name;
	that.parent = null;
	that.ref_count = 1;
	that.child = new Object;
	that.delay_child = new Object;

	that.url_chg = function(direct,url_upart,url_dpart){
	    return 'cont';
	};
	that.get = function(){
	    that.ref_count++;
	};
	that.child_set = function(node){
	    var delay_obj;

	    node.parent = that;
	    that.child[node.name] = node;

	    if(node.name in that.delay_child){
		delay_obj = that.delay_child[node.name];
		delete that.delay_child[node.name];	
		delay_obj.defer.resolve();
	    }
	};
	that.child_delayset = function(name){
	    that.delay_child[name] = {
		'defer':$.Deferred()
	    };
	};
	that.child_del = function(node){
	    node.parent = null;
	    delete that.child[node.name];
	};
	that.lookup = function(url,close_flag){
	    var i;
	    var url_part;
	    var node_curr;
	    var node_prev;

	    url_part = url.match(/\/toj\/(.*)/)[1].split('/');
	    url_part.pop();
	    node_prev = null;
	    node_curr = that;
	    for(i = 0;i < url_part.length;i++){
		node_prev = node_curr;
		if((node_curr = node_curr.child[url_part[i]]) == undefined){
		    if(close_flag == true){
			return node_prev;
		    }else{
			return null;
		    }
		}
	    }
	    return node_curr;
	}
    };
};
var com = new function(){
    var that = this;

    var check_mbox_url = function(url){
	if(url.search(/toj\/m\/.*/) != -1){
	    return true;
	}else{
	    return false;
	}
    }

    that.url_curr = null;
    that.url_prev = null;
    that.url_back = null;
    that.url_pbox = null;

    that.init = function(){
	var i;
	var url;
	var urlpart;
	
	that.vus_root = new vus.node(null);
	that.vus_mbox = new vus.node('m');

	that.vus_mbox.url_chg = function(direct,url_upart,url_dpart){
	    if(direct == 'in'){
		index.mask_show();
	    }else if(direct == 'out'){
		index.mask_hide();
	    }

	    return 'cont';
	};
	that.vus_root.child_set(that.vus_mbox);

	urlpart = location.href.split('?');
	if(urlpart[0].search(/\/$/) == -1){
	    url = urlpart[0] + '/';
	    if(urlpart.length > 1){
		url = url + '?';
		for(i = 1;i < urlpart.length;i++){
		    url = url + urlpart[i];
		}
	    }
	    window.history.replaceState(null,document.title,url);
	}

	$(document).on('click','a',function(e){
	    that.url_push($(this).attr('href'));   
	    return false;
	});
    };

    that.url_push = function(url){
	if(url == location.href){
	    return;
	}

	that.url_prev = location.href;
	that.url_back = that.url_prev;
	window.history.pushState(null,document.title,url);   
	that.url_chg();
    };
    that.url_push_back = function(block_regexp){
	if(that.url_back == null || that.url_back.search(block_regexp) != -1){
	    that.url_push('/toj/home/');
	}else{
	    that.url_push(that.url_back);
	}
    };
    that.url_update = function(url){
	if(url == location.href){
	    return;
	}

	that.url_prev = location.href;
	window.history.replaceState(null,document.title,url);   
	that.url_chg();
    };
    that.url_pull_pbox = function(){
	that.url_update(that.url_pbox);
	//window.history.back();
    };
    that.url_chg = function(){
	var i;
	var ret;
	var stop_flag;

	var url_old;
	var url_new;
	var url_cpart;	
	var url_ppart;
	var is_mbox_old;
	var is_mbox_new;

	var url_upart;
	var url_dpart;
	var node_curr;
	var node_parent;
	var node_bottom;

	var _chg_out = function(url_ppart,url_cpart){
	    var i;
	    var len;

	    var url_upart;
	    var url_dpart;
	    var node_curr;
	    var node_parent;
	    var node_bottom;
	    
	    len = Math.min(url_ppart.length,url_cpart.length);    
	    node_bottom = that.vus_root;
	    node_curr = node_bottom;
	    for(i = 0;i < len;i++){
		if(url_ppart[i] != url_cpart[i]){
		    break;
		}
		if((node_curr = node_curr.child[url_ppart[i]]) == undefined){
		    break;
		}
		node_bottom = node_curr;
	    }
	    if(node_curr != undefined){
		for(;i < url_ppart.length;i++){
		    if(node_curr.child[url_ppart[i]] == undefined){
			break;
		    }
		    node_curr = node_curr.child[url_ppart[i]];
		}

		url_upart = url_ppart.slice(0);
		url_dpart = new Array;
		while(node_curr != node_bottom){
		    node_parent = node_curr.parent;
		    node_curr.url_chg('out',url_upart,url_dpart);
		    url_dpart = url_dpart.splice(0,0,url_upart.pop());
		    node_curr = node_parent;
		}
	    }

	    return node_bottom;
	};
	var _chg_in = function(url_cpart,idx,node_curr,url_upart,url_dpart){
	    var node_parent;
	    var delay_obj;

	    for(;idx < url_cpart.length;idx++){
		node_parent = node_curr;
		if((node_curr = node_parent.child[url_cpart[idx]]) == undefined){
		    if((delay_obj = node_parent.delay_child[url_cpart[idx]]) == undefined){
			that.url_update('/toj/none/');
		    }else{
			delay_obj.url_curr = url_new; 
			delay_obj.defer.done(function(){
			    if(url_new == delay_obj.url_curr){
				_chg_in(url_cpart,idx,node_parent,url_upart,url_dpart);
			    }
			});
		    }
		    break;
		}
		url_upart.push(url_dpart.shift());

		ret = node_curr.url_chg('in',url_upart,url_dpart);
		if(ret == 'stop'){
		    break;
		}
	    }
	};

	that.url_curr = location.href;
	console.log(that.url_curr);

	if(arguments.callee.reentrant == true){
	    arguments.callee.hasnext = true;
	    return;
	}else{
	    arguments.callee.reentrant = true;
	    arguments.callee.hasnext = true;
	}

	while(arguments.callee.hasnext){
	    arguments.callee.hasnext = false;

	    url_old = that.url_prev;
	    url_new = that.url_curr;

	    url_cpart = url_new.match(/toj\/(.*)/)[1].split('/');
	    url_cpart.pop();
	    if(url_cpart.length == 0){
		that.url_update('/toj/home/');
		continue;
	    }

	    if(url_old == null){
		is_mbox_old = false;
	    }else{
		is_mbox_old = check_mbox_url(url_old);
	    }
	    is_mbox_new = check_mbox_url(url_new);

	    if(url_old == null || (is_mbox_old == false && is_mbox_new == true)){
		node_bottom = that.vus_root;
	    }else if(that.url_pbox != null && is_mbox_old == true && is_mbox_new == false){
		url_ppart = that.url_pbox.match(/toj\/(.*)/)[1].split('/');
		url_ppart.pop();
		node_bottom = _chg_out(url_ppart,url_cpart);	
	    }else{
		url_ppart = url_old.match(/toj\/(.*)/)[1].split('/');
		url_ppart.pop();
		node_bottom = _chg_out(url_ppart,url_cpart);	
	    }

	    if(url_old != null && is_mbox_old == false && is_mbox_new == false){
		index.page_scroll_reset();	
	    }

	    if(url_new != that.url_pbox){
		i = 0;
		node_curr = that.vus_root;
		url_upart = new Array;
		url_dpart = url_cpart.slice(0);
		stop_flag = false;
		while(node_curr != node_bottom){
		    if((node_curr = node_curr.child[url_cpart[i]]) == undefined){
			break;
		    }
		    url_upart.push(url_dpart.shift());
		    ret = node_curr.url_chg('same',url_upart,url_dpart);
		    if(ret == 'stop'){
			stop_flag = true;
			break;
		    }
		    i++;
		}
		if(stop_flag == false){
		    _chg_in(url_cpart,i,node_curr,url_upart,url_dpart);	
		}
	    }

	    if(that.url_pbox != null && is_mbox_old == true && is_mbox_new == false){
		url_ppart = url_old.match(/toj\/(.*)/)[1].split('/');
		url_ppart.pop();
		_chg_out(url_ppart,url_cpart);
	    }

	    if(is_mbox_new == false){
		if(that.url_pbox == null){
		    $('#index_mask').removeClass('index_mask_nopbox');
		    $('#index_mask').addClass('index_mask');
		}
		that.url_pbox = url_new;
	    }
	}

	arguments.callee.reentrant = false;
    };

    that.exheight = function(){
	var _ex = function(es,css){
	    var i;
	    var extop;
	    var exbottom;
	    var j_e;
	    var j_parent;

	    for(i = 0;i < es.length;i++){
		j_e = $(es[i]);
		if((extop = j_e.attr('extop')) == undefined){
		    extop = j_e.css('top').match(/(.+)px/)[1];
		}
		if((exbottom = j_e.attr('exbottom')) == undefined){
		    exbottom = 0;
		}
		extop = parseInt(extop);
		exbottom = parseInt(exbottom);

		j_e.css(css,($(window).height() - (extop + exbottom) + 'px'));
	    }
	};

	_ex($('[exheight=true]'),'height');
	_ex($('[exminheight=true]'),'min-height');
    };
    that.get_cookie = function(){
	var ret;
	var i;
	var part;
	var subpart;
	
	ret = new Array();
	part = document.cookie.split(';');
	for(i = 0;i < part.length;i++){
	    part[i] = part[i].replace(/\+/g,' ');
	    subpart = part[i].split('=');
	    ret[decodeURIComponent(subpart[0])] = decodeURIComponent(subpart[1]);
	}

	return ret;
    };
    that.get_date = function(str){
	var part;
	part = str.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
	return new Date(part[1],parseInt(part[2]) - 1,part[3],part[4],part[5],part[6],0);
    };
    that.get_datestring = function(date,secflag){
	var month;
	var day;
	var hr;
	var min;
	var sec;

	month = date.getMonth() + 1;
	if(month < 10){
	    month = '0' + month;
	}
	day = date.getDate();
	if(day < 10){
	    day = '0' + day;
	}
	hr = date.getHours();
	if(hr < 10){
	    hr = '0' + hr;
	}
	min = date.getMinutes();
	if(min < 10){
	    min = '0' + min;
	}
	if(secflag == true){
	    sec = date.getSeconds();
	    if(sec < 10){
		sec = '0' + sec;
	    }

	    return date.getFullYear() + '-' + month + '-' + day + ' ' + hr + ':' + min + ':' + sec;
	}else{
	    return date.getFullYear() + '-' + month + '-' + day + ' ' + hr + ':' + min;
	}
    };
    that.get_durstring = function(duration,secflag){
	var sec;
	var min;
	var hr;
	var day;

	duration = Math.floor(duration / 1000);

	sec = duration % 60;
	duration = Math.floor(duration / 60);
	if(sec < 10){
	    sec = '0' + sec;
	}

	min = duration % 60;
	duration = Math.floor(duration / 60);
	if(min < 10){
	    min = '0' + min;
	}

	hr = duration % 24;
	duration = Math.floor(duration / 24);
	if(hr < 10){
	    hr = '0' + hr;
	}

	day = duration;
	if(day == 0){
	    day = '';
	}else{
	    day = day + ':';
	}

	if(secflag == true){
	    return day + hr + ':' + min + ':' + sec;
	}else{
	    return day + hr + ':' + min;
	}
    };
    that.get_lang = function(value){
	var i;
	var ret;
	var langlist = ['C++','JAVA','Pascal'];

	ret = new Array;
	i = 0;
	while(value > 0){
	    if((value & 1) == 1){
		ret.push(langlist[i]);
	    }
	    value = value >> 1;
	}

	return ret;
    };
};

var class_com_pbox = function(){
    var that = this;

    that.fadein = function(j_e){
	j_e.stop().fadeIn('fast');
    };
    that.fadeout = function(j_e){
	j_e.stop().hide();
    };
};
var class_com_mbox = function(){
    var that = this;

    that.fadein = function(j_e){
	j_e.stop().show();
    };
    that.fadeout = function(j_e){
	j_e.stop().hide();
    };
};
