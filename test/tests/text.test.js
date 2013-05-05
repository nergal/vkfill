describe('Тексты', function() {
  describe('Картинка с лурка', function() {
      var html = $('#result #post-26406986_2375046 .wall_post_text').get(0)
        , post = new _test.struct.text(html)

      it('пост содержит много капса', function() {
        expect(post.capsQuantity()).to.be.equal(3)
      })

      it('пост содержит псевдо-символы', function() {
        expect(post.hasPseudo()).to.not.be.ok()
      })

      it('количество капаса в посте', function() {
        expect(post.capsQuantityCount()).to.be.equal(1)
      })
  });

  describe('Пост с пастой ЛМ', function() {
    var html = $('#result #post-26406986_2374784 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(2)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.not.be.ok()
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(48)
    })
  })

  describe('Репост с Хабра', function() {
    var html = $('#result #post-20629724_352688 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(2)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.be.equal(0)
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(4)
    })
  })

  describe('Рекламный пост группы', function() {
    var html = $('#result #post-25117353_61003 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(3)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.be.equal(1)
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(20)
    })
  })

  describe('Пост со ссылкой на сайт группы', function() {
    var html = $('#result #post-41589556_107294 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(6)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.not.be.ok()
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(7)
    })
  })

  describe('Пост с фальшивой ссылкой', function() {
    var html = $('#result #post-24098496_46396 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(16)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.be.equal(1)
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(59)
    })
  })

  describe('Репост с рекламой', function() {
    var html = $('#result #post-36731992_29369 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(40)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.be.equal(3)
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(35)
    })
  })

  describe('Репост человеков пост', function() {
    var html = $('#result #post147767747_1090 .wall_post_text').get(0)
      , post = new _test.struct.text(html)

    it('пост содержит много капса', function() {
      expect(post.capsQuantity()).to.be.equal(1)
    })

    it('пост содержит псевдо-символы', function() {
      expect(post.hasPseudo()).to.not.be.ok()
    })

    it('количество капаса в посте', function() {
      expect(post.capsQuantityCount()).to.be.equal(5)
    })
  })
});