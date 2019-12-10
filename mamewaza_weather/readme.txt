Copyright 2015 Bsharp Inc. http://bsharp.jp/
Licensed under GPL.
Download, Support: http://mamewaza.com/tools/





■■■■■インストール方法■■■■■

◆１　mamewaza_weatherフォルダをFTPなどでアップロードします

----------------------------------------

◆２　下記のようにタグを設置します（</body>の手前あたりに設置するのがオススメです）

<script type="text/javascript" src="./mamewaza_weather/mamewaza_weather.min.js"></script>
<script type="text/javascript">
$.mamewaza_weather( {
	selector: "#mamewaza_weather",
	region:"120010",
	layout:"horizontalMini",
	when:"7days",
	explanation:true
} );
</script>

タグを設置したページの直下にmamewaza_weatherフォルダを設置したことを想定しています。
jQueryがない場合は、上記のscriptの前に、下記のタグを設置してjQueryを読み込んでください。
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

----------------------------------------

◆３　天気予報を表示したい場所に下記のタグを設置します
<div id="mamewaza_weather" class="mamewaza_weather"></div>

----------------------------------------

◆その他　フォルダの場所や名称変更について
必要なファイルは
mamewaza_weather.min.js
mamewaza_weather.css
mamewaza_weather.eot
mamewaza_weather.svg
mamewaza_weather.ttf
mamewaza_weather.woff
です(eot/svg/ttf/woffはウェブフォント)。これらのパスを正しく指定すれば、どこに置いても構いません。
例えば、mamewaza_weather.min.jsを1つ上層のscriptsフォルダ、mamewaza_weather.cssを1つ上層のcssフォルダに設置した場合は以下のようになります。cssPathの追記に注意してください。
<script type="text/javascript" src="../scripts/mamewaza_weather.min.js"></script>
<script type="text/javascript">
$.mamewaza_weather( {
	selector: "#mamewaza_weather",
	region:"120010",
	layout:"horizontalMini",
	when:"7days",
	explanation:true,
	cssPath:"../css/mamewaza_weather.css"
} );
</script>






■■■■■その他■■■■■

◆設定について
・CSSとウェブフォントは同じフォルダに入れてください（変更した場合はfont-faceのパスを要変更）。
・設置対象要素のidは自由に設定可能ですが、変更した場合はselectorを正しく指定してください。
・設置対象要素はdivに限りません。

----------------------------------------

◆免責・注意事項
・本スクリプトは自己責任でご利用ください。このスクリプトを利用することによって生ずるいかなる損害に対しても一切責任を負いません。
・GoogleやLivedoorの無料サービスを利用していますが、これらのサービスが停止した場合は利用できなくなります。
・ライセンスはGPLです。
・Livedoor Weather Hackやまめわざへのリンクを除去しないようお願いいたします。
