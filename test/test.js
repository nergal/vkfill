(function(QUnit){
    "use strict";

    var cre = function(html, single) {
      var div = document.createElement('div')
      div.innerHTML = html
      var elements = div.childNodes
      return single ? elements[0] : elements
    }

    QUnit.test("posts", function() {
      var html, post


      html = cre('<div id="post-32194285_172355" class="post" onmouseover="wall.postOver(\'-32194285_172355\')" onmouseout="wall.postOut(\'-32194285_172355\')" onclick="wall.postClick(\'-32194285_172355\', event)"><div class="post_table"<div class="post_image"><a class="post_image" href="/bon.appetit"><img src="http://cs323216.vk.me/v323216865/3ae4/spONkMBU0Zs.jpg" width="50" height="50"></a></div><div class="post_info"><div class="fl_r delete_post_wrap"><div class="delete_post"><div id="delete_post-32194285_172355" onclick="feed.ignoreItem(\'-32194285_172355\', \'wall_-32194285_172355\', \'c6552f89211704babb\');" onmouseover="wall.activeDeletePost(\'-32194285_172355\', \'Это не интересно\')" onmouseout="wall.deactiveDeletePost(\'-32194285_172355\')" style="opacity: 0;"></div></div></div><div class="wall_text"><a class="author" href="/bon.appetit" data-from-id="-32194285">Bon Appétit | Лучшие рецепты</a> <div id="wpt-32194285_172355"><div class="wall_post_text">7 главных продуктов для повышения гемоглобина.<br><br>1. Морковный сок. Наибольший эффект, если пить 3-4 раза в неделю по стакану. На один стакан сока приходится около 500 грамм моркови.<br><br>2. Клубника и земляника. Естественно, свежие плоды без варки дадут наибольший результат.<br><a class="wall_post_more" onclick="hide(this, domPS(this)); show(domNS(this));">показать целиком..</a><span style="display: none"><br><br>3. Свекла. Её можно как натирать на тёрке, так и делать из неё свекольный сок.<br><br>4. Рецепт из мёда, грецких орехов и клюквы – прекрасное средство для повышения ценного белка в крови. Можно смешать в равных пропорциях. Лучше будет употреблять сразу мелкими порциями, как только приготовили.<br><br>5. Сбор определённых трав. Взять по две столовых ложки крапивы и листьев ежевики, а также по три столовых ложки зверобоя и цветов ромашки. Всё это измельчить, перемешать и, поместив в термос, залить около 700 граммов кипятка. Настоявшийся настой пить по стакану три раза в день.<br><br>6. Пить шиповник с медом – польза не только для иммунитета и общей жизненной силы, но и для повышения гемоглобина.<br>7. И, наконец, продукты питания, которые должны составлять наш рацион: печень, говядина, телятина, гречка, яблоки, малина, гранаты. Всё это незаменимые продукты для организма, в частности, для гемоглобина.<br><br>Как видим, эти продукты важны не только для крови, но и для нашего полноценного питания.<br><br><a href="/wall-32194285?q=%23%D1%81%D0%BE%D0%B2%D0%B5%D1%82%D1%8B">#советы@bon.appetit</a></span></div><div class="page_post_sized_thumbs  clear_fix" style="width: 495px; height: 310px;"><a onclick="return showPhoto(\'-32194285_303861288\', \'wall-32194285_172355\', {temp:{base:&quot;http://cs7001.vk.me/c7008/v7008865/&quot;,x_:[&quot;cbf8/Ta7ZlBkFgcw&quot;,604,378]},queue:1}, event)" style="width: 495px; height: 310px;" class="page_post_thumb_wrap  page_post_thumb_last_column page_post_thumb_last_row"><img src="http://cs7001.vk.me/c7008/v7008865/cbf8/Ta7ZlBkFgcw.jpg" width="495" height="310" style="" class="page_post_thumb_sized_photo"></a></div></div></div><div class="post_full_like_wrap fl_r"><div class="post_full_like"><div class="post_like fl_r" onmouseover="wall.postLikeOver(\'-32194285_172355\')" onmouseout="wall.postLikeOut(\'-32194285_172355\')" onclick="wall.like(\'-32194285_172355\', \'d5148ee5b9e2ecce4f\'); event.cancelBubble = true;"><span class="post_like_link fl_l" id="like_link-32194285_172355">Одобряю</span><i class="post_like_icon  fl_l" id="like_icon-32194285_172355" style=""></i><span class="post_like_count fl_l" id="like_count-32194285_172355">455</span></div><div class="post_share fl_r " onmouseover="wall.postShareOver(\'-32194285_172355\')" onmouseout="wall.postShareOut(\'-32194285_172355\', event)" onclick="wall.likeShareCustom(\'-32194285_172355\'); event.cancelBubble = true;"><span class="post_share_link fl_l" id="share_link-32194285_172355">Поделиться</span><i class="post_share_icon fl_l" id="share_icon-32194285_172355"></i><span class="post_share_count fl_l" id="share_count-32194285_172355">68</span></div></div></div><div class="replies"><div class="reply_link_wrap" id="wpe_bottom-32194285_172355"><small><a href="/wall-32194285_172355" onclick="return showWiki({w: \'wall-32194285_172355\'}, false, event);"><span class="rel_date rel_date_needs_update" abs_time="сегодня в 16:38" time="1367498290">43 минуты назад</span></a><a onmouseover="wall.postTooltip(this, \'-32194285_172355\', {i: \'-1\'})" href="/app2915534" class="wall_post_source_icon wall_post_source_default"></a></small><span class="divide">|</span><a class="reply_link" onclick="showBox(\'al_wall.php\', {act: \'own_reply\', post: \'-32194285_172355\'}, {stat: [\'ui_controls.css\', \'ui_controls.js\', \'mentions.js\']})">Возразить</a></div><div class="replies_wrap clear" id="replies_wrap-32194285_172355" style="display: none"><div id="replies-32194285_172355"><input type="hidden" id="start_reply-32194285_172355" value=""></div></div></div></div></div></div>', true)
      post = new test.struct.post(html)

      equal(post.id, 'post-32194285_172355')
      equal(post.poster_id, null)
      equal(post.from_group, false)
      equal(post.is_repost, false)

      ok(post.links instanceof Array)
      for (var i = 0, len = post.links.length; i < len; i++) {
        ok(post.links[i] instanceof test.struct.link)
      }

      ok(post.getHeuristic() instanceof test.Heuristic)
      equal(typeof post._debugText(), 'string')
      equal(typeof post.getGrade(), 'number')

      // _fillImages
      // _fillText
      // _fillLinks
      // ban
      // fadeIn
      // fadeOut
      // text
      // images
    })

    QUnit.test("links", function() {
        var a, link

        a = cre('<a href="/m_kinos" class="mem_link" mention="" mention_id="club47131705" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">Перейти к просмотру »</a>', true)
        link = new test.struct.link(a)

        equal(link.url, "file:///m_kinos")
        equal(link.is_external, false)
        equal(link.is_group, true)
        equal(link.has_fake_continous, true)


        a = cre('<a href="/away.php?to=http%3A%2F%2Fwww.bestwatch.ru%2Fmodels.phtml%3F%26idb%3D905%26utm_source%3Dvk_public%26utm_medium%3Dbanner%26utm_campaign%3Davi36&amp;post=-29302425_23278" target="_blank" title="http://www.bestwatch.ru/models.phtml?&amp;idb=905&amp;utm_source=vk_public&amp;utm_medium=banner&amp;utm_campaign=avi36">http://www.bestwatch.ru/models.phtml?&amp;idb=905&amp;..</a>', true)
        link = new test.struct.link(a)

        equal(link.url, "file:///away.php?to=http%3A%2F%2Fwww.bestwatch.ru%2Fmodels.phtml%3F%26idb%3D905%26utm_source%3Dvk_public%26utm_medium%3Dbanner%26utm_campaign%3Davi36&post=-29302425_23278")
        equal(link.is_external, true)
        equal(link.is_group, false)
        equal(link.has_fake_continous, false)


        a = cre('<a href="/wall-29302425?q=%23%D0%BF%D1%80%D0%B8%D0%BD%D1%82%D1%8B">#принты@bestad</a>', true)
        link = new test.struct.link(a)

        equal(link.url, "file:///wall-29302425?q=%23%D0%BF%D1%80%D0%B8%D0%BD%D1%82%D1%8B")
        equal(link.is_external, false)
        equal(link.is_group, false)
        equal(link.has_fake_continous, false)


        a = cre('<a class="wall_post_more" onclick="hide(this, domPS(this)); show(domNS(this));">показать целиком..</a>', true)
        link = new test.struct.link(a)

        equal(link.url, null)
        equal(link.is_external, false)
        equal(link.is_group, false)
        equal(link.has_fake_continous, false)

    });


    QUnit.start()
})(this.QUnit);