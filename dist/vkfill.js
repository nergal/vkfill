/*! VKFill - v0.0.1 - 2013-05-02
* http://nergal.github.io/vkfill
* Copyright (c) 2013 nergal; Licensed  */
// javascript:void((function()%7Bvar e%3Ddocument.createElement(%27script%27)%3Be.setAttribute(%27type%27,%27text/javascript%27)%3Be.setAttribute(%27src%27,%27https://dl.dropboxusercontent.com/sh/lcbnbo5qipcg7ns/oPc5e5NP9O/vkfill.js%27)%3Bdocument.body.appendChild(e)%7D)())

// @TODO make some heuristics
// @TODO add live update processing
// @TOOD black- and white-lists
// @TOOD preferences
// @TODO convert in chrome extenstion
// @TOOD add text representation for heuristic grade

(function(d) {
  "use strict";

  var DEBUG = true

  var Heruistic = function(post) {
    this.post = post
  }

  Heruistic.prototype.calculate = function() {
    return 42
  }

  Heruistic.prototype.getTextInfo = function() {
    return 'some text'
  }


  var struct = {}

  /**
   * @class struct.link
   */
  struct.link = function(item) {
    this.url = null
    if (!item) {
      this.url = item.href
      this.is_external = (!!item.href.match('/away.php'))
      this.is_group = (item.getAttribute('mention_id') !== null)
      this.has_fake_continous = (item.getAttribute('class') === 'mem_link')
    }
  }

  /**
   * @class struct.post
   */
  struct.post = function(item) {
    this.id = null

    if (item) {
      this._dom = item

      this.id = item.id
      var author = geByClass1('author', item)
      this.poster_id = author.dataSet ? author.dataSet.fromId : null
      this.from_group = (parseInt(this.poster_id, 10) < 0)
      this.is_repost = (typeof geByClass1('published_by', item) !== 'undefined')
      this.links = this._fillLinks(item)
      this.text = this._fillText(item)
      this.images = this._fillImages(item)
    }
  }

  struct.post.prototype.fadeOut = function() {
    setStyle(this._dom, {
      'position': 'relative'
      , 'opacity': '0.3'
      , '-webkit-filter': 'blur(5px)'
    })
  }

  struct.post.prototype.fadeIn = function() {
    setStyle(this._dom, {
      'position': 'relative'
      , 'opacity': '1'
      , '-webkit-filter': 'none'
    })
  }

  struct.post.prototype.ban = function() {
    if (DEBUG) {
      this.fadeOut()
    } else {
      // @TODO remove post from stream
    }
  }

  struct.post.prototype._fillLinks = function(item) {
    var links = geByTag('a', item)

    var result = []
    for (var i = 0, len = links.length; i < len; i++) {
      result.push(new struct.link(links[i]))
    }

    return result
  }

  struct.post.prototype._fillText = function(item) {
    return geByClass1('wall_post_text', item)
  }

  struct.post.prototype._fillImages = function(item) {
    return geByClass1('page_post_sized_thumbs', item)
  }

  struct.post.prototype._debugText = function() {
    var heur = new Heruistic(this)
    return heur.getTextInfo()
  }

  struct.post.prototype.getGrade = function() {
    var heur = new Heruistic(this)
    return heur.calculate()
  }

  /**
   * @class VKFill
   */
  var VKFill = function() {
    var root = ge('feed_wall')
      , posts = geByClass('post', root)
    this.posts = []
    for (var i = 0, len = posts.length; i < len; i++) {
      this.posts.push(new struct.post(posts[i]))
    }
  }

  VKFill.prototype.appendLabel = function(post_id, text) {
    var styles = {
      'font-weight': 'bold'
      , 'position': 'absolute'
      , 'top': 0
      , 'right': 0
      , 'padding': '0.3em 1em'
      , 'background-color': '#C2BBFF'
      , 'border-radius': '0 0 7px 7px'
      , 'color': '#ffffff'
    }
    , label = ce('span', {innerHTML: text}, styles)
    , post = ge(post_id)

    setStyle(post, {'position': 'relative'})
    post.appendChild(label)
  }

  VKFill.prototype.proceed = function(limit) {
    for (var i = 0, text, post, len = this.posts.length; i < len; i++) {
      post = this.posts[i]

      if (DEBUG === true) {
        text = post._debugText()
        this.appendLabel(post.id, text)
      }

      if (post.getGrade() > limit) {
        post.ban()
      }
    }
  }


  if (d.location.host === 'vk.com') {
    var main = new VKFill()
    main.proceed(25)
  }

})(document);
