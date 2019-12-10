/**
Copyright 2015 Bsharp Inc. http://bsharp.jp/
Licensed under GPL.
Download, Support: http://mamewaza.com/tools/
*/

//天気の表示
(function($) {

$.mamewaza_weather = function(conf) {
	//デフォルト値
	var dft = {
		//設置対象要素のjQuery selector
		selector: "#weather",
		//天気表示エリア（livedoor wether hackに準じる）
		region: 1,
		//表示レイアウト（vertical/verticalMini/horizontal/horizontalMiniの4種類）
		layout: "vertical",
		//表示対象（7days/weekend/2days/1day)
		when: "7days",
		//説明の有無（boolean）
		explanation: false,
		//cssのパス
		cssPath: "./mamewaza_weather/mamewaza_weather.css",
	};

	//label2img
	var label2img = {
		"晴れ": 1,
		"晴時々曇": 2,
		"晴時々雨": 3,
		"晴時々雪": 4,
		"晴のち曇": 5,
		"晴のち雨": 6,
		"晴のち雪": 7,
		"曇り": 8,
		"曇時々晴": 9,
		"曇時々雨": 10,
		"曇時々雪": 11,
		"曇のち晴": 12,
		"曇のち雨": 13,
		"曇のち雪": 14,
		"雨": 15,
		"雨時々晴": 16,
		"雨時々曇": 17,
		"雨時々雪": 18,
		"雨のち晴": 19,
		"雨のち曇": 20,
		"雨のち雪": 21,
		"暴風雨": 22,
		"雪": 23,
		"雪時々晴": 24,
		"雪時々曇": 25,
		"雪時々雨": 26,
		"雪のち晴": 27,
		"雪のち曇": 28,
		"雪のち雨": 29,
		"暴風雪": 30,
	};

	conf = $.extend({}, dft, conf);

	//値の確認
	if(!conf.selector || !$(conf.selector)[0] || !conf.region || !conf.region.toString().match(/^\d{6}$/) ) {
		return "";
	}

	//表示
	var set = function(res) {
		if(!res || !res.channel || !res.channel.item) {
			return "";
		}

		var is_horizontal = conf.layout.indexOf("horizontal") != -1;
		var is_mini = conf.layout.indexOf("Mini") != -1;
		var is_micro = conf.layout.indexOf("Micro") != -1;
		var is_std = !is_mini && !is_micro;

		var html = "<div><table class=\"mamewaza_weather\">";

		if(conf.layout == "vertical") {
			html += "<tr><th>日付</th><th>天気</th><th>最高<span class=\"mamewaza_weather_small\">℃</span></th><th>最低<span class=\"mamewaza_weather_small\">℃</span></th></tr>";
		}

		//horizontal
		if(is_horizontal) {
			if(is_std) {
				var html_h = {
					"col1": "<th>日付</th>",
					"col2": "<th>天気</th>",
					"col3": "<th>最高<span class=\"mamewaza_weather_small\">℃</span></th>",
					"col4": "<th>最低<span class=\"mamewaza_weather_small\">℃</span></th>"
				};
			} else {
				var html_h = {
					"col1": "",
					"col2": "",
					"col3": "",
					"col4": "",
				}
			}
		}

		var items = res.channel.item;
		for(var i = 0, j = 0; i < items.length; i++) {
			//広告の排除
			if(items[i].category == "PR") {
				continue;
			}

			if( (conf.when == "1day" && j == 1) || (conf.when == "2days" && j == 2) ) {
				break;
			}

			if(!items[i].description || !items[i].description.match(/(\d{2})日（(月|火|水|木|金|土|日)）の天気は([^、]+)、最高気温は([\d\.-]*)℃ (?:最低気温は([\d\.-]*)℃)?でしょう。/) ) {
				continue;
			}
			var date = parseInt(RegExp.$1, 10).toString();
			var day = RegExp.$2;
			var label = RegExp.$3;
			var max = RegExp.$4;
			var min = RegExp.$5;
			var img = "&#xe" + (800 + label2img[label]).toString() + ";";

			if(conf.when == "weekend" && day != "土" && day != "日") {
				continue;
			}

			var date_this = is_mini ? date + "<span class=\"mamewaza_weather_small\">" + day + "</span>" : date + "<span class=\"mamewaza_weather_small\">日(" + day + ")</span>";
			var cap_this = is_micro ? min + "～" + max + "<span class=\"mamewaza_weather_small\">℃</span>" : (is_mini ? "<span class=\"mamewaza_weather_small\">" + label + "</span>" : label);
			var cls_this = day == "土" ? " class=\"mamewaza_weather_sat\"" : (day == "日" ? " class=\"mamewaza_weather_sun\"" : "");

			//horizontal
			if(is_horizontal) {
				html_h.col1 += "<td" + cls_this + ">" + date_this + "</td>";
				html_h.col2 += "<td><span class=\"mamewaza_weather_icon\">" + img + "</span><br />" + cap_this + "</td>";

				if(is_mini) {
					html_h.col3 += "<td>" + min + " ～ " + max + "<span class=\"mamewaza_weather_small\">℃</span></td>";

				} else if(is_std) {
					html_h.col3 += "<td>" + max + "</td>";
					html_h.col4 += "<td>" + min + "</td>";
				}

			} else {
				html += "<tr>"
					+ "<td" + cls_this + ">"
						+ date_this + "</td>"
					+ "<td" + (is_mini ? cls_this : "") + "><span class=\"mamewaza_weather_icon\">" + img + "</span><br />" + cap_this + "</td>";

				if(is_micro) {
					html += "";

				} else if(is_mini) {
					html += "<td" + cls_this + ">" + min + " ～ " + max + "<span class=\"mamewaza_weather_small\">℃</span></td>";

				} else {
					html += "<td>" + max + "</td>"
						+ "<td>" + min + "</td>";
				}
				html += "</tr>";
			}

			j++;
		}

		//horizontal
		if(is_horizontal) {
			html += "<tr>" + html_h.col1 + "</tr>"
				+ "<tr>" + html_h.col2 + "</tr>"
				+ (html_h.col3 ? "<tr>" + html_h.col3 + "</tr>" : "")
				+ (html_h.col4 ? "<tr>" + html_h.col4 + "</tr>" : "");
		}

		html += "</table>"
			+ "<div class=\"mamewaza_weather_exp\" style=\"display:block !important;visibility:visible !important;position:static !important;\">"
			+ (conf.explanation ? res.channel.description.replace(/[\r?\n]{2}/g, "<br />") : "")
			+ "<a href=\"" + res.channel.link + "\" target=\"_blank\">" + res.channel.title + "</a>"
			+ "<span class=\"memewaza_asscembled\">assembled by <a href=\"http://mamewaza.com/\" target=\"_blank\" rel=\"nofollow\">まめわざ</a></span>"
			+ "</div>"
			+ "</div>";

		$(conf.selector).append(html);
	};

	//初期設定（googleの読込、cssの読込、weather hackリクエスト）
	var init = function() {
		//外部cssの読込
		if(document.createStyleSheet) {
			document.createStyleSheet(conf.cssPath);
		} else {
			$("head").append("<link href=\"" + conf.cssPath + "\" rel=\"stylesheet\" type=\"text/css\" />");
		}

		var d = new Date();
		var hash = (d.getFullYear() ).toString() + (d.getMonth() < 9 ? "0" : "") + (d.getMonth() + 1).toString() + (d.getDate() < 10 ? "0" : "") + (d.getDate() ).toString() + Math.floor(d.getHours() / 6).toString();
		$.ajax( {
			"timeout": 5000,
			"url": "https://mamewaza.net/w/",
			"dataType" : "jsonp",
			"cache": true,
			"data": {"area": conf.region, "date": hash},
			"success": set,
			"error": function(res, status) {
//alert(status + "\n----------\n" + res.responseText);
			}
		} );
	};

	init();
};

})(jQuery);
