describe('titleService', function () {
    var $document, titleService;
    $document = null;
    titleService = null;
    beforeEach(module('titleService'));
    beforeEach(inject(function (_$document_, _titleService_) {
        $document = _$document_;
        return titleService = _titleService_;
    }));
    it('should set a title without a suffix', inject(function () {
        var title;
        title = "new title";
        titleService.setTitle(title);
        return expect(titleService.getTitle()).toEqual(title);
    }));
    it('should allow specification of a suffix', inject(function () {
        var suffix;
        suffix = " :: new suffix";
        titleService.setSuffix(suffix);
        return expect(titleService.getSuffix()).toEqual(suffix);
    }));
    return it('should set the title, including the suffix', inject(function () {
        var suffix, title;
        title = "New Title";
        suffix = " :: new suffix";
        titleService.setSuffix(suffix);
        titleService.setTitle(title);
        return expect(titleService.getTitle()).toEqual(title + suffix);
    }));
});
