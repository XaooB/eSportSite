exports.events = (req, res) => {
    res.render('events', {
        title: 'Wydarzenia: League of Legends'
    });
};

exports.matches = (req, res) => {
    res.render('matches', {
        title: 'Mecze: League of Legends'
    });
};

exports.teams = (req, res) => {
    res.render('teams', {
        title: 'Drużyny: League of Legends'
    });
};

exports.results = (req, res) => {
    res.render('results', {
        title: 'Wyniki: League of Legends'
    });
};

exports.statistics = (req, res) => {
    res.render('statistics', {
        title: 'Statystyki: League of Legends'
    });
};

exports.ranking = (req, res) => {
    res.render('ranking', {
        title: 'Ranking: League of Legends'
    });
};
