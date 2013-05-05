/**
 * VKFill
 *
 * @version 0.0.1
 * @author nergal <me@2mio.com>
 */
(function() {
  /**
   * Объект эвристики
   *
   * @constructor
   * @this {Heuristic}
   * @require extend
   * @param {struct.post} post    Объект поста для оценки
   * @param {Object}      options Конфигурация
   */ 
  var Heuristic = function (post, options) {
    this.post = post
    this.options = options
    this.weights = extend(options.weights, {
      from_group: 10
      , is_repost: 40
      , has_links: -10
      , has_many_links: 50
      , has_external_links: 30
      , has_many_external_links: 70
      , has_group_links: 20
      , has_fake_continous: 50
      , has_one_image: 10
      , has_couple_images: 0
      , has_many_images: -20
      , has_pseudo_signs: 50
      , has_caps: 30
    })
    this._debugText = []
  }

  /**
   * Вычисление оценки поста
   *
   * @return {number}
   */
  Heuristic.prototype.calculate = function() {
    var sum = 0
    if (this.post.from_group === true) {
      sum+= this.weights.from_group
      this._debugText.push('from_group')
    }

    if (this.post.is_repost === true) {
      sum+= this.weights.is_repost
      this._debugText.push('is_repost')
    }

    if (this.post.links.length > 0) {
      sum+= this.weights.has_links

      var extr_links_count = this.post.links.filter(function(item) { return item.is_external; }).length
          , grup_links_count = this.post.links.filter(function(item) { return item.is_group; }).length
          , fake_links_count = this.post.links.filter(function(item) { return item.has_fake_continous; }).length
          , links_count = this.post.links.length

      if (extr_links_count > 0) {
        if (extr_links_count > 1) {
          sum+= this.weights.has_many_external_links
        } else {
          sum+= this.weights.has_external_links
        }
        this._debugText.push('has_external_links:(' + extr_links_count + ')')
      }

      if (grup_links_count > 0) {
        sum+= this.weights.has_group_links
        this._debugText.push('has_group_links:(' + grup_links_count + ')')
      }

      if (fake_links_count > 0) {
        sum+= this.weights.has_fake_continous
        this._debugText.push('has_fake_continous:(' + fake_links_count + ')')
      }

      if (links_count > 4) {
        sum+= this.weights.has_many_links
        this._debugText.push('has_many_links:(' + links_count + ')')
      }
    }

    var images_count = this.post.images.length
    if (images_count > 0) {
      this._debugText.push('images:(' + images_count + ')')

      if (images_count === 1) {
        sum+= this.weights.has_one_image
        this._debugText.push('has_one_image')
      } else {
        if (images_count < 4) {
          sum+= this.weights.has_couple_images
          this._debugText.push('has_couple_images')
        } else {
          sum+= this.weights.has_many_images
          this._debugText.push('has_many_images')
        }
      }
    }

    if (this.post.text.hasPseudo() > 2) {
      sum+= this.weights.has_pseudo_signs
      this._debugText.push('has_pseudo_signs:(' + this.post.text.hasPseudo() + ')')
    }

    if (this.post.text.capsQuantity() > 15) {
      sum+= this.weights.has_caps
      this._debugText.push('has_caps:(' + this.post.text.capsQuantity() + ')')
    }

    return sum
  }

  /**
   * Объект для хранения структур
   */
  var struct = {};

  /**
   * Класс для описания ссылки в посте
   *
   * @constructor
   * @this {struct.link}
   * @param {Object}      item   DOM-элемент ссылки
   * @param {struct.post} parent обратная связь
   */
  struct.link = function(item, parent) {
    this.url = null
    if (item) {
      /** @parent */ this._parent = parent

      this.url = item.href || null
      this.is_external = (!!item.href.match('/away.php'))
      this.is_group = (item.getAttribute('mention_id') !== null)
      this.has_fake_continous = (item.getAttribute('class') === 'mem_link')
    }
  }

  /**
   * Класс для описания поста
   *
   * @constructor
   * @this {struct.post}
   * @require geByClass1
   * @param {Object} item DOM-элемент поста
   * @param {VKFill} parent обратная связь
   */
  struct.post = function(item, parent) {
    this.id = null
    /** @private */ this._heuristic = null

    if (item && item.id) {
      /** @private */ this._dom = item
      /** @private */ this._parent = parent

      this.id = item.id
      var author = geByClass1('author', item)
      this.poster_id = ((author && author.dataset) ? author.dataset.fromId : null)
      this.from_group = (parseInt(this.poster_id, 10) < 0)
      this.is_repost = (typeof geByClass1('published_by', item) !== 'undefined')
      this.links = this._fillLinks()
      this.text = this._fillText()
      this.images = this._fillImages()

      this.in_white_list = (parent.options.lists.white.indexOf(this.poster_id) > -1)
      this.in_gray_list = (parent.options.lists.gray.indexOf(this.poster_id) > -1)
      this.in_black_list = (parent.options.lists.black.indexOf(this.poster_id) > -1)

      setStyle(this._dom, {'position': 'relative'})
     }
  }

  /**
   * Сокрытие поста
   */
  struct.post.prototype.hide = function() {
    if (this._parent.options.hide === true) {
      setStyle(this._dom, {
        'display': 'none'
      })
    } else {
      setStyle(this._dom, {
        'opacity': '0.3'
        , '-webkit-filter': 'blur(5px)'
      })
    }
  }

  /**
   * Показ поста
   */
   struct.post.prototype.show = function() {
    setStyle(this._dom, {
      'display': 'block'
      , 'opacity': '1'
      , '-webkit-filter': 'none'
    })
   }

  /**
   * Обработка ссылок поста
   *
   * @require geByTag
   * @return {struct.link[]}
   */
  struct.post.prototype._fillLinks = function() {
    var items = geByClass1('wall_post_text', this._dom) 
      , links = (items ? geByTag('a', items) : [])

    var result = []
    for (var i = 0, len = links.length; i < len; i++) {
      result.push(new struct.link(links[i], this))
    }

    return result
  }

  /**
   * Обработка текста поста
   *
   * @require geByClass1
   * @param {Object} item DOM-объект поста
   * @return {struct.text}
   */
  struct.post.prototype._fillText = function() {
    var node = geByClass1('wall_post_text', this._dom)
    return new struct.text(node, this)
  }

  /**
   * Обработка картинок поста
   *
   * @require geByClass
   * @return {struct.image[]}
   */
  struct.post.prototype._fillImages = function() {
    var items = geByClass1('wall_text', this._dom)
      , images = (items ? geByTag('img', items) : [])
      , result = []

    for (var i = 0, len = images.length; i < len; i++) {
      result.push(new struct.image(images[i], this))
    }

    return result
  }

  /**
   * Получение объекта эвристики для оцентки поста
   *
   * @see {Heuristic}
   */
  struct.post.prototype.getHeuristic = function() {
    if (this._heuristic === null) {
      this._heuristic = new Heuristic(this, this._parent.options)
    }

    return this._heuristic
  }

  /**
   * Вычисление оцентки конкретного поста
   *
   * @return {number}
   */
  struct.post.prototype.getGrade = function() {
    var heur = this.getHeuristic()
    return heur.calculate()
  }

  /**
   * Создание экземпляра stuct.text
   *
   * @constructor
   * @this {struct.text}
   * @param {Object}      item   DOM-элемент теста
   * @param {struct.post} parent обратная связь
   */
  struct.text = function(item, parent) {
    this._text = ''
    if (item) {
      /** @private */ this._text = item.innerText
    }
    /** @private */ this._parent = parent
    /** @private */ this._regexp = new RegExp('[\\—\\-\\,\\.\\/\\(\\)\\"\\:\\!\\|\\[\\]\\?\\#\\w\\d\\sА-Яа-яё]', 'gm')
  }

  /**
   * Подсчет количества капса в посте
   *
   * @return {number}
   */
  struct.text.prototype.capsQuantityCount = function() {
    return this._text.replace(/[^A-ZА-Я]/g, '').length
  }

  /**
   * Подсчет отношения капса ко всем символам
   *
   * @return {number}
   */
  struct.text.prototype.capsQuantity = function() {
    return parseInt((this.capsQuantityCount() / this._text.length)  * 100, 10);
  }

  /**
   * Проверяет кол-во псевдо-символов в тексте
   *
   * @return {number}
   */
  struct.text.prototype.hasPseudo = function() {
    return this._text.replace(this._regexp, '').length;
  }

  /**
   * Предствление картинки
   *
   * @constructor
   * @this {struct.image}
   * @param {Object}      item   DOM-элемент картинки
   * @param {struct.post} parent Обратная связь
   */
  struct.image = function(item, parent) {
    /** @private */ this._parent = parent
    this.url = item.getAttribute('src')
    this.width = parseInt(item.getAttribute('width'), 10)
    this.height = parseInt(item.getAttribute('height'), 10)
  }

  /**
   * Основной фасадный класс
   * 
   * @constructor
   * @this {VKFill}
   * @require geByClass
   * @require ge
   * @param {object} config Конфигурация
   */
  var VKFill = function(options) {
    var root = ge('feed_wall')
      , posts = geByClass('post', root)
      , default_options = {
        debug: false
        , hide: true
        , limit: 75
        , weights: { }
        , lists: {
          white: [],
          gray: [],
          black: []
        }
      }
    this.posts = []
    this.options = extend(default_options, options || {})

    for (var i = 0, post, len = posts.length; i < len; i++) {
      post = new struct.post(posts[i], this)
      this.proceed(post)
      this.posts.push(post)
    }
  }

  /**
   * Добавление метки к посту
   *
   * @require ce
   * @require ge
   * @require setStyle
   * @param {string} post_id Идентификатов DOM элемента
   * @param {string} text    Текст добавляемой метки
   */
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

    post.appendChild(label)
  }

  VKFill.prototype.scrollHandler = function() {
    var root = ge('feed_wall')
      , items = geByClass('post', root)
    items = items.filter(function(post) {
      return getStyle(post, 'position') === 'static'
    })

    for (var i = 0, post, len = items.length; i < len; i++) {
      post = new struct.post(items[i], this)
      this.proceed(post)
      this.posts.push(post)
    }
  }

  /**
   * Обработка поста
   *
   * @param {struct.post} post
   */
  VKFill.prototype.proceed = function(post) {
    if (this.options.debug === true) {
      var text = '<ul><li><b>' + post.getGrade() + '</b></li>'
      text+= '<li>' + post._heuristic._debugText.join('</li><li>') + '</li></ul>'
      this.appendLabel(post.id, text)
    }

    var limit = this.options.limit
    if (post.in_gray_list) {
      limit+= 50
    } else if (post.in_black_list) {
      limit-= 50
    }

    if (!post.in_white_list && (post.getGrade() > limit)) {
      post.hide()
    }
  }


  if (document.location.host === 'vk.com') {
    var main = new VKFill({
      debug: true,
      hide: false      
    })

    Feed.__applyUi = Feed.applyUi
    Feed.applyUi = function() {
      main.scrollHandler()
      return Feed.__applyUi()
    }
  } else {
    window._test = {}
    window._test.struct = struct;
    window._test.VKFill = VKFill;
    window._test.Heuristic = Heuristic;
  }

})();
