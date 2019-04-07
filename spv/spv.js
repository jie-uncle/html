var mySecret,myAppkey,myOpUserUuid,myNetZoneUuid,mymyHost,seledCameraUuid;
$(function() {
    init();
});

function init() {
	IP = '39.107.83.84';
	port = '8080';
	myHost = IP;
	
	$("#appKey").on('blur', function(){
		// 判断secret是否为空，如果不为空，则获取用户以及网域信息
		myAppkey = $("#appKey").val();
		mySecret = $("#secret").val();
		if (myAppkey && myNetZoneUuid){
			GetDefaultUser(myAppkey, mySecret);
		}
	})
	
	$("#secret").on('blur', function(){
		// 判断appkey是否为空，如果不为空，则获取用户以及网域信息
		myAppkey = $("#appKey").val();
		mySecret = $("#secret").val();
		if (myAppkey && mySecret){
			GetDefaultUser(myAppkey, mySecret);
		}
	})

	$("#SelectUser").on('change', function(){
	// 选择用户事件
		var opt = $("#SelectUser option:selected");
		var tUuid = opt.val();
		if (tUuid && tUuid != myOpUserUuid){
			myOpUserUuid = tUuid;
			
			// 重新获取默认控制中心
			stopSinglePreview();
			buildDefaultUnit();
		}
	});

	$("#SelectNet").on('change', function(){
		// 选择网域事件
		var opt = $("#SelectNet option:selected");
		var tUuid = opt.val();
		if (tUuid && tUuid != myNetZoneUuid){
			myNetZoneUuid = tUuid;
			
			// 重新获取默认控制中心
			stopSinglePreview();
			buildDefaultUnit();
		}
	});
}

function GetDefaultUser(tAppkey, tSecret){
	var time = GetMilSeconds();
	uri = "/openapi/service/base/user/getDefaultUserUuid";
    strParam = {"appkey":tAppkey,"time":time};
	token = GenToken(uri, JSON.stringify(strParam), tSecret);
	
	$.ajax({
        url: "http://" + myHost + "/openapi/service/base/user/getDefaultUserUuid?token=" + token,
        type:"POST",
		contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            appkey: tAppkey,
            time: time
        }),
        success: function (jVal) {
            if (jVal.errorCode==0 && jVal.data){
				// 获取到了默认用户
				// 分页获取用户
				myOpUserUuid = jVal.data;
				GetUsers(tAppkey, tSecret, jVal.data);
				
				// 获取网域信息
				GetNetZones(tAppkey, tSecret, jVal.data);
			}
        }
    })
}

function GetUsers(tAppkey, tSecret, defaultUserUuid){
	var time = GetMilSeconds();
	uri = "/openapi/service/base/user/getUsers";
    strParam = {"appkey":tAppkey,"time":time,"pageNo":1,"pageSize":400,"opUserUuid":defaultUserUuid};
	token = GenToken(uri, JSON.stringify(strParam), tSecret);
	
	$.ajax({
        url: "http://" + myHost + "/openapi/service/base/user/getUsers?token=" + token,
        type:"POST",
		contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            appkey: tAppkey,
            time: time,
			pageNo: 1,
			pageSize: 400,
			opUserUuid: defaultUserUuid
        }),
        success: function (jVal) {
            if (jVal.errorCode==0 && jVal.data){
				// 设置用户信息，并显示默认用户
				var userList = document.getElementById("SelectUser");
				if (userList){
					for (i = 0; i < jVal.data.total; ++i){
						var opt = document.createElement("option");
						opt.value = jVal.data.list[i].userUuid;
						opt.innerText = jVal.data.list[i].userName;
						userList.appendChild(opt);
						
						if (defaultUserUuid == jVal.data.list[i].userUuid){
							opt.selected = "true";
						}
					}
					
					// 获取默认控制中心
					buildDefaultUnit();
				}
			}
        }
    })
}

function GetNetZones(tAppkey, tSecret, defaultUserUuid){
	var time = GetMilSeconds();
	uri = "/openapi/service/base/netZone/getNetZones";
    strParam = {"appkey":tAppkey,"time":time,"opUserUuid":defaultUserUuid};
	token = GenToken(uri, JSON.stringify(strParam), tSecret);
	
	$.ajax({
        url: "http://" + myHost + "/openapi/service/base/netZone/getNetZones?token=" + token,
        type:"POST",
		contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            appkey: tAppkey,
            time: time,
			opUserUuid: defaultUserUuid
        }),
        success: function (jVal) {
            if (jVal.errorCode==0 && jVal.data && jVal.data.length > 0){
				// 设置用户信息，并显示默认用户
				$("#SelectNet").empty();
				var netList = document.getElementById("SelectNet");
				if (netList){
					for (i = 0; i < jVal.data.length; ++i){
						var opt = document.createElement("option");
						opt.value = jVal.data[i].netZoneUuid;
						opt.innerText = jVal.data[i].netZoneName;
						netList.appendChild(opt);
						
						if (i == 0){
							opt.selected = "true";
							myNetZoneUuid = jVal.data[i].netZoneUuid;
						}
					}
					
					// 获取默认控制中心
					buildDefaultUnit();
				}
			}
        }
    })
}

function GenToken(uri, strParam, mySecret) {
    srcStr = uri + strParam + mySecret;
    token = hex_md5(srcStr).toUpperCase();    // 生成token
    return token;
}

function GetDefaultUnit() {
    uri = "/openapi/service/base/org/getDefaultUnit";
    strParam ={"appkey":myAppkey,"time":GetMilSeconds(),"opUserUuid":myOpUserUuid,"subSystemCode":"2097152"}; // 获取直接子中心控制中心
    token = GenToken(uri, JSON.stringify(strParam), mySecret);
    return token;
}

function GetMilSeconds()  // 获取当前时间的毫秒数
{
    return new Date().getTime();
}

function GetCtrlUnitToken(time, pUuid) 
{
    uri = "/openapi/service/base/org/getUnitsByParentUuid";
	strParam = {"appkey":myAppkey,"time":time,"pageNo":1,"pageSize":400,"opUserUuid":myOpUserUuid,"parentUuid":pUuid,"allChildren":0}; // 获取直接子中心控制中心
    token = GenToken(uri, JSON.stringify(strParam), mySecret);
    return token;
}

function GetRegionToken(time, pUuid, type)  //type 1-上级是中心 2-上级是区域
{
    uri = type == 1 ? "/openapi/service/base/org/getRegionsByUnitUuid" : "/openapi/service/base/org/getRegionsByParentUuid";
	strParam = {"appkey":myAppkey,"time":time,"pageNo":1,"pageSize":400,"opUserUuid":myOpUserUuid,"parentUuid":pUuid,"allChildren":0}; // 获取直接子区域
    token = GenToken(uri, JSON.stringify(strParam), mySecret);
    return token;
}

//function GetCameraToken(myAppkey, mySecret, time, pUuid) 
function GetCameraToken(time, pUuid) 
{
    uri = "/openapi/service/vss/res/getCamerasByRegionUuids";
	strParam = {"appkey":myAppkey,"time":time,"pageNo":1,"pageSize":400,"opUserUuid":myOpUserUuid,"regionUuids":pUuid}; // 获取监控点
    token = GenToken(uri, JSON.stringify(strParam), mySecret);
    return token;
}

function GetSinglePreviewToken(time, uuid) {
    uri = "/openapi/service/vss/preview/getPreviewParamByCameraUuid";
	strParam = {"appkey":myAppkey,"time":time,"opUserUuid":myOpUserUuid,"cameraUuid":uuid,"netZoneUuid":myNetZoneUuid};
	console.log(mySecret)
	token = GenToken(uri, JSON.stringify(strParam), mySecret);
	return token;
}
/* =============================================== */
function buildDefaultUnit() {
    var asynTree = document.getElementById("planTree"); // 异步树
    
    // myAppkey = $("appKey").val();
   
    // mySecret = $("secret").val();
   
	// myOpUserUuid = $("userUuid").val();
	// myNetZoneUuid = $("netZoneUuid").val();

    var setting = {
		data: {
			key: {
				name: "name"
			}
		},
        async: {
            enable: false,
            autoParam: ['uuid', 'NodeType']   // 资源编号，资源名称， 节点类型：1-控制中心 2-区域 3-监控点
        },
        view: {
            showIcon: true //设置 zTree 是否显示节点的图标。
        },
        callback: {
            onExpand: zTreeOnExpand,
			onDblClick: zTreeDblClick
		},
    };

    // 获取默认控制中心
    var time = GetMilSeconds();
    $.ajax({
        url: "http://" + myHost + "/openapi/service/base/org/getDefaultUnit?token=" + GetDefaultUnit(time),
        type:"POST",
		contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
            appkey: myAppkey,
            time: time,
            opUserUuid: myOpUserUuid,
            subSystemCode: "2097152"
        }),
        success: function (nodes) {
			if (nodes.errorCode != 0){
				alert("查询默认控制中心失败");
			}
			else{
				var arr = {};
				arr.uuid = nodes.data.unitUuid;
				arr.name = nodes.data.name;
				arr.NodeType = 1;   // 1是控制中心
				arr.isParent = true;
				arr.expanded = false;
				arr.iconSkin = 'data-icon-unit';
				childNodes = [];
				childNodes.push(arr);
				$.fn.zTree.init($("#planTree"), setting, childNodes);
			}
        }
    })
}
/* =============================================== */

function zTreeOnExpand(event, treeId, treeNode) 
{
	//expandNode = treeNode;
	if (!treeNode.expanded) 
	{
		treeNode.expanded = true;
		var resUuid = treeNode.uuid;
		
		// 先查中心或区域
		if (treeNode.NodeType == 2) 
		{  // 点击的是区域，查区域
			var time3 = GetMilSeconds();
			RegiontokenEx = GetRegionToken(time3, resUuid, 2);
			$.ajax({
				url: "http://" + myHost + "/openapi/service/base/org/getRegionsByParentUuid?token=" + RegiontokenEx,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					appkey: myAppkey,
					time: time3,
					pageNo: 1,
					pageSize: 400,
					opUserUuid: myOpUserUuid,
					parentUuid: resUuid,
					allChildren: 0
				}),
				success: function (nodes) 
				{
					if (nodes.errorCode != 0)
					{
						alert("getRegionsByParentUuid fail");
					}
					else if (nodes.data.total < 1)
					{
					}
					else
					{
						childNodes = [];
						for (var i = 0; i < nodes.data.list.length; i++) 
						{
							var arr = {};
							arr.uuid = nodes.data.list[i].regionUuid;
							arr.name = nodes.data.list[i].name;
							arr.NodeType = 2;   // 2表示区域
							arr.isParent = true;
							arr.iconSkin = 'data-icon-region';
							childNodes.push(arr);
						}
						var tree = $.fn.zTree.getZTreeObj("planTree");
						tree.addNodes(treeNode, childNodes);
					}
				}
			}) // end ajax
		}
		else if (treeNode.NodeType == 1)
		{ // 点击的是控制中心，查控制中心
			var time4 = GetMilSeconds();
			var CtrlUnittoken = GetCtrlUnitToken(time4, resUuid);
			$.ajax({
				url: "http://" + myHost + "/openapi/service/base/org/getUnitsByParentUuid?token=" + CtrlUnittoken,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					appkey: myAppkey,
					time: time4,
					pageNo: 1,
					pageSize: 400,
					opUserUuid: myOpUserUuid,
					parentUuid: resUuid,
					allChildren: 0
				}),
				success: function (nodes) 
				{
					if (nodes.errorCode != 0)
					{
						alert("getUnitsByParentUuid fail");
					}
					else if (nodes.data.total < 1)
					{
					}
					else
					{
						childNodes = [];
						for (var i = 0; i < nodes.data.list.length; i++) 
						{
							var arr = {};
							arr.uuid = nodes.data.list[i].unitUuid;
							arr.name = nodes.data.list[i].name;
							arr.NodeType = 1;   // 1表示中心
							arr.isParent = true;
							arr.iconSkin = 'data-icon-unit';
							childNodes.push(arr);
						}
						var tree = $.fn.zTree.getZTreeObj("planTree");
						tree.addNodes(treeNode, childNodes);
					}
				}
			}) // end ajax
		}
		else 
		{
			return;
		}
		
		// 再查区域或监控点
		if (treeNode.NodeType == 2)  // 当前点击的是区域，查监控点
		{
			var time1 = GetMilSeconds();
			cameraToken = GetCameraToken(time1, resUuid);
			$.ajax({
				url: "http://" + myHost + "/openapi/service/vss/res/getCamerasByRegionUuids?token=" + cameraToken,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					appkey: myAppkey,
					time: time1,
					pageNo: 1,
					pageSize: 400,
					opUserUuid: myOpUserUuid,
					regionUuids: resUuid
				}),
				success: function (nodes) 
				{
					if (nodes.errorCode != 0)
					{
						alert("getCamerasByRegionUuids fail");
					}
					else if (nodes.data.total < 1)
					{
					}
					else
					{
						childNodes = [];
						for (var i = 0; i < nodes.data.list.length; i++) 
						{
							var arr = {};
							arr.uuid = nodes.data.list[i].cameraUuid;
							arr.name = nodes.data.list[i].cameraName;
							arr.NodeType = 3;   // 3表示监控点
							arr.isParent = false;
							arr.iconSkin = 'data-icon-camera1';
							childNodes.push(arr);
						}
						var tree = $.fn.zTree.getZTreeObj("planTree");
						tree.addNodes(treeNode, childNodes);
					}
				}
			}) // end ajax
		}
		else if (treeNode.NodeType == 1)  // 当前点击的是中心，查区域
		{
			var time2 = GetMilSeconds();
			var Regiontoken = GetRegionToken(time2, resUuid, 1);
			$.ajax({
				url: "http://" + myHost + "/openapi/service/base/org/getRegionsByUnitUuid?token=" + Regiontoken,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					appkey: myAppkey,
					time: time2,
					pageNo: 1,
					pageSize: 400,
					opUserUuid: myOpUserUuid,
					parentUuid: resUuid,
					allChildren: 0
				}),
				success: function (nodes) 
				{
					if (nodes.errorCode != 0)
					{
						alert("getRegionsByUnitUuid fail");
					}
					else if (nodes.data.total < 1)
					{
					}
					else
					{
						childNodes = [];
						for (var i = 0; i < nodes.data.list.length; i++) 
						{
							var arr = {};
							arr.uuid = nodes.data.list[i].regionUuid;
							arr.name = nodes.data.list[i].name;
							arr.NodeType = 2;   // 2表示区域
							arr.isParent = true;
							arr.iconSkin = 'data-icon-region';
							childNodes.push(arr);
						}
						var tree = $.fn.zTree.getZTreeObj("planTree");
						tree.addNodes(treeNode, childNodes);
					}	
				}
			}) // end ajax
		}
	}
}

function zTreeDblClick(event, treeId, treeNode) 
{

    if (treeNode && treeNode.uuid && treeNode.NodeType && treeNode.NodeType == "3")  // 双击的是监控点
    {
        var time = GetMilSeconds();
		seledCameraUuid = treeNode.uuid;
        $.ajax({
            url: url = "http://" + myHost + "/openapi/service/vss/preview/getPreviewParamByCameraUuid?token=" + GetSinglePreviewToken(time, seledCameraUuid),
            type:"POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify({
                appkey: myAppkey,
                time: time,
                opUserUuid: myOpUserUuid,
                cameraUuid: seledCameraUuid,
                netZoneUuid: myNetZoneUuid
            }),
            success: function (xml) {
                // 调OCX单路预览接口
				var spvxOcx = document.getElementById("spv");
				if (xml.data)
				{
					var ret = spvxOcx.SPV_StartPreview(xml.data);
					if (ret != 0) {
						alert("单路预览失败：" + xml.data);
					}
				}
                else
				{
					alert("查询预览参数失败");
				}
            }
        })
		
		uri = "/openapi/service/vss/preset/getPresetInfosByCameraUuid";
		strParam = {"appkey":myAppkey,"time":time,"opUserUuid":myOpUserUuid,"cameraUuid":seledCameraUuid};
		token = GenToken(uri, JSON.stringify(strParam), mySecret);
		
		// $.ajax({
		// 	url: "http://" + myHost + "/openapi/service/vss/preset/getPresetInfosByCameraUuid?token=" + token,
		// 	type:"POST",
		// 	contentType: "application/json; charset=utf-8",
		// 	data: JSON.stringify({
		// 		appkey: myAppkey,
		// 		time: time,
		// 		opUserUuid: myOpUserUuid,
		// 		cameraUuid: seledCameraUuid
		// 	}),
		// 	success: function (jVal) {
		// 		if (jVal.errorCode==0 && jVal.data && jVal.data.length > 0){
		// 			// 设置用户信息，并显示默认用户
		// 			$("#preset").empty();
		// 			var presetList = document.getElementById("preset");
		// 			if (presetList){
		// 				var presetArray = new Array(jVal.data.length);
		// 				for (i = 0; i < jVal.data.length; ++i){
		// 					presetArray.push(jVal.data[i]);
		// 				}
		// 			}
					
		// 			var newArray = presetArray.sort(function(a,b){
		// 				return a.presetNo - b.presetNo;
		// 			});
					
					
		// 			for (i = 0; i < jVal.data.length; ++i){
		// 				var opt = document.createElement("option");
		// 				opt.value = jVal.data[i].presetNo;
		// 				opt.innerText = jVal.data[i].presetName;
		// 				presetList.appendChild(opt);
						
		// 				if (i == 0){
		// 					opt.selected = "true";
		// 				}
		// 			}
		// 		}
		// 	}
		// })
    }
};


function InitSpvx() {
    var ocxObj = document.getElementById("spv");
    var languageType = 1;
    var ret = ocxObj.SPV_Init(languageType);
    if (ret != 0) {
        alert("单路预览初始化失败");
    }
}

function UninitSpvx() {
    var ocxObj = document.getElementById("spv");
    var ret = ocxObj.SPV_Uninit();
    if (ret != 0) {
        alert("单路预览反初始化失败");
    }
}

function SnapPic()
{
	var ocxObj = document.getElementById("spv");
	var ret = ocxObj.SPV_SnapPic();
	if(ret != 0)
	{
		alert("抓图失败");
	}
}

function SetLocalParam() {
    var ocxObj = document.getElementById("spv");
    //var devPxRa = window.devicePixelRatio;
    var devPxRa = screen.deviceXDPI / screen.logicalXDPI;
    var height = $('#spv').height() * devPxRa ;
    var width = $('#spv').width() * devPxRa;
//alert(devPxRa);
    var xml = '<?xml version="1.0" encoding="UTF-8"?> ' +
        '<localParam> ' +
		'<width>' + width + '</width> ' +
		'<height>' + height + '</height> ' +
        '<picType>1</picType> ' +
        '<capturePath>C:\\Hikvision</capturePath> ' +
        '<recordSize>2</recordSize> ' +
        '<recordPath>C:\\Hikvision</recordPath> ' +
		'<limitPreviewTime>1800</limitPreviewTime> ' +
        '</localParam>';
    var ret = ocxObj.SPV_SetLocalParam(xml);
    if (ret != 0) {
        alert("单路预览设置本地参数失败");
    }
}

function stopSinglePreview() {
    var ocxObj = document.getElementById("spv");
    var ret = ocxObj.SPV_StopPreview();
    if (ret != 0) {
        alert("停止单路预览失败");
    }
}

function SetOSD(){
	if (!seledCameraUuid){
		alert("未选中监控点！");
		return ;
	}
	var ocxObj = document.getElementById("spv");
	var tx = $('#tx').text();
	var tcolor = $('#fontColor').val();
	var optSize = $("#fontSize option:selected").val();
	var optPos = $('#selectPosition option:selected').val();
	var vv = tx.replace(/\\n/g, '\n');
	var xml = '<?xml version="1.0" encoding="UTF-8"?> ' +
        '<textInfo> ' +
		'<text>' + vv + '</text> ' +
		'<cameraUuid>' + seledCameraUuid + '</cameraUuid> ' +
        '<location>' + optPos + '</location> ' +
        '<fontSize>' + optSize + '</fontSize> ' +
        '<RGB>' + tcolor + '</RGB> ' +
        '</textInfo>';
	var ret = ocxObj.SPV_SetOSDText(xml);
	if (ret != 0)
	{
		alert("字符叠加失败！");
	}
}

function SetToolBar(){
	var ocxObj = document.getElementById("spv");
	var ids = $('#tbar').val();
	if (null == ids){
		alert("参数为空！");
		return ;
	}
	
	var ret = ocxObj.SPV_SetToolBar(ids);
	if (ret != 0){
		alert("设置工具条失败！");
	}
}

function GotoPreset(){
	var ocxObj = document.getElementById("spv");
	var opt = $("#preset option:selected").val();
	var ret = ocxObj.SPV_GotoPreset(parseInt(opt, 10));
	if (ret != 0){
		alert("调用预置点失败");
	}
}

function SnapPic(){
	var ocxObj = document.getElementById("spv");
	var opt = $("#preset option:selected").val();
	var ret = ocxObj.SPV_SnapPic();
	if (ret != 0){
		alert("调用预置点失败");
	}
}