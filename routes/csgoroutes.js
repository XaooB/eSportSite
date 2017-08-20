exports.events = (req, res) => {
    res.render('events', {
        title: 'Wydarzenia: CounterStrike: Global Offensive'
    });
};

exports.matches = (req, res) => {
    res.render('matches', {
        title: 'Mecze: CounterStrike: Global Offensive'
    });
};

exports.teams = (req, res) => {
    res.render('teams', {
        title: 'Drużyny: CounterStrike: Global Offensive'
    });
};

exports.results = (req, res) => {
    res.render('results', {
        title: 'Wyniki: CounterStrike: Global Offensive'
    });
};

exports.statistics = (req, res) => {
    res.render('statistics', {
        title: 'Statystyki: CounterStrike: Global Offensive'
    });
};

exports.ranking = (req, res) => {
    res.render('ranking', {
        title: 'Ranking: CounterStrike: Global Offensive'
    });
};
