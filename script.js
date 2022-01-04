const pushIntoList = function (numOfItems = 5) {
  let list = [];
  for (let i = 1; i <= numOfItems; i++) {
    list.push(i);
  }
  return list;
};

class Paginator {
  RES_PER_PAGE = 6;
  DEFAULT_PAGE = 1;
  _list;
  _resultPerPage;
  _currPage = this.DEFAULT_PAGE;
  constructor(list, resultPerPage = this.RES_PER_PAGE) {
    this._checkIsArray(list);

    this._list = list;
    this._resultPerPage = Math.floor(
      this._resultPerPageFormatter(resultPerPage)
    );
  }

  _checkIsArray(list) {
    if (!(list instanceof Array))
      throw new Error('The list should be an array of items!');
  }

  _checkIsNumber(num) {
    if (!(typeof +num == 'number' && !isNaN(+num)))
      throw new Error('results per page must be a number!');
  }

  _resultPerPageFormatter(resultPerPage) {
    this._checkIsNumber(resultPerPage);
    if (resultPerPage <= 0) resultPerPage = this.RES_PER_PAGE;
    if (resultPerPage > this.count) resultPerPage = this.count;
    return resultPerPage;
  }

  _pageFormatter(page) {
    this._checkIsNumber(page);
    if (page <= 0) page = this.DEFAULT_PAGE;
    if (page > this.numPages) page = this.numPages;
    return page;
  }

  get count() {
    return this._list.length;
  }

  get numPages() {
    return Math.ceil(this.count / this._resultPerPage);
  }

  get currPageNum() {
    return this._currPage;
  }

  get object_list() {
    let start = (this._currPage - 1) * this._resultPerPage;
    let end = this._currPage * this._resultPerPage;
    return this._list.slice(start, end);
  }

  get firstItem() {
    return this.object_list[0];
  }

  get lastItem() {
    return this.object_list[this.object_list.length - 1];
  }

  get nextPageNumber() {
    return this._currPage + 1 <= this.numPages
      ? this._currPage + 1
      : this.numPages;
  }

  get previousPageNumber() {
    return this._currPage - 1 || 1;
  }

  setPage(page = this.DEFAULT_PAGE) {
    this._currPage = Math.floor(this._pageFormatter(page));
    return this;
  }

  moveNextPage() {
    return this.setPage(this._currPage + 1);
  }

  movePreviousPage() {
    return this.setPage(this._currPage - 1);
  }

  hasNextPage() {
    return this._currPage < this.numPages;
  }

  hasPreviousPage() {
    return this._currPage > 1;
  }

  hasOtherPages() {
    return this.numPages > 1;
  }
}

// const list = pushIntoList(50);
// const resPerPage = 7;
// const paginator = new Paginator(list, resPerPage);
// console.log(paginator.count);
// console.log(paginator.numPages);
// let currPage1 = paginator.setPage(1);
// console.log(currPage1.object_list);

// let currPage2 = paginator.setPage(2);
// console.log(currPage2.object_list);

// let currPage3 = paginator.setPage(3);
// console.log(currPage3.object_list);

// console.log(paginator.numPages);
// let page = paginator.setPage(1);
// console.log('next ', page.hasNextPage());
// console.log('prev ', page.hasPreviousPage());

// let currPage3 = paginator.setPage(3);
// console.log(currPage3.object_list);
// console.log(currPage3.firstItem);
// console.log(currPage3.lastItem);

// console.log(paginator.hasOtherPages());

// let currPage3 = paginator.setPage(9);
// console.log('prev: ', currPage3.previousPageNumber);
// console.log('curr: ', currPage3.currPageNum);
// console.log('next: ', currPage3.nextPageNumber);

// let currPage3 = paginator.setPage(3);
// let newPage = currPage3.moveNextPage();
// console.log(newPage.currPageNum);

// let currPage3 = paginator.setPage(3);
// let newPage = currPage3.movePreviousPage();
// console.log(newPage.currPageNum);
// console.log(newPage.object_list);
