describe('Картинки', function() {
  var html = create('<img src="http://cs419825.vk.me/v419825528/2ae8/WzFX46tDQn8.jpg" width="232" height="310" style="" class="page_post_thumb_sized_photo">', true)
  var image = new _test.struct.image(html)

  it('должен возвращатся корректный URL картинки', function() {
    expect(image.url).to.be.equal('http://cs419825.vk.me/v419825528/2ae8/WzFX46tDQn8.jpg')
  })

  it('должна определятся ширина картинки', function() {
    expect(image.width).to.be.equal(232)
  })

  it('должна определятся высота картинки', function() {
    expect(image.height).to.be.equal(310)
  })
});