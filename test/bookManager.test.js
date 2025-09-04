const Book = require('../book');
const BookManager = require('../bookManager');

describe('BookManager', () => {
    let bookManager;

    beforeEach(() => {
        bookManager = new BookManager();
    });

    test('Test menambahkan buku', () => {
        const book = new Book('Test buku', 'Test Author', 2023);
        bookManager.addBook(book);
        expect(bookManager.getBookCount()).toBe(1);
    });

    test('Test menghapus buku yang ada', () => {
        const book = new Book('To remove', 'Author', 2023);
        bookManager.addBook(book);

        const removed = bookManager.removeBook('To remove');
        expect(removed).toBe(true);
        expect(bookManager.getBookCount()).toBe(0);
    });

    test('Test menghapus buku yang tidak ada', () => {
        const removed = bookManager.removeBook('Non-existing Book');
        expect(removed).toBe(false);
        expect(bookManager.getBookCount()).toBe(0);
    });

    test('Test mencari buku berdasarkan penulis', () => {
        const book1 = new Book('Book One', 'Author A', 2020);
        const book2 = new Book('Book Two', 'Author B', 2021);
        const book3 = new Book('Book Three', 'Author A', 2022);
        bookManager.addBook(book1);
        bookManager.addBook(book2);
        bookManager.addBook(book3);

        const results = bookManager.findBooksByAuthor('Author A');
        expect(results).toHaveLength(2);
        expect(results[0].title).toBe('Book One');
    });

    test('Test mendapatkan semua buku', () => {
        const book1 = new Book('Book One', 'Author A', 2020);
        const book2 = new Book('Book Two', 'Author B', 2021);
        const book3 = new Book('Book Three', 'Author A', 2020);
        bookManager.addBook(book1);
        bookManager.addBook(book2);
        bookManager.addBook(book3);

        const allBooks = bookManager.getAllBooks();
        expect(allBooks).toHaveLength(3);
        expect(allBooks.map(b => b.title)).toEqual(
            expect.arrayContaining(['Book One', 'Book Two', 'Book Three'])
        );
    });
});