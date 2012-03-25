var Neum = window.Neum || {};
Neum.Context = Neum.Context || {};

(function() {
	Neum.Context.mouseHelper = new Neum.MouseHelper();
	Neum.Context.geomHelper = new Neum.GeomHelper();
	Neum.Context.durationHelper = new Neum.DurationHelper();
	Neum.Context.freezeTimer = new Neum.DurationHelper();
	Neum.Context.soundHelper = new Neum.SoundHelper();
	
	Neum.Context.score = 0;
	Neum.Context.currentLevel = 1;
	
	Neum.Context.levels = new Array();
	Neum.Context.levels[1] = new Neum.Level(1000);
	Neum.Context.levels[2] = new Neum.Level(900);
	Neum.Context.levels[3] = new Neum.Level(800);
	Neum.Context.levels[4] = new Neum.Level(600);
	Neum.Context.levels[5] = new Neum.Level(400);
	Neum.Context.levels[6] = new Neum.Level(200);
	Neum.Context.levels[7] = new Neum.Level(100);

	
	Neum.Context.highScores = new Array(5);
	Neum.Context.highScores[0] = {score: 150, pseudo: "KIKOO"}
	Neum.Context.highScores[1] = {score: 180, pseudo: "KIKOO"}
	Neum.Context.highScores[2] = {score: 180, pseudo: "KIKOO"}
	Neum.Context.highScores[3] = {score: 180, pseudo: "KIKOO"}
	Neum.Context.highScores[4] = {score: 180, pseudo: "KIKOO"}
	Neum.Context.highScores[5] = {score: 180, pseudo: "KIKOO"}
	
	Neum.Context.playerInfos = {
		score: 0,
		pseudo: "Player"
	};	
})();
