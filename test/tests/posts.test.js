describe('Posts', function() {
  describe('Общее тестирование', function() {
      var html = $('#result #post-26406986_2375046').get(0)
        , post = new _test.struct.post(html)

      it('должен возвращатся корректный id DOM элемента', function() {
        expect(post.id).to.be.equal('post-26406986_2375046')
      })

      it('все ссылки в посте должны выделятся в отдельный объект', function() {
          expect(post.links instanceof Array).to.be.ok()
      })

      it('ссылки поста должны иметь внутренний тип', function() {
          for (var i = 0, len = post.links.length; i < len; i++) {
              expect(post.links[i] instanceof _test.struct.link).to.be.ok()
          }
      })

      it('для поста должен корректно разворачиватся объект эвристики', function() {
          expect(post.getHeuristic() instanceof _test.Heuristic).to.be.ok()
      })

      it('объект эвристики должен передавать в пост отладочное сообщение', function() {
          expect(post._debugText()).to.be.a('string')
      })

      it('объект эвристики должен передавать в пост вес сообщения', function() {
          expect(post.getGrade()).to.be.a('number')
      })
  });

  describe('Тестирование частных свойств', function() {
    var html = $('#result #post-26406986_2375046').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-26406986')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.not.be.ok()
    })
  })

  describe('Пост с пастой ЛМ', function() {
    var html = $('#result #post-26406986_2374784').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-26406986')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.not.be.ok()
    })
  })

  describe('Репост с Хабра', function() {
    var html = $('#result #post-20629724_352688').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-20629724')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.not.be.ok()
    })
  })

  describe('Рекламный пост группы', function() {
    var html = $('#result #post-25117353_61003').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-25117353')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.not.be.ok()
    })
  })

  describe('Пост со ссылкой на сайт группы', function() {
    var html = $('#result #post-41589556_107294').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-41589556')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.not.be.ok()
    })
  })

  describe('Пост с фальшивой ссылкой', function() {
    var html = $('#result #post-24098496_46396').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-24098496')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.be.ok()
    })
  })

  describe('Репост с рекламой', function() {
    var html = $('#result #post-36731992_29369').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('-36731992')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.be.ok()
    })
  })

  describe('Репост человеков пост', function() {
    var html = $('#result #post147767747_1090').get(0)
      , post = new _test.struct.post(html)

    it('должен выбиратся id постера', function() {
      expect(post.poster_id).to.be.equal('147767747')
    })

    it('должна срабатывать проверка на принадлежность поста группе', function() {
        expect(post.from_group).to.not.be.ok()
    })

    it('должна срабатывать проверка на наличине репоста', function() {
        expect(post.is_repost).to.be.ok()
    })
  })
});