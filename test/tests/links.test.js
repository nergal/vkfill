describe('Ссылки', function() {
  describe('Ссылка с фальшивым продолжением', function() {
      var html = create('<a href="/m_kinos" class="mem_link" mention="" mention_id="club47131705" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">Перейти к просмотру »</a>', true)
      var link = new _test.struct.link(html)

      it('должен возвращатся корректный URL ссылки', function() {
        expect(link.url).to.be.equal('file:///m_kinos')
      })

      it('должно работать определение группы', function() {
        expect(link.is_group).to.be.ok()
      })

      it('должно работать определение внешней ссыки', function() {
        expect(link.is_external).to.not.be.ok()
      })

      it('должна срабатывать проверка на наличине фальшывыx переxодов', function() {
        expect(link.has_fake_continous).to.be.ok()
      })
  });

  describe('Внешняя ссылка', function() {
      var html = create('<a href="/away.php?to=http%3A%2F%2Fwww.bestwatch.ru%2Fmodels.phtml%3F%26idb%3D905%26utm_source%3Dvk_public%26utm_medium%3Dbanner%26utm_campaign%3Davi36&amp;post=-29302425_23278" target="_blank" title="http://www.bestwatch.ru/models.phtml?&amp;idb=905&amp;utm_source=vk_public&amp;utm_medium=banner&amp;utm_campaign=avi36">http://www.bestwatch.ru/models.phtml?&amp;idb=905&amp;..</a>', true)
      var link = new _test.struct.link(html)

      it('должен возвращатся корректный URL ссылки', function() {
        expect(link.url).to.be.equal("file:///away.php?to=http%3A%2F%2Fwww.bestwatch.ru%2Fmodels.phtml%3F%26idb%3D905%26utm_source%3Dvk_public%26utm_medium%3Dbanner%26utm_campaign%3Davi36&post=-29302425_23278")
      })

      it('должно работать определение группы', function() {
        expect(link.is_group).to.not.be.ok()
      })

      it('должно работать определение внешней ссыки', function() {
        expect(link.is_external).to.be.ok()
      })

      it('должна срабатывать проверка на наличине фальшывыx переxодов', function() {
        expect(link.has_fake_continous).to.not.be.ok()
      })
  });

  describe('Ссылка на тег', function() {
      var html = create('<a href="/wall-29302425?q=%23%D0%BF%D1%80%D0%B8%D0%BD%D1%82%D1%8B">#принты@bestad</a>', true)
      var link = new _test.struct.link(html)

      it('должен возвращатся корректный URL ссылки', function() {
        expect(link.url).to.be.equal("file:///wall-29302425?q=%23%D0%BF%D1%80%D0%B8%D0%BD%D1%82%D1%8B")
      })

      it('должно работать определение группы', function() {
        expect(link.is_group).to.not.be.ok()
      })

      it('должно работать определение внешней ссыки', function() {
        expect(link.is_external).to.not.be.ok()
      })

      it('должна срабатывать проверка на наличине фальшывыx переxодов', function() {
        expect(link.has_fake_continous).to.not.be.ok()
      })
  });

  describe('Ссылка "показать ещё"', function() {
      var html = create('<a class="wall_post_more" onclick="hide(this, domPS(this)); show(domNS(this));">показать целиком..</a>', true)
      var link = new _test.struct.link(html)

      it('должен возвращатся корректный URL ссылки', function() {
        expect(link.url).to.be.equal(null)
      })

      it('должно работать определение группы', function() {
        expect(link.is_group).to.not.be.ok()
      })

      it('должно работать определение внешней ссыки', function() {
        expect(link.is_external).to.not.be.ok()
      })

      it('должна срабатывать проверка на наличине фальшывыx переxодов', function() {
        expect(link.has_fake_continous).to.not.be.ok()
      })
  });
});