---
title: Swking
date: 2018-04-03 14:25:55
type: 'about'
comments: false

---
<div id="box" style="font-family:楷体; font-size:3em; height:35rem; position:relative; box-size:border-box; display:flex-box">
    <p style="writing-mode:vertical-lr; position:absolute; letter-spacing:5rem; left:25%; top:2rem; row:2">终与你</p>
    <p style="writing-mode:vertical-lr; position:absolute; letter-spacing:5rem; right:25%; bottom:2rem; row:2">归于你</p>
</div>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
    var resize = function(){
        var height = $(window).height();
         $("#box").height(height);
    }
    $(function(){
        resize();
    });
</script>
