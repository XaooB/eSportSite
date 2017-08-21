const {Article} = require('../models/article'),
      {Author} = require('../models/author');

exports.articleRouter = (req, res) => {
    Article.findOne({
        title: req.params.title
    }).then((mainArticle) => {
        return Article.find({
            author: mainArticle.author
        }).then((authorArticle) => {
            return Article.find({}).where('title').ne(req.params.title).sort('-date').then((newestArticles) => {
                return Author.findOne({
                    nickname: mainArticle.author
                }).then((authorData) => {
                    res.render('news', {
                        mainNews: {
                            title: mainArticle.title,
                            author: mainArticle.author,
                            category: mainArticle.category,
                            body: mainArticle.body,
                            img: mainArticle.img,
                            date: mainArticle.date
                        },
                        lastestNews: {
                            article1: {
                                title: newestArticles[0].title,
                                author: newestArticles[0].author,
                                category: newestArticles[0].category,
                                body: newestArticles[0].body,
                                img: newestArticles[0].img,
                                date: newestArticles[0].date
                            },
                            article2: {
                                title: newestArticles[1].title,
                                author: newestArticles[1].author,
                                category: newestArticles[1].category,
                                body: newestArticles[1].body,
                                img: newestArticles[1].img,
                                date: newestArticles[1].date
                            },
                            article3: {
                                title: newestArticles[2].title,
                                author: newestArticles[2].author,
                                category: newestArticles[2].category,
                                body: newestArticles[2].body,
                                img: newestArticles[2].img,
                                date: newestArticles[2].date
                            },
                            article4: {
                                title: newestArticles[3].title,
                                author: newestArticles[3].author,
                                category: newestArticles[3].category,
                                body: newestArticles[3].body,
                                img: newestArticles[3].img,
                                date: newestArticles[3].date
                            },
                            article5: {
                                title: newestArticles[4].title,
                                author: newestArticles[4].author,
                                category: newestArticles[4].category,
                                body: newestArticles[4].body,
                                img: newestArticles[4].img,
                                date: newestArticles[4].date
                            },
                            article6: {
                                title: newestArticles[5].title,
                                author: newestArticles[5].author,
                                category: newestArticles[5].category,
                                body: newestArticles[5].body,
                                img: newestArticles[5].img,
                                date: newestArticles[5].date
                            },
                            article7: {
                                title: newestArticles[6].title,
                                author: newestArticles[6].author,
                                category: newestArticles[6].category,
                                body: newestArticles[6].body,
                                img: newestArticles[6].img,
                                date: newestArticles[6].date
                            },
                            article8: {
                                title: newestArticles[7].title,
                                author: newestArticles[7].author,
                                category: newestArticles[7].category,
                                body: newestArticles[7].body,
                                img: newestArticles[7].img,
                                date: newestArticles[7].date
                            },
                            article9: {
                                title: newestArticles[8].title,
                                author: newestArticles[8].author,
                                category: newestArticles[8].category,
                                body: newestArticles[8].body,
                                img: newestArticles[8].img,
                                date: newestArticles[8].date
                            }
                        },
                        authorArticle: {
                            article1: {
                                title: authorArticle[0].title,
                                category: authorArticle[0].category,
                                img: authorArticle[0].img
                            },
                            article2: {
                                title: authorArticle[1].title,
                                category: authorArticle[1].category,
                                img: authorArticle[1].img
                            }
                        },
                        author: {
                            nickname: authorData.nickname,
                            rank: authorData.rank,
                            avatar: authorData.avatar,
                            info: authorData.info
                        }
                    });
                });
            });
        });
    }).catch((err) => {
        console.log(err);
        res.redirect('/error').send();
    });
}
